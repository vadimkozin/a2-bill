import React, { useState, useEffect, useRef, useCallback } from 'react'
import CProgress from 'src/common/circular-progress'
import { makeStyles } from '@material-ui/core/styles'
import { getNumbersAsync } from 'src/mock/storeMock'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const withDataNumbers = (Component) => (props) => {
  const classes = useStyles()
  const { isOnlyA2 } = props
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      const numbers = await getNumbersAsync(isOnlyA2)
      if (!mountedRef.current) return null
      setData(numbers)
    } catch (error) {
      console.log(`error::`, error)
      throw error
    }
  }, [isOnlyA2])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  // useEffect(() => {
  //   getNumbersAsync(isOnlyA2).then((data) => setData(data))
  // }, [isOnlyA2])

  if (data === null) {
    return (
      <div className={classes.wrapper}>
        <CProgress size={24} />
      </div>
    )
  }

  return <Component {...props} data={data} />
}

export default withDataNumbers
