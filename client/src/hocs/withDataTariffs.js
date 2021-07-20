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
import { MainContext } from 'src/context/main-context'

const withDataTariffs = (Component) => (props) => {
  const main = useContext(MainContext)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
        if (main.isTariffs()) {
          setData(main.tariffs)
        } else {
        const tariffs = await fetchTariffs()
        if (!mountedRef.current) return null
        setData(tariffs)
        main.saveTariffs(tariffs)
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

export default withDataTariffs
