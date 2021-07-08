import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import { fetchTariffs } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { ContextApp, ctx } from 'src/common/context-app'

const withDataTariffs = (Component) => (props) => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      if (ctx.isTariffs(contextApp)) {
        setData(contextApp.tariffs)
      } else {
        const tariffs = await fetchTariffs()
        if (!mountedRef.current) return null
        setData(tariffs)
        setContextApp((context) => ({ ...context, tariffs }))
      }
    } catch (error) {
      setError(error)
    }
  }, [contextApp, setContextApp])

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

export default withDataTariffs
