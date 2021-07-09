import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import { fetchCustomers, fetchNumbers } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { ContextApp, ctx } from 'src/common/context-app'

const withDataCustomersNumbers = (Component) => (props) => {
  const [contextApp, setContextApp] = useContext(ContextApp)
  const [customers, setCustomers] = useState(null)
  const [numbers, setNumbers] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)
  const mountedRef2 = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      if (ctx.isCustomers(contextApp)) {
        setCustomers(contextApp.customers)
      } else {
        const customers = await fetchCustomers()
        if (!mountedRef.current) return null
        setCustomers(customers)
        setContextApp((context) => ({ ...context, customers }))
      }
    } catch (error) {
      setError(error)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData2 = useCallback(async () => {
    try {
      if (ctx.isNumbers(contextApp)) {
        setNumbers(contextApp.numbers)
      } else {
        const numbers = await fetchNumbers()
        if (!mountedRef2.current) return null
        setNumbers(numbers)
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

  useEffect(() => {
    fetchData2()
    return () => (mountedRef2.current = false)
  }, [fetchData2])



  if (error) {
    return <ShowError error={error} />
  }

  if (customers === null || numbers === null) {
    return <ShowProgress />
  }

  return <Component {...props} customers={customers} numbers={numbers} />
}

export default withDataCustomersNumbers
