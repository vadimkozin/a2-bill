import React from 'react'
import NumberTransfer from './number-transfer'
import withDataCustomersNumbers from 'src/hocs/withDataCustomersNumbers'

const Wrapped = withDataCustomersNumbers(NumberTransfer)

export default () => <Wrapped />
