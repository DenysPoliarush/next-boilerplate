import { authRouter } from './auth'
import { tasksRouter } from './tasks'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    console.log('success')

    return 'success'
  }),

  auth: authRouter,
  tasks: tasksRouter
})

export type TAppRouter = typeof appRouter;
