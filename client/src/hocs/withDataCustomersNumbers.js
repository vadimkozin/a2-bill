import React, { useState, useEffect, useCallback } from 'react'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { useCustomer } from 'src/hooks/customer.hook'
import { useNumber } from 'src/hooks/number.hook'
import { useMountedRef } from 'src/hooks/mounted-ref.hook'

const withDataCustomersNumbers = (Component) => (props) => {
  const [customers, setCustomers] = useState(null)
  const [numbers, setNumbers] = useState(null)

  const [getCustomers, error1] = useCustomer()
  const [getNumbers, error2] = useNumber()
  const mounted = useMountedRef()

  const fetchData = useCallback(async () => {
    const customers = await getCustomers()
    if (mounted.current) setCustomers(customers)
    const numbers = await getNumbers()
    if (mounted.current) setNumbers(numbers)
  }, [getCustomers, getNumbers, mounted])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (error1) {
    return <ShowError error={error1} />
  }

  if (error2) {
    return <ShowError error={error2} />
  }

  if (customers === null || numbers === null) {
    return <ShowProgress />
  }

  return <Component {...props} customers={customers} numbers={numbers} />
}

export default withDataCustomersNumbers
