export default function ReactHooksLayout ({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex w-full min-h-screen'>
      <HooksMenu />
      <div className='pl-4'>{children}</div>
    </div>
  )
}
