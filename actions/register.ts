'use server'

import * as z from 'zod'

import { createUser, getUserByEmail } from '@/server/services/auth'
import { AuthError } from 'next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { signIn } from '@/auth'

export const register = async (
  values: z.infer<typeof registerSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await createUser({
    name,
    email,
    password
  })

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
      case 'CredentialsSignin':
        return { error: 'Invalid credentials!' }
      default:
        return { error: 'Something went wrong!' }
      }
    }

    console.log({ error })
    throw error
  }
}
