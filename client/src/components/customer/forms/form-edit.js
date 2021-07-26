import React, {
  useState,
  useEffect,
} from 'react'
import { useParams } from 'react-router-dom'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import FormCustomerMain from 'src/components/customer/forms/form-customer-main'
import FormPersonalMain from 'src/components/customer/forms/form-personal-main'
import { useTariff } from 'src/hooks/tariff.hook'
import { useCustomer } from 'src/hooks/customer.hook'
import { useMountedRef } from 'src/hooks/mounted-ref.hook'

const getCustomer = (customers, custId) =>
  customers.find((cust) => String(cust.custId) === String(custId))

const FormEdit = () => {
  const { cid } = useParams()
  const [tariffsList, setTariffsList] = useState(null)
  const [customer, setCustomer] = useState(null)
  const { getTariffsList } = useTariff()
  const [getCustomers, error] = useCustomer()
  const mounted = useMountedRef()

  useEffect(() => {
    getCustomers().then((customers) => {
      if (mounted.current) setCustomer(getCustomer(customers, cid))
    })
  }, [getCustomers, mounted, cid])

  useEffect(() => {
    getTariffsList().then((data) => setTariffsList(data))
  }, [getTariffsList])

  const go = (custType) => {
    switch (custType) {
      case 'u':
        return (
          <FormCustomerMain
            isNewCustomer={false}
            customer={customer}
            tarTel={customer.tarTel}
            tariffsTelList={tariffsList}
          />
        )

      case 'f':
        return (
          <FormPersonalMain
            isNewCustomer={false}
            customer={customer}
            tarTel={customer.tarTel}
            tariffsTelList={tariffsList}
          />
        )

      default:
        return (
          <h3>{`Что-то пошло не так. Ошибка в типе клиента custType: ${custType} для клиента с кодом: ${cid}`}</h3>
        )
    }
  }

  if (error) {
    return <ShowError error={error} />
  }

  if (customer === null || tariffsList === null) {
    return <ShowProgress />
  }

  console.log(`customer:`, customer)
  console.log(`tariffsList:`, tariffsList)

  return <>{go(customer.custType)}</>
}

export default FormEdit
