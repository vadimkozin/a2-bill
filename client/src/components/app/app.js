import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'src/theme'
import MainContextProvider from 'src/providers/main-context-provider'
import AuthContextProvider from 'src/providers/auth-context-provider'
import Routing from 'src/components/routing/routing'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <MainContextProvider>
          <CssBaseline />
          <Routing />
        </MainContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
