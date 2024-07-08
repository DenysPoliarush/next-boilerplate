'use client'

import { FC, useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'

export const BasicEffect: FC = () => {
  const [age, setAge] = useState(0)
  const handleClick = () => setAge(age + 1)

  useEffect(() => {
    document.title = 'You are ' + age + ' years old!'
  })

  return (
    <div>
      <p> Look at the title of the current tab in your browser </p>
      <Button onClick={handleClick}>Update Title!! </Button>
    </div>
  )
}
