'use client'

import { logout } from '@/actions/logout'

export const AuthButton: React.FC<{className?: string; session?: any}> = (props) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick () {
    if (props.session) {
      startTransition(() => {
        logout()
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
