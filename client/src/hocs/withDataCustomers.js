import React, { useState, useEffect, useRef, useCallback } from 'react'
import CProgress from 'src/common/circular-progress'
import { makeStyles } from '@material-ui/core/styles'
import { getCustomersAsync } from 'src/mock/storeMock'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const withDataCustomers = (Component) => (props) => {
  const classes = useStyles()
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      const customers = await getCustomersAsync()
      if (!mountedRef.current) return null;
      setData(customers)
    } catch (error) {
      console.log(`error::`, error)
      throw error
    }
  }, [])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  // useEffect(() => {
  //   getCustomersAsync().then((data) => setData(data))
  // }, [])

  if (data === null) {
    return (
      <div className={classes.wrapper}>
        <CProgress size={24} />
      </div>
    )
  }

  return <Component {...props} data={data} />
}

export default withDataCustomers
