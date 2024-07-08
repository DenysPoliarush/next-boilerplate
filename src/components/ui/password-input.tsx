import Link from 'next/link'
import * as React from 'react'
import { cn } from '~/core/helpers'

export interface IPasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showForgotPassword?: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, IPasswordInputProps>(({
  className,
  type,
  showForgotPassword,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  function togglePasswordVisibility () {
    setShowPassword(!showPassword)
  }

  return (
    <div className='relative'>
      {
        showForgotPassword && (
          <Link href='/auth/new-password' className='absolute -top-6 right-0 text-xs'>Forgot password?</Link>
        )
      }

      <input
        type={showPassword ? 'text' : type}
        className={cn(
          // eslint-disable-next-line max-len
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />

      <div
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400"
        onClick={togglePasswordVisibility}
      >
        {showPassword
          ? (
            1
            // <IconVisible
            //   className="h-4 w-4 fill-current text-grey-400"
            // />
          )
          : (
            0
            // <IconNotVisible
            //   className="h-4 w-4 fill-current text-grey-400"
            // />
          )}
      </div>
    </div>
  )
})

PasswordInput.displayName = 'Input'

export { PasswordInput }
