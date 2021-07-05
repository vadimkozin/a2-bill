import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from './toolbar'
import { isFindInText } from 'src/utils'
import Page from 'src/components/page/page'
import ItemsList from 'src/common/items-list'
import { tariffsTelList } from 'src/store/tariffs'
import CProgress from 'src/common/circular-progress'
import { getTariff, getTariffAsync } from 'src/mock/storeMock'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: 0,
  },
  progress: {
    textAlign: 'center',
  },
}))

const tariffParams = {
  headers: ['Направл', 'Тар. клиент', 'Тар. опер', 'Кф.'],
  fields: ['name', 'custTar', 'operTar', 'kf'],
  searchs: ['name'],
  key: 'name',
}

const TariffMain = ({ params = tariffParams }) => {
  const classes = useStyles()
  const [tariff, setTariff] = useState(tariffsTelList[0])
  const [tariffs, setTariffs] = useState(getTariff(1))
  const [snapshotTariffs, setSnapshotTariffs] = useState(tariffs)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (text) => {
    const filteredTariffs = snapshotTariffs.filter((it) =>
      isFindInText(text, [it.name])
    )
    setSearchText(text)
    setTariffs(filteredTariffs)
  }

  const handleSelectTariff = async (tar) => {
    setTariff(tar)
    setSearchText('')

    setIsLoading(true)
    const tariff = await getTariffAsync(tar.tid)
    setTariffs(tariff)
    setSnapshotTariffs(tariff)
    setIsLoading(false)
  }

  const handleSelectItem = (item) => {
    console.log(`selected: `, item)
  }

  return (
    <Page className={classes.root} title='Tariffs'>
      <Container maxWidth={false}>
        <Toolbar
          onSearch={handleSearch}
          onSelect={handleSelectTariff}
          tariff={tariff}
          searchText={searchText}
        />
        {isLoading ? (
          <CProgress className={classes.progress} />
        ) : (
          <span>&nbsp;</span>
        )}
        <Box mt={0}>
          <ItemsList
            items={tariffs}
            params={params}
            onSelect={handleSelectItem}
            heightUsed={220}
          />
        </Box>
      </Container>
    </Page>
  )
}

export default TariffMain
