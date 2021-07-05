import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { BOTTONS_CANCELSAVE_TYPE } from 'src/types/types'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    marginTop: 50,
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: theme.spacing(2),
  },
}))

const ButtonsCancelSave = ({
  textCancel = 'Cancel',
  textSave = 'Save',
  disabledSave = true,
  handleCancel,
  handleSave,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Button
        variant='contained'
        color='default'
        onClick={handleCancel}
        className={classes.button}
      >
        {textCancel}
      </Button>
      <Button
        variant='contained'
        disabled={disabledSave}
        color='primary'
        onClick={handleSave}
      >
        {textSave}
      </Button>
    </div>
  )
}

ButtonsCancelSave.propTypes = BOTTONS_CANCELSAVE_TYPE
export default ButtonsCancelSave
