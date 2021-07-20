import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(2)
  }
}))
const Home = () => {
  const classes = useStyles()

  return (
    <>
    <Typography variant='h3' component='h1' className={classes.title}>
      Биллинг A2
    </Typography>
    <Typography variant='h5'>
      Информация по оборудованию находиться здесь: <a href={'https://info.a2tele.com'}>info.a2tele.com</a>
    </Typography>
    </>
  )
}

export default Home
