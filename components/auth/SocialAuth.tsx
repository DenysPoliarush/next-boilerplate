'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'

export const SocialAuth: React.FC<{ className: string }> = (props) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const { className = '' } = props

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className={`flex items-center w-full gap-x-2 ${className}`}>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        type='button'
        onClick={() => onClick('google')}
      >
        <IconGoogle className="h-5 w-5" />
        <p className='ml-2'>Google</p>
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        type='button'
        onClick={() => onClick('github')}
      >
        <IconGithub className="h-5 w-5" />
        <p className='ml-2'>Github</p>
      </Button>
    </div>
  )
}
