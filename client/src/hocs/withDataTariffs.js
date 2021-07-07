import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { getTariffAsync } from 'src/mock/storeMock'
import { fetchTariffs} from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'

const withDataTariffs = (Component) => (props) => {
  const { tariffId } = props
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      // const tariff = await getTariffAsync(tariffId)
      const tariffs = await fetchTariffs(tariffId)
      if (!mountedRef.current) return null
      setData(tariffs)
    } catch (error) {
      // throw error
      setError(error)
    }
  }, [tariffId])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])


  // useEffect(() => {
  //   getTariffAsync(tariffId).then((data) => setData(data))
  // }, [tariffId])

  if (error) {
    return <ShowError error={error} />
  }

  if (data === null) {
    return <ShowProgress />
  }

  return <Component {...props} data={data} />
}

export default withDataTariffs
