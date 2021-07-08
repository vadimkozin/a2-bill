import React from 'react'
import Customers from './customers'
import withDataCustomers from 'src/hocs/withDataCustomers'

const Wrapped = withDataCustomers(Customers)

export default () => <Wrapped />