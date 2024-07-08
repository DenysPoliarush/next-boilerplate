'use client'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  useCounter,
  useCounterText
} from './CounterContext'

export const ContextComponent = () => {
  const { text, handleTextInput } = useCounterText()
  const { count, increment, decrement } = useCounter()

  return (
    <>
      <h1 className='mt-10'>Current Count: {count}</h1>
      <div>
        <Button className='mr-2' onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>
      <Input className='mt-2' type='text' onChange={handleTextInput} />
      <h2>{text}</h2>
    </>
  )
}
