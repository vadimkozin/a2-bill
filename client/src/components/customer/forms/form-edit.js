import React from 'react'
import { useParams } from 'react-router-dom'
import FormCustomerMain from 'src/components/customer/forms/form-customer-main'
import FormPersonalMain from 'src/components/customer/forms/form-personal-main'
import withDataCustomer from 'src/hocs/withDataCustomer'
import { getCustomer } from 'src/mock/storeMock'

const FormCustomerMainWrapped = withDataCustomer(FormCustomerMain)
const FormPersonalMainWrapped = withDataCustomer(FormPersonalMain)

const FormEdit = () => {
  const { cid } = useParams()
  const customer = getCustomer(cid)

  const go = (customer) => {
    switch (customer.custType) {
      case 'u':
        return <FormCustomerMainWrapped isNewCustomer={false} custId={cid} />

      case 'f':
        return <FormPersonalMainWrapped isNewCustomer={false} custId={cid} />

      default:
        return (
          <h3>{`Что-то пошло не так. Ошибка в типе клиента custType: ${customer.custType}`}</h3>
        )
    }
  }

  return <>{customer ? go(customer) : `Клиент с кодом : ${cid} не найден.`}</>
}

export default FormEdit
