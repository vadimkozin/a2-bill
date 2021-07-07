import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CProgress from 'src/common/circular-progress'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const ShowProgress = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <CProgress size={24} />
    </div>
  )
}

export default ShowProgress
