import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ContextApp } from 'src/common/context-app'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginTop: theme.spacing(2)
  }
}))
const Home = () => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)
  const classes = useStyles()

  useEffect(() => {
    setContextApp((context) => ({ ...context, title: null }))
  }, [setContextApp])

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
