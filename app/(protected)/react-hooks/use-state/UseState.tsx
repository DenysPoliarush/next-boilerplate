'use client'

export const UseStateComponent: FC = () => {
  const [count, setCount] = useState(0)

  const multipleIncrement = () => {
    console.log(count)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    console.log(count)
  }
  const multipleIncrementBad = () => {
    console.log(count)
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    console.log(count)
  }

  const preText = `const multipleIncrement = () => {
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }`

  const preTextBad = `const multipleIncrementBad = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }`

  return (
    <div>
      <p className='mb-2'>Count value is: {count}</p>
      <Button className='mr-2' onClick={() => setCount(0)}>Reset</Button>

      <Button className='mr-2' onClick={() => setCount(prevCount => prevCount + 1)}>
        Plus (+)
      </Button>

      <Button className='mr-2' onClick={() => setCount(prevCount => prevCount - 1)}>
        Minus (-)
      </Button>

      <Button className='mr-2' onClick={multipleIncrement}>
        Good multiple +
      </Button>

      <Button onClick={multipleIncrementBad}>
       Bad multiple +
      </Button>

      <div className='flex justify-between mt-4 space-x-4'>
        <div className='border border-grey-500 rounded-2xl p-4 flex-1'>
          <p className='font-bold'>Good multiple +</p>
          <pre>
            {preText}
          </pre>
        </div>

        <div className='border border-grey-500 rounded-2xl p-4 flex-1'>
          <p className='font-bold'>Bad multiple +</p>
          <pre>
            {preTextBad}
          </pre>
        </div>
      </div>
    </div>
  )
}
