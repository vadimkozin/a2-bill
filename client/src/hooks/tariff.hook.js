import { useState, useCallback, useContext } from 'react'
import { MainContext } from 'src/context/main-context'
import { fetchTariffs, fetchTariffsList } from 'src/store/api-action'

export const useTariff = () => {
  const main = useContext(MainContext)
  const [error, setError] = useState(null)

  const getTariffs = useCallback(async () => {
    try {
      if (main.isTariffs()) {
        return main.tariffs
      } else {
        const tariffs = await fetchTariffs()
        main.saveTariffs(tariffs)
        return tariffs
      }
    } catch (error) {
      setError(error)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTariffsList = useCallback(async () => {
    try {
      if (main.isTariffsList()) {
        return main.tariffsList
      } else {
        const tariffsList = await fetchTariffsList()
        main.saveTariffsList(tariffsList)
        return tariffsList
      }
    } catch (error) {
      setError(error)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { getTariffs, getTariffsList, error }
}
