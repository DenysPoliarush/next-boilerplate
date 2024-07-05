'use server'

import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { z } from 'zod'

export const login = async (
  credentials: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = loginSchema.safeParse(credentials)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

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

    throw error
  }
}
