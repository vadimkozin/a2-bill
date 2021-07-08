import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import MainLayout from 'src/layouts/main-layout/main-layout'
import DashboardLayout from 'src/layouts/dashboard-layout/dashboard-layout'
import Home from 'src/components/home/home'
import Tariffs from 'src/components/tariff/tariffs-wrap'
import Numbers from 'src/components/number/numbers-wrap'
// import NumberTransfer from 'src/components/number/number-transfer'
import NumberTransfer from 'src/components/number/number-transfer-wrap'

import Reports from 'src/components/report/reports'
import ReportsMonths from 'src/components/report/reports-months'
import ReportsFiles from 'src/components/report/reports-files'
import Login from 'src/components/login/login'
import NotFound from 'src/components/blank/blank'
import Customers from 'src/components/customer/customer-main/customers-wrap'
import CustomerAdd from 'src/components/customer/forms/form-add'
import CustomerEdit from 'src/components/customer/forms/form-edit'
import EnhancedTable from 'src/components/table/enhanced-table'

/*
  app/customers          - Customers
  app/customers/add      - CustomerAdd
  app/customers/edit/42  - CustomerEdit
  app/tariffs            - Tariffs
  app/numbers            - Numbers
  app/numbers/transfer/6261000 - NumberTransfer

  app/reports               - Reports - отчёты по годам
  app/reports/2021          - ReportsMonths - отчёты по месяцам за 2021
  app/reports/2021/2021_05  - ReportsFiles - файлы отчётов за май-2021
*/

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'logout', element: <Login action={'logout'}/> },
      { path: '404', element: <NotFound text={'NOT FOUND'} /> },
      { path: '/', element: <Navigate to='/app/home' /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {
        path: 'customers',
        element: <Outlet />,
        children: [
          { path: '/', element: <Customers /> },
          { path: 'add', element: <CustomerAdd /> },
          { path: 'edit/:cid', element: <CustomerEdit /> },
          { path: 'q', element: <EnhancedTable /> },
        ],
      },
      { path: 'home', element: <Home text={'Home'} /> },
      { path: 'tariffs', element: <Tariffs /> },
      { path: 'numbers',
        element: <Outlet />,
        children: [
          { path: '/', element: <Numbers /> },
          // { path: 'transfer', element: <Navigate to='..' replace={true} /> },
          { path: 'transfer/:number', element: <NumberTransfer /> },
        ],
      },
      { path: 'reports',
        element: <Outlet />,
        children: [
          { path: '/', element: <Reports /> },
          { path: '/:year', element: <ReportsMonths /> },
          { path: '/:year/:month', element: <ReportsFiles /> },
        ],
      },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
]

export default routes
