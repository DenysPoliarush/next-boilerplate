'use client'

import { FC, useRef } from 'react'
import { Button } from '~/components/ui/button'

export const UseRefComponent: FC = () => {
  const textAreaEl = useRef<HTMLTextAreaElement>(null)
  const handleBtnClick = () => {
    if (textAreaEl.current) {
      textAreaEl.current.value =
        "The is the story of your life. You are an human being, and you're on a website about React Hooks"
      textAreaEl.current.focus()
    }
  }

  return (
    <>
      <div>
        <Button onClick={handleBtnClick}>
          Focus and Populate Text Field
        </Button>
      </div>
      <label
        htmlFor='story'
        style={{
          display: 'block',
          background: 'olive',
          margin: '1em',
          padding: '1em'
        }}
      >
        The Input box below will be focused and populated with some text
        (imperatively) upon clicking the button above.
      </label>
      <textarea ref={textAreaEl} id='story' rows={5} cols={33} />
    </>
  )
}
