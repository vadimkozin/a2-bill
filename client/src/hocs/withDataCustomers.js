import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { getCustomersAsync } from 'src/mock/storeMock'
import { fetchCustomers } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'

const withDataCustomers = (Component) => (props) => {
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const customers = await fetchCustomers()
      if (!mountedRef.current) return null;
      setData(customers)
    } catch (error) {
      setError(error)
    }
  }, [])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  // useEffect(() => {
  //   getCustomersAsync().then((data) => setData(data))
  // }, [])

  if (error) {
    return <ShowError error={error} />
  }

  if (data === null) {
    return <ShowProgress />
  }

  return <Component {...props} data={data} />
}

export default withDataCustomers
