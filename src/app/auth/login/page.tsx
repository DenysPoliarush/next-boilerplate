import { Suspense } from 'react'
import { LoginForm } from '~/components/auth/LoginForm'

export default function Login () {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <h1 className='font-bold text-2xl'>Welcome back</h1>
      <p className='text-gray-400 text-sm'>Log in using your account</p>
      <Suspense>
        <LoginForm className='mt-10' />
      </Suspense>
    </div>
  )
}
