'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { cn } from '~/core/helpers'
import { createTaskSchema } from '~/schemas/tasks'
import { clientTrpc } from '~/trpc/TRPCReactProvider'

export const AddTask: FC<{className?: string; session?: any}> = (props) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const createTasksMutation = clientTrpc.tasks.createTask.useMutation()

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      subtitle: ''
    }
  })

  function onSubmit (values: z.infer<typeof createTaskSchema>) {
    startTransition(() => {
      try {
        createTasksMutation.mutateAsync(values)
          .then(res => {
            console.log(res)
            setOpen(false)
          })
      } catch (error) {
        console.log(error)
      }
    })

    console.log(createTasksMutation)
  }

  return (
    <div className={cn(props.className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn('w-full', props.className)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Buy milk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem className='mt-3'>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="I wanna bake a cake, I need milk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='w-full mt-8' disabled={isPending} size='lg' type="submit">Continue</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
