import React from 'react'
import { Navigate } from 'react-router-dom'
import MainLayout from 'src/layouts/main-layout/main-layout'
import Login from 'src/components/login/login'

const routesLogin = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to='/login' /> },
      { path: '*', element: <Navigate to='/login' /> },
    ],
  },
]

export default routesLogin
