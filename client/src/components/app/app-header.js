import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { ContextApp } from 'src/common/context-app'

const AppHeader = () => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)

  return (
    <Typography variant='h4' noWrap>
      {contextApp && contextApp.title}
    </Typography>
  )
}

export default AppHeader
