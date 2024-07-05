'use client'

export const UseLayoutEffectComponent: FC = () => {
  const [randomNumber, setRandomNumber] = useState(0)
  const [effectLogs, setEffectLogs] = useState<(number | string)[]>([])

  useLayoutEffect(
    () => {
      setEffectLogs(prevEffectLogs => [...prevEffectLogs, 'effect fn has been invoked'])
    },
    [randomNumber]
  )

  return (
    <>
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
    </>
  )
}
