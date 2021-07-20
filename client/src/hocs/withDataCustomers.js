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
import { MainContext } from 'src/context/main-context'

const withDataCustomers = (Component) => (props) => {
  const main = useContext(MainContext)
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      if (main.isCustomers()) {
        setData(main.customers)
      } else {
        const customers = await fetchCustomers()
        if (!mountedRef.current) return null
        setData(customers)
        main.saveCustomers(customers)
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

export default withDataCustomers
