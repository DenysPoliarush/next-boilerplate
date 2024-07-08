import Header from '~/components/Header'

export default function ProtectedLayout ({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col min-h-0 bg-green-50'>
      <Header />
      <div className='min-h-screen flex-grow bg-gray-100 p-4'>
        {children}
      </div>
    </div>
  )
}
