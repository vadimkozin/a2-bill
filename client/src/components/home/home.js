import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(2),
  },
  text: {
    marginTop: theme.spacing(2),
  },
}))
const Home = () => {
  const classes = useStyles()

  return (
    <>
      <Typography variant='h3' component='h1' className={classes.title}>
        Биллинг A2
      </Typography>
      <Typography variant='h5' className={classes.text}>
        Клиенты, номера, тарифы и отчёты. Можно переоформить номер на другого
        владельца, редактировать клиента или добавить нового.
      </Typography>
      <Typography variant='h5' className={classes.text}>
        Информация по оборудованию находиться здесь:{' '}
        <a href={'https://info.a2tele.com'}>info.a2tele.com</a>
      </Typography>
    </>
  )
}

export default Home
