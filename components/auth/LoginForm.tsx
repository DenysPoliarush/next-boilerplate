'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'

export const LoginForm: React.FC<{className?: string}> = (props) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [customErrorMessage, setCustomErrorMessage] = useState<string | null | undefined>(null)
  const [isPending, startTransition] = useTransition()

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  async function onSubmit (values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      try {
        startTransition(async () => {
          const res = await login(values, callbackUrl)
          console.log('res', res)

          if (typeof res?.error === 'string') {
            setCustomErrorMessage(res.error)
          }
        })
      } catch (error) {
        console.log(error)

        setCustomErrorMessage('some error')
      }
    })
  }

  function cleanError () {
    setCustomErrorMessage(null)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full', props.className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  disabled={isPending}
                  placeholder="john@doe.com"
                  onInput={cleanError}
                  {...field} />
              </FormControl>
              <FormMessage />
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
                  onInput={cleanError}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {customErrorMessage && (
          <FormMessage>
            {customErrorMessage}
          </FormMessage>
        )}

        <Button className='w-full mt-8' size='lg' disabled={isPending} type="submit">Continue</Button>

        <SocialAuth className='mt-4' />

        <div className='flex items-center mt-12 justify-center w-full text-sm'>
          <p className='mr-2'>Don`t have an account yet?</p>

          <Link href='/auth/sign-up' className='text-blue-400'>Sign up</Link>
        </div>
      </form>
    </Form>
  )
}
