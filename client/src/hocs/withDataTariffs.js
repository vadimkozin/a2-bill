import React, { useState, useEffect, useRef, useCallback } from 'react'
import CProgress from 'src/common/circular-progress'
import { makeStyles } from '@material-ui/core/styles'
import { getTariffAsync } from 'src/mock/storeMock'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const withDataTariffs = (Component) => (props) => {
  const classes = useStyles()
  const { tariffId } = props
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      const tariff = await getTariffAsync(tariffId)
      if (!mountedRef.current) return null
      setData(tariff)
    } catch (error) {
      console.log(`error::`, error)
      throw error
    }
  }, [tariffId])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])


  // useEffect(() => {
  //   getTariffAsync(tariffId).then((data) => setData(data))
  // }, [tariffId])

  if (data === null) {
    return (
      <div className={classes.wrapper}>
        <CProgress size={24} />
      </div>
    )
  }

  return <Component {...props} data={data} />
}

export default withDataTariffs
