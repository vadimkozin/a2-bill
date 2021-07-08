import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined'
import Page from 'src/components/page/page'
import ItemsList from 'src/common/items-list'
import ToolbarSearch from 'src/common/x-toolbar'
import { getFiltred } from 'src/utils'
import { NUMBERS_TYPE } from 'src/types/types'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: 0,
  },
}))

const fields = ['number', 'xnumber', 'custId', 'custName', `dateOn`]
const numberParams = {
  headers: ['номер', 'п.номер', 'код', 'клиент', 'дата'], // заголовки колонок
  fields: fields, // поля
  searchs: fields, // поля для поиска
  key: 'number', // уникальный ключ
}

const toolbarParams = (selectedRow = null, editId = 'number') => {
  return {
    buttons: [
      {
        id: 1,
        icon: <SwapHorizOutlinedIcon fontSize={'default'} />,
        to: selectedRow === null ? `#` : `transfer/${selectedRow[editId]}`,
        ariaLabel: 'number transfer between clients',
        text: 'Смена арендатора',
        tooltip: 'смена арендатора номера',
        tooltipDisabled: 'выберете номер для редактирования',
        disabled: selectedRow === null ? true : false,
      },
    ],
  }
}

const Numbers = ({ data, params = numberParams }) => {
  const classes = useStyles()
  const [numbers, setNumbers] = useState(data)
  const [selectedNumber, setSelectedNumber] = useState(null)

  const handleSearch = (text) => {
    setNumbers(getFiltred({ data, text, fields: params.searchs }))
  }

  const handleSelect = (item) => {
    console.log(`selected: `, item)
    setSelectedNumber(item)
  }

  return (
    <Page className={classes.root} title='Numbers'>
      <Container maxWidth={false}>
        <ToolbarSearch
          title={'Номера'}
          placeholder={'Поиск по номеру, коду, клиенту ...'}
          params={toolbarParams(selectedNumber)}
          onSearch={handleSearch}
        />
        <Box mt={1}>
          <ItemsList
            items={numbers}
            params={params}
            onSelect={handleSelect}
            heightUsed={210}
          />
        </Box>
      </Container>
    </Page>
  )
}

Numbers.propTypes = NUMBERS_TYPE
export default Numbers
