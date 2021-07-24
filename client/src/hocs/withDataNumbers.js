import React, { useState, useEffect } from 'react'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { useNumber } from 'src/hooks/number.hook'
import { useMountedRef } from 'src/hooks/mounted-ref.hook'

const withDataNumbers = (Component) => (props) => {
  const [getNumbers, error] = useNumber()
  const [data, setData] = useState(null)
  const mounted = useMountedRef()

  useEffect(() => {
    getNumbers().then((data) => {
      if (mounted.current) setData(data)
    })
  }, [getNumbers, mounted])

  if (error) {
    return <ShowError error={error} />
  }

  if (data === null) {
    return <ShowProgress />
  }

  return <Component {...props} data={data} />
}

export default withDataNumbers
