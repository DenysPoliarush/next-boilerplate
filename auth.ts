import NextAuth from 'next-auth'
import type { NextAuthConfig, DefaultSession } from 'next-auth'
import bcrypt from 'bcryptjs'

import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/server/db/client'
import { getUserByEmail, getUserById } from './server/services/auth'
// import { getAccountByUserId } from './server/services/account'

declare module 'next-auth' {
  interface ISession extends DefaultSession {
    user: PrismaUser
  }
}

export const authOptions = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png'
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Sign in',
      async authorize (credentials) {
        const validatedFields = loginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          )

          if (passwordsMatch) return user
        }

        return null
      }
    })
  ],
  callbacks: {
    async session ({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email!
        // session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    async redirect ({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    // async signIn ({ account }) {
    //   if (account?.provider !== 'credentials') return true

    //   return true
    // },
    async jwt ({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      // const existingAccount = await getAccountByUserId(existingUser.id)
      // console.log({ existingAccount })

      // token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email

      return token
    }
  }
} satisfies NextAuthConfig

export const {
  handlers: {
    GET, POST
  },
  auth,
  signIn,
  signOut
} = NextAuth(authOptions)
