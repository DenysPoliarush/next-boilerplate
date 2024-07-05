import { UseStateComponent } from './UseState'

export default function useStatePage () {
  return (
    <>
      <h1>
        <span className='font-bold mr-1'>useState</span>
       is a React Hook that lets you add a reactive variable to your component.
      </h1>
      <p className='italic'>Similar to ref() in Vue</p>
      <UseStateComponent />
    </>
  )
}
