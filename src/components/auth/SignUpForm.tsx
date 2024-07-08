'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { register } from '~/components/auth/actions/register'
import Link from 'next/link'
import { useTransition, useState } from 'react'
import { cn } from '~/core/helpers'
import { registerSchema } from '~/schemas/auth'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { PasswordInput } from '../ui/password-input'
import { SocialAuth } from './SocialAuth'
import { Input } from '../ui/input'

export const SignUpForm: React.FC<{className?: string}> = (props) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const [customErrorMessage, setCustomErrorMessage] = useState<string | null>(null)

  function onSubmit (values: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      try {
        const res = await register(values)

        if (res?.error) setCustomErrorMessage(res.error as string)
      } catch (error) {
        setCustomErrorMessage(JSON.stringify(error))
      }
    })
  }

  function cleanError () {
    setCustomErrorMessage(null)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full',
        props.className
      )}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' disabled={isPending} placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='mt-3'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' disabled={isPending} placeholder="john@doe.com" onInput={cleanError} {...field} />
              </FormControl>
              <FormMessage>
                {customErrorMessage}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='mt-3'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  type='password'
                  disabled={isPending}
                  showForgotPassword
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full mt-8' size='lg' disabled={isPending} type="submit">Continue</Button>

        <SocialAuth className='mt-4' />

        <div className='flex items-center mt-12 justify-center w-full text-sm'>
          <p className='mr-2'>Already have an account?</p>

          <Link href='/auth/login' className='text-blue-400'>Login</Link>
        </div>
      </form>
    </Form>
  )
}
