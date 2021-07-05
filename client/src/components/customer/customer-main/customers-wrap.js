import React from 'react'
import Customers from './customers'
import withDataCustomers from 'src/hocs/withDataCustomers'

const CustomersWrapped = withDataCustomers(Customers)

const CustomersWrap = () => <CustomersWrapped />

export default CustomersWrap
