import { useState, useCallback, useContext } from 'react'
import { MainContext } from 'src/context/main-context'
import { fetchCustomers } from 'src/store/api-action'

export const useCustomer = () => {
  const main = useContext(MainContext)
  const [error, setError] = useState(null)

  const getCustomers = useCallback(async () => {
    try {
      if (main.isCustomers()) {
        return main.customers
      } else {
        const customers = await fetchCustomers()
        main.saveCustomers(customers)
        return customers
      }
    } catch (error) {
      setError(error)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [getCustomers, error]
}
