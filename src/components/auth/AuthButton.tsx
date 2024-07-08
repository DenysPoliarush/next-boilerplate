'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

export const AuthButton: React.FC<{className?: string; session?: any}> = (props) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick () {
    if (props.session) {
      startTransition(() => {
        signOut()
      })
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
    >
      {props.session ? 'Sign out' : 'Sign in'}
    </Button>
  )
}
