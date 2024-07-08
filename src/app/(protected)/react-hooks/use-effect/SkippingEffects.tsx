'use client'

import { FC, useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'

export const SkippingEffects: FC = () => {
  const [randomNumber, setRandomNumber] = useState(0)
  const [effectLogs, setEffectLogs] = useState<(string | number)[]>([])

  useEffect(
    () => {
      setEffectLogs(prevEffectLogs => [...prevEffectLogs, 'effect fn has been invoked'])
    },
    []
  )

  return (
    <div>
      <h1>{randomNumber}</h1>
      <Button
        onClick={() => {
          setRandomNumber(Math.random())
        }}
      >
        Generate random number!
      </Button>

      <div>
        {effectLogs.map((effect, index) => (
          <div key={index}>{'🍔'.repeat(index) + effect}</div>
        ))}
      </div>
    </div>
  )
}
