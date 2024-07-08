'use client'

import { FC, memo, useState, useCallback } from 'react'
import { Button } from '~/components/ui/button'

interface IProps {
  age: number
  handleClick: () => void
}

const Age: FC<IProps> = ({ age, handleClick }) => {
  return (
    <div>
      <div>
        Today I am {age} Years of Age
      </div>
      <pre> - click the Button below 👇 </pre>
      <Button onClick={handleClick}>Get older! </Button>
    </div>
  )
}

const Instructions = memo(function Instructions ({ doSomething }: {doSomething: () => void}) {
  console.log(doSomething())

  return (
    <div style={{ background: 'black', color: 'yellow', padding: '1rem' }}>
      <p>Follow the instructions above as closely as possible</p>
    </div>
  )
})

export const UseCallbackComponent: FC = () => {
  const [age, setAge] = useState(99)
  const handleClick = () => setAge(age + 1)
  const someValue = 'someValue'
  const doSomething = useCallback(() => {
    return someValue
  }, [someValue])

  return (
    <>
      <Age age={age} handleClick={handleClick} />
      <Instructions doSomething={doSomething} />
    </>
  )
}
