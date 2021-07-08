import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import { fetchCustomers } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { ContextApp, ctx } from 'src/common/context-app'

const withDataCustomers = (Component) => (props) => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      if (ctx.isCustomers(contextApp)) {
        setData(contextApp.customers)
      } else {
        const customers = await fetchCustomers()
        if (!mountedRef.current) return null
        setData(customers)
        setContextApp((context) => ({ ...context, customers }))
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

export default withDataCustomers
