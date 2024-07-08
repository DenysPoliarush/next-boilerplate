import Link from 'next/link'
import { auth } from '~/server/next-auth'
import { AuthButton } from './auth/AuthButton'
import { UserBadge } from './shared/UserBadge'

const AuthShowcase: React.FC<{ className?: string }> = async (props) => {
  const session = await auth()

  const { className = '' } = props

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Link href='/profile'>
        {session?.user && (
          <UserBadge user={session.user} showName={true} />
        )}
      </Link>

      <AuthButton session={session} />
    </div>
  )
}

export default AuthShowcase
