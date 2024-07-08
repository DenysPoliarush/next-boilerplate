'use client'

import { FC, useReducer } from 'react'
import { Button } from '~/components/ui/button'

const initialState = { width: 15 }

const reducer = (
  state: { width: number },
  action: { type: 'plus' | 'minus' }
) => {
  switch (action.type) {
  case 'plus':
    return { ...state, width: state.width + 15 }
  case 'minus':
    return { ...state, width: Math.max(state.width - 15, 2) }
  default:
    throw new Error("what's going on?")
  }
}

export const UseReducerComponent: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <div
        style={{ background: 'teal', height: '30px', width: state.width }}
      ></div>
      <div style={{ marginTop: '3rem' }}>
        <Button onClick={() => dispatch({ type: 'plus' })}>
          Increase bar size
        </Button>
        <Button onClick={() => dispatch({ type: 'minus' })}>
          Decrease bar size
        </Button>
      </div>
    </>
  )
}
