import React from 'react'
import Numbers from './numbers'
import withDataNumbers from 'src/hocs/withDataNumbers'

const Wrapped = withDataNumbers(Numbers)

export default () => <Wrapped isOnlyA2={true} />