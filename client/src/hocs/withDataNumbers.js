import React, { useState, useEffect, useRef, useCallback } from 'react'
import { fetchNumbers } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'

const withDataNumbers = (Component) => (props) => {
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const numbers = await fetchNumbers()
      if (!mountedRef.current) return null
      setData(numbers)
    } catch (error) {
      setError(error)
    }
  }, [])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  // useEffect(() => {
  //   getNumbersAsync(isOnlyA2).then((data) => setData(data))
  // }, [isOnlyA2])

  if (error) {
    return <ShowError error={error} />
  }

  if (data === null) {
    return <ShowProgress />
  }
  
  return <Component {...props} data={data} />
}

export default withDataNumbers
