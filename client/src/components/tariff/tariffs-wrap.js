import React from 'react'
import Tariffs from './tariffs'
import withDataTariffs from 'src/hocs/withDataTariffs'

const TariffsWrapped = withDataTariffs(Tariffs)

const TariffWrap = () => <TariffsWrapped tariffId={1} />

export default TariffWrap
