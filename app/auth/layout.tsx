export default function AuthLayout ({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>
      <div className='border border-gray-400 rounded-xl w-full max-w-xl mx-auto px-16 py-8'>
        {children}
      </div>
    </div>
  )
}
