import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'src/theme'
import routes from 'src/routing/routes'
import routesLogin from 'src/routing/routes-login'
import { ContextApp } from 'src/common/context-app'

const App = () => {
  const routing = useRoutes(routes)
  const login = useRoutes(routesLogin)

  const [contextApp, setContextApp] = useState(null)
  console.log(`contextApp:`, contextApp)

  const isEntryOk = contextApp && contextApp.login
  console.log(`isEntryOk:`, isEntryOk)

  return (
    <ThemeProvider theme={theme}>
      <ContextApp.Provider value={[contextApp, setContextApp]}>
        <CssBaseline />
        {isEntryOk ? routing : login}
      </ContextApp.Provider>
    </ThemeProvider>
  )
}

export default App
