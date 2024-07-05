'use client'

import { IInputProps } from '@/components/ui/input'

const CustomInput = forwardRef<HTMLInputElement, IInputProps>(({
  className,
  type,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={className}
      ref={ref}
      {...props}
    />
  )
})

CustomInput.displayName = 'Input'

export const ForwardRefComponent: FC = () => {
  const ref = useRef<HTMLInputElement>(null)

  const doSomething = () => {
    ref.current?.focus()
  }

  return (
    <div>
      <CustomInput className='p-2 mr-2' ref={ref} type="email" />
      <Button onClick={doSomething}>Focus</Button>
    </div>
  )
}
