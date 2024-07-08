'use client'

import { memo, ReactNode, useDeferredValue, useState } from 'react'
import { Input } from '~/components/ui/input'

const SlowList = memo(function SlowList (): JSX.Element {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />')

  const items: ReactNode[] = []

  const [text, setText] = useState<string>('')
  const deferredText = useDeferredValue<string>(text)

  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={deferredText} />)
  }

  return (
    <>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='type fast'
      />
      <ul className="items">
        {items}
      </ul>
    </>
  )
})

interface ISlowItemProps {
  text: string
}

function SlowItem ({ text }: ISlowItemProps): JSX.Element {
  const startTime = performance.now()
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}

export default SlowList
