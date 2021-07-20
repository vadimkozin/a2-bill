import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/context/auth-context'
import {MainContext} from 'src/context/main-context'
const Logout = () => {
  const main = useContext(MainContext)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/login')
    auth.logout()
    main.reset()
  })

  return <></>
}

export default Logout