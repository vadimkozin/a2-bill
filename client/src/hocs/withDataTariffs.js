import React, { useState, useEffect } from 'react'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { useTariff } from 'src/hooks/tariff.hook'
import { useMountedRef } from 'src/hooks/mounted-ref.hook'

const withDataTariffs = (Component) => (props) => {
  const { getTariffs, error } = useTariff()
  const [data, setData] = useState(null)
  const mounted = useMountedRef()

  useEffect(() => {
    getTariffs().then((data) => {
      if (mounted.current) setData(data)
    })
  }, [getTariffs, mounted])

  if (error) {
    return <ShowError error={error} />
  }

  if (data === null) {
    return <ShowProgress />
  }

  return <Component {...props} data={data} />
}

export default withDataTariffs
