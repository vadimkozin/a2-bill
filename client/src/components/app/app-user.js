import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useAuth } from 'src/hooks/auth.hook'

const AppUser = () => {
  const {userId, userName} = useAuth()

  return (
    <Typography variant='h6' noWrap>
      {userName && userName}
      {userId && `(${userId})`}
    </Typography>
  )
}

export default AppUser
