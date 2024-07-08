import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '~/server/db'
import { registerSchema } from '~/schemas/auth'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}

export const createUser = async ({
  name,
  email,
  password
}: z.infer<typeof registerSchema>) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })

    return user
  } catch {
    return null
  }
}
