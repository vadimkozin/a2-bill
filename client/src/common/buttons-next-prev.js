import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { BOTTONS_NEXTPREV_TYPE } from 'src/types/types'

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

const ButtonsNextPrev = ({
  textNext = 'Next >',
  textPrev = '< Back',
  disabledNext = true,
  handleBack,
  handleNext,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Button
        variant='contained'
        color='default'
        onClick={handleBack}
        className={classes.button}
      >
        {textPrev}
      </Button>
      <Button
        variant='contained'
        disabled={disabledNext}
        color='primary'
        onClick={handleNext}
      >
        {textNext}
      </Button>
    </div>
  )
}

ButtonsNextPrev.propTypes = BOTTONS_NEXTPREV_TYPE
export default ButtonsNextPrev
