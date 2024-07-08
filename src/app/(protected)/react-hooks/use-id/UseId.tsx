'use client'

import { FC, useId, useState } from 'react'
import { Input } from '~/components/ui/input'

export const UseIdComponent: FC = () => {
  const id = useId()
  const [uniqueId, setUniqueId] = useState('')
  const handleUniqueId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniqueId(event.target.value + id)
  }

  return (
    <>
      <Input
        type='text'
        id={id}
        onChange={handleUniqueId}
        placeholder='Enter prefix to your unique id'
      />
      <div>Your unique id with prefix: {uniqueId}</div>
    </>
  )
}
