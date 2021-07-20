import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import { useParams } from 'react-router-dom'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { fetchCustomers } from 'src/store/api-action'
import { MainContext } from 'src/context/main-context'
import FormCustomerMain from 'src/components/customer/forms/form-customer-main'
import FormPersonalMain from 'src/components/customer/forms/form-personal-main'

const getCustomer = (customers, custId) =>
  customers.find((cust) => String(cust.custId) === String(custId))

const FormEdit = () => {
  const main = useContext(MainContext)
  const { cid } = useParams()
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      if (main.isCustomers()) {
        setCustomer(getCustomer(main.customers, cid))
      } else {
        const customers = await fetchCustomers()
        if (!mountedRef.current) return null
        const customer = getCustomer(customers, cid)
        if (!customer) throw new Error(`Клиент с кодом : ${cid} не найден.`)
        setCustomer(getCustomer(customers, cid))
        main.saveCustomers(customers)
      }
    } catch (error) {
      setError(error)
    }
  }, [cid, main])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  const go = (custType) => {
    switch (custType) {
      case 'u':
        return <FormCustomerMain isNewCustomer={false} customer={customer} />

      case 'f':
        return <FormPersonalMain isNewCustomer={false} customer={customer} />

      default:
        return (
          <h3>{`Что-то пошло не так. Ошибка в типе клиента custType: ${custType} для клиента с кодом: ${cid}`}</h3>
        )
    }
  }

  if (error) {
    return <ShowError error={error} />
  }

  if (customer === null) {
    return <ShowProgress />
  }

  return <>{go(customer.custType)}</>
}

export default FormEdit
