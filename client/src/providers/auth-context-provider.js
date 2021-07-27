import React from 'react'
import { AuthContext } from 'src/context/auth-context'
import { useAuth } from 'src/hooks/auth.hook'
import ShowProgress from 'src/common/show-progress'

const AuthContextProvider = ({ children }) => {
  const { token, userId, login, logout, ready, userName } = useAuth()

  const isAuthenticated = !!token

  if (!ready) {
    return <ShowProgress loading='' size={16}/>
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, userName, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
