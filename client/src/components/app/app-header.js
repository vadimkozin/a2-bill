import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { MainContext } from 'src/context/main-context'

const AppHeader = () => {
  const main = useContext(MainContext)

  return (
    <Typography variant='h4' noWrap>
      {main.title}
    </Typography>
  )
}

export default AppHeader
