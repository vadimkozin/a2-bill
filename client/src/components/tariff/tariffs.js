import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from './toolbar'
import { isFindInText } from 'src/utils'
import Page from 'src/components/page/page'
import ItemsList from 'src/common/items-list'
import { tariffsTelList } from 'src/store/tariffs'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: 0,
  },
  toolbar: {
    marginBottom: theme.spacing(1),
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
const getTariff = (tariffs, tarId) =>
  tariffs.filter((tariff) => Number(tariff.tid) === Number(tarId))

const Tariffs = ({ params = tariffParams, data }) => {
  // data - array all tariffs
  const classes = useStyles()
  const [tariff, setTariff] = useState(tariffsTelList[0])
  const [tariffs, setTariffs] = useState(getTariff(data, 1))

  const [snapshotTariffs, setSnapshotTariffs] = useState(tariffs)
  const [searchText, setSearchText] = useState('')

  const handleSearch = (text) => {
    const filteredTariffs = snapshotTariffs.filter((it) =>
      isFindInText(text, [it.name])
    )
    setSearchText(text)
    setTariffs(filteredTariffs)
  }

  const handleSelectTariff = (tar) => {
    setTariff(tar)
    setSearchText('')

    const tariff = getTariff(data, tar.tid)
    setTariffs(tariff)
    setSnapshotTariffs(tariff)
  }

  const handleSelectItem = (item) => {
    console.log(`selected: `, item)
  }

  return (
    <Page className={classes.root} title='Tariffs'>
      <Container maxWidth={false}>
        <Toolbar
          className={classes.toolbar}
          onSearch={handleSearch}
          onSelect={handleSelectTariff}
          tariff={tariff}
          searchText={searchText}
        />
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

export default Tariffs
