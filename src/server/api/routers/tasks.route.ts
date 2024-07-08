import { taskIdSchema, createTaskSchema, updateTaskSchema } from '~/schemas/tasks'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '~/server/api/trpc'

export const tasksRouter = createTRPCRouter({
  getTasks: publicProcedure
    .query(async ({ ctx }) => {
      const tasks = await ctx.db.toDoRecord.findMany({
        include: {
          user: true
          // user: {
          //   select: {
          //     id: true,
          //     city: true,
          //     email: true,
          //     image: true,
          //     name: true
          //   }
          // }
        }
      })

      return { tasks: tasks || [] }
    }),

  getTaskById: protectedProcedure
    .input(taskIdSchema)
    .query(async ({ input, ctx }) => {
      const validatedFields = taskIdSchema.safeParse(input)

      if (!validatedFields.success) {
        return { error: 'Invalid data' }
      }

      const { id } = validatedFields.data

      const task = await ctx.db.toDoRecord.findUnique({
        where: {
          id
        },
        include: {
          user: true
        // user: {
        //   select: {
        //     id: true,
        //     city: true,
        //     email: true,
        //     image: true,
        //     name: true
        //   }
        // }
        }
      })

      if (!task) {
        return { error: 'Task not found' }
      }

      return { task }
    }),

  createTask: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ input, ctx }) => {
      const validatedFields = createTaskSchema.safeParse(input)

      if (!validatedFields.success) {
        return { error: 'Invalid data' }
      }

      const { title, subtitle } = validatedFields.data

      const task = await ctx.db.toDoRecord.create({
        data: {
          title,
          subtitle,
          userId: ctx?.session?.user?.id as string
        }
      })

      return { success: true, task }
    }),

  updateTask: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const validatedFields = updateTaskSchema.safeParse(input)

        if (!validatedFields.success) {
          return { error: 'Invalid data' }
        }

        const { title, subtitle, completed, id } = validatedFields.data

        const task = await ctx.db.toDoRecord.update({
          data: {
            title,
            subtitle,
            completed
          },
          where: {
            id
          }
        })

        return { success: true, task }
      } catch (error) {
        // return { success: false, message: 'Task not found' }
        throw new Error('Task not found')
      }
    }),

  deleteTask: protectedProcedure
    .input(taskIdSchema)
    .mutation(async ({ input, ctx }) => {
      const validatedFields = taskIdSchema.safeParse(input)

      if (!validatedFields.success) {
        return { error: 'Invalid data' }
      }

      const { id } = validatedFields.data

      const task = await ctx.db.toDoRecord.delete({
        where: {
          id,
          userId: ctx?.session?.user?.id as string
        }
      })

      if (!task) {
        return { success: false, error: 'Task not found' }
      }

      return { success: true, task }
    })
})

export type TTasksRouter = typeof tasksRouter;
