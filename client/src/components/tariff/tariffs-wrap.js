import React from 'react'
import Tariffs from './tariffs'
import withDataTariffs from 'src/hocs/withDataTariffs'

const Wrapped = withDataTariffs(Tariffs)

export default () => <Wrapped />