'use client'

import { ChangeEvent, createContext, ReactElement } from 'react'
export const initState = { count: 0, text: '' }

type TStateType = {
  count: number
  text: string
}

const enum EReducerActionType {
  INCREMENT,
  DECREMENT,
  NEW_INPUT
}

type TReducerActionType = {
  type: EReducerActionType
  payload?: string
}

const reducer = (state: TStateType, action: TReducerActionType) => {
  switch (action.type) {
  case EReducerActionType.INCREMENT:
    return { ...state, count: state.count + 1 }
  case EReducerActionType.DECREMENT:
    return { ...state, count: state.count - 1 }
  case EReducerActionType.NEW_INPUT:
    return { ...state, text: action.payload ?? '' }
  default:
    throw new Error()
  }
}

const useCounterContext = (initState: TStateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const increment = useCallback(() => dispatch({ type: EReducerActionType.INCREMENT }), [])

  const decrement = useCallback(() => dispatch({ type: EReducerActionType.DECREMENT }), [])

  const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EReducerActionType.NEW_INPUT,
      payload: e.target.value
    })
  }, [])

  return {
    state,
    increment,
    decrement,
    handleTextInput
  }
}

type TUseCounterContextType = ReturnType<typeof useCounterContext>

const initContextState: TUseCounterContextType = {
  state: initState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  increment: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  decrement: () => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {}

}

export const CounterContext = createContext<TUseCounterContextType>(initContextState)

export const CounterProvider: FC<{children: ReactElement}> = ({ children }) => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider >
  )
}

type TUseCounterHookType = {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounter = (): TUseCounterHookType => {
  const { state: { count }, increment, decrement } = useContext(CounterContext)

  return {
    count, increment, decrement
  }
}

type TUseCounterTextHookType = {
  text: string
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useCounterText = (): TUseCounterTextHookType => {
  const { state: { text }, handleTextInput } = useContext(CounterContext)
  return { text, handleTextInput }
}
