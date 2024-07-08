// import { auth } from '~/server/next-auth'

import Link from 'next/link'
import { cn } from '~/core/helpers'
import AuthShowcase from './AuthShowcase'
import { Button, buttonVariants } from './ui/button'

const Header = async () => {
  // const session = await auth() returns an error when using credentials provider
  // not-found-boundary.js:37 Uncaught Error: Invariant: headers() expects to have requestAsyncStorage, none available.
  // but it works well with 0Auth providers
  // const session = await auth()

  return (
    <header className='flex items-center bg-gray-200 p-4'>
      <>
        <Button
          variant='default'
        >
          <Link href='/'>Home</Link>
        </Button>

        <Link
          className={cn(buttonVariants({ variant: 'default' }), 'ml-4')}
          href='/react-hooks'
        >
            To React Hooks
        </Link>
        <Button
          variant='default'
          className='ml-4'
        >
          <Link href='/tasks'>To Todo list</Link>
        </Button>
      </>
      <AuthShowcase className="ml-auto"></AuthShowcase>
    </header>
  )
}

export default Header
