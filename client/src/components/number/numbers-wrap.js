import React from 'react'
import Numbers from './numbers'
import withDataNumbers from 'src/hocs/withDataNumbers'

const NumbersWrapped = withDataNumbers(Numbers)

const NumbersWrap = () => <NumbersWrapped isOnlyA2={true} />

export default NumbersWrap
