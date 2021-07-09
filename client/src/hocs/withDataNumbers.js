import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import { fetchNumbers } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { ContextApp, ctx } from 'src/common/context-app'

const withDataNumbers = (Component) => (props) => {
  const [contextApp, setContextApp] = useContext(ContextApp)
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      if (ctx.isNumbers(contextApp)) {
        setData(contextApp.numbers)
      } else {
        const numbers = await fetchNumbers()
        if (!mountedRef.current) return null
        setData(numbers)
        setContextApp((context) => ({ ...context, numbers }))
      }
    } catch (error) {
      setError(error)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  if (error) {
    return <ShowError error={error} />
  }

  if (data === null) {
    return <ShowProgress />
  }

  return <Component {...props} data={data} />
}

export default withDataNumbers
