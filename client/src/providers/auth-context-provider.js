import React from 'react'
import { AuthContext } from 'src/context/auth-context'
import { useAuth } from 'src/hooks/auth.hook'

const AuthContextProvider = ({ children }) => {
  // const { token, userId, login, logout, ready, userName } = useAuth()
  const { token, userId, login, logout, userName } = useAuth()

  const isAuthenticated = !!token

  console.log(`isAuthenticated:`, isAuthenticated)
  // console.log(`AUTH:`, { userId, ready, userName })

  // if (!ready) {
  //   return <Loading />
  // }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, userName, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
