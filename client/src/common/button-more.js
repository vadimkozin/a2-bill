import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { BOTTON_MORE_TYPE } from 'src/types/types'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: 50,
    justifyContent: 'flex-end',
  },
}))

const ButtonMore = ({ text = 'Next', disabled = true, onClick }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Button
        variant='contained'
        disabled={disabled}
        color='primary'
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  )
}

ButtonMore.propTypes = BOTTON_MORE_TYPE
export default ButtonMore
