import { useState, useCallback, useContext } from 'react'
import { MainContext } from 'src/context/main-context'
import { fetchNumbers} from 'src/store/api-action'

export const useNumber = () => {
  const main = useContext(MainContext)
  const [error, setError] = useState(null)

  const getNumbers = useCallback(async () => {
    try {
      if (main.isNumbers()) {
        return main.numbers
      } else {
        const numbers = await fetchNumbers()
        main.saveNumbers(numbers)
        return numbers
      }
    } catch (error) {
      setError(error)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [getNumbers, error]
}
