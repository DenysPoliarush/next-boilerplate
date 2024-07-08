import { ContextComponent } from './ContextComponent'
import { CounterProvider } from './CounterContext'

export default function useContextPage () {
  return (
    <>
      <h1>
        <span className='font-bold'>useContext</span>
        is a React Hook that lets you read and subscribe to context from your component.</h1>
      <p>Context lets the parent component make some information available to any component in
        the tree below it—no matter how deep—without passing it explicitly through props.</p>
      <p className='italic'>Similar to provide/inject in Vue</p>

      <CounterProvider>
        <ContextComponent />
      </CounterProvider>
    </>
  )
}
