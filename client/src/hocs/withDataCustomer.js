import React, { useState, useEffect, useRef, useCallback } from 'react'
import CProgress from 'src/common/circular-progress'
import { makeStyles } from '@material-ui/core/styles'
import { getCustomerAsync } from 'src/mock/storeMock'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    marginLeft: '24px',
  },
}))

const withDataCustomer = (Component) => (props) => {
  const classes = useStyles()
  const { custId } = props
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      const customer = await getCustomerAsync(custId)
      if (!mountedRef.current) return null;
      setData(customer)
    } catch (error) {
      console.log(`error::`, error)
      throw error
    }
  }, [custId])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  // useEffect(() => {
  //   getCustomerAsync(custId).then((data) => setData(data))
  // }, [custId])

  if (data === null) {
    return (
      <div className={classes.wrapper}>
        <CProgress size={24} />
      </div>
    )
  }

  return <Component {...props} data={data} />
}

export default withDataCustomer
