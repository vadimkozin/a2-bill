import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from 'src/routing/routes'
import routesLogin from 'src/routing/routes-login'
import { AuthContext } from 'src/context/auth-context'

const Routing = () => {
  const auth = React.useContext(AuthContext)
  console.log(`auth.isAuthenticated:`, auth.isAuthenticated)

  const routing = useRoutes(routes)
  const login = useRoutes(routesLogin)

  return <>{auth.isAuthenticated ? routing : login}</>
}

export default Routing
