import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home'
}

export default function Home () {
  return (
    <div>
      <h1 className='font-bold text-2xl mb-4'>Home</h1>
    </div>
  )
}
