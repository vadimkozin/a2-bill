import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 30,
  },
}))

const FROM_ERRCODE_TO_MESSAGE_MAP = {
  'ETIMEDOUT': 'Превышено время ожидания сервера',
  'AbortError': 'Превышено время ожидания',
}

const getError = (error) => {
  let message = FROM_ERRCODE_TO_MESSAGE_MAP[error.ecode]
  if (!message) message = error.message
  return message
}

const ShowError = ({error}) => {
  const classes = useStyles()
  return (
    <div>
      <Typography variant='h4' align='center' className={classes.title}>
        Ошибка
      </Typography>
      <Typography variant='h3' align='center' color='primary'>
        {getError(error)}
      </Typography>
    </div>
  )
}

export default ShowError