import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { ContextApp } from 'src/common/context-app'

const AppUser = () => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)

  return (
    <Typography variant='h6' noWrap>
      {contextApp && contextApp.login}
    </Typography>
  )
}

export default AppUser
