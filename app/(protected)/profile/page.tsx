import { auth } from '@/auth'

const Profile: React.FC = async () => {
  const session = await auth()

  return (
    <div>
      <h1 className='font-bold text-2xl mb-4'>Profile</h1>

      {session?.user && (
        <UserBadge user={session.user} showName={true} />
      )}
      <pre className='mt-10'>
        {JSON.stringify(session, null, 4)}
      </pre>
    </div>
  )
}

export default Profile
