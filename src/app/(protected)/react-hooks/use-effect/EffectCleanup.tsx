'use client'

import { FC, useEffect } from 'react'

export const EffectCleanup: FC = () => {
  useEffect(() => {
    const clicked = () => console.log('window clicked')
    window.addEventListener('click', clicked)

    // return a clean-up function
    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  return (
    <div>
      When you click the window you`ll
      find a message logged to the console
    </div>
  )
}
