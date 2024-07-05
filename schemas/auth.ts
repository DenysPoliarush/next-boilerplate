export const registerSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }).max(50, {
    message: 'Password must contain at most 50 character(s)'
  })
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }).max(50, {
    message: 'Password must contain at most 50 character(s)'
  })
})
