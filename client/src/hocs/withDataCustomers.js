import React, { useState, useEffect } from 'react'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { useCustomer } from 'src/hooks/customer.hook'
import { useMountedRef } from 'src/hooks/mounted-ref.hook'

const withDataCustomers = (Component) => (props) => {
  const [data, setData] = useState(null)
  const [getCustomers, error] = useCustomer()
  const mounted = useMountedRef()

  useEffect(() => {
    getCustomers().then((data) => {
      if (mounted.current) setData(data)
    })
  }, [getCustomers, mounted])

  if (error) {
    return <ShowError error={error} />
  }

  if (data === null) {
    return <ShowProgress />
  }

  return <Component {...props} data={data} />
}

export default withDataCustomers
