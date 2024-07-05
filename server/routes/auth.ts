import bcrypt from 'bcryptjs'

export const authRouter = router({
  getUserByEmailAndPassword: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const validatedFields = loginSchema.safeParse(input)

      if (!validatedFields.success) {
        return { error: 'Invalid login' }
      }

      const { email, password } = validatedFields.data

      const user = await ctx.prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return { error: 'User not found' }
      }

      const isValidPassword = await bcrypt.compare(password, user.password as string)
      if (!isValidPassword) {
        return { error: 'User not found' }
      }

      return { success: true, user }
    }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),

  getUserById: protectedProcedure.input(z.string()).query(
    async ({ ctx: { prisma }, input }) => {
      const user = await prisma.user.findUnique({ where: { id: input } })

      return user
    }
  ),

  updateUser: protectedProcedure.input(
    registerSchema
  ).mutation(
    async ({
      ctx: { prisma, session },
      input
    }) => {
      const updatedUser = await prisma.user.update({
        where: { id: session?.user?.id },
        data: input
      })

      return updatedUser
    }
  ),

  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return { success: true }
    }),

  restorePassword: publicProcedure
    .input(
      z.object({
        email: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return { success: true }
    })
})

export type TAuthRouter = typeof authRouter;
