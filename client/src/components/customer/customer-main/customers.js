import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Page from 'src/components/page/page'
import ItemsList from 'src/common/items-list'
import ToolbarSearch from 'src/common/x-toolbar'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import { getFiltred } from 'src/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
  },
}))

const fields = ['custAlias', 'custName', 'custType', 'bankInn', 'contactTel']
const customerParams = {
  headers: ['Кратко', 'Полное название', 'Тип', 'ИНН', 'Телефон'], // заголовки колонок
  fields: fields, // поля
  searchs: fields, // поля для поиска
  key: 'custAlias', // уникальный ключ
}

const toolbarParams = (selectedRow = null, editId = 'custId') => {
  return {
    buttons: [
      {
        id: 1,
        icon: <PersonAddOutlinedIcon fontSize={'default'} />,
        to: 'add',
        ariaLabel: 'add customer',
        text: 'Добавить клиента',
        tooltip: 'добавить',
        tooltipDisabled: '',
        disabled: false,
      },
      {
        id: 2,
        icon: <EditOutlinedIcon fontSize={'default'} />,
        to: selectedRow === null ? `#` : `edit/${selectedRow[editId]}`,
        ariaLabel: 'edit customer',
        text: 'Редакт. клиента',
        tooltip: 'редактировать',
        tooltipDisabled: 'выберете клиента для редактирования',
        disabled: selectedRow === null ? true : false,
      },
    ],
  }
}

const Customers = ({ data, params = customerParams }) => {
  const classes = useStyles()
  const [customers, setCustomers] = useState(data)
  const [selectedCust, setSelectedCust] = useState(null)

  const handleSearch = (text) => {
    setCustomers(getFiltred({ data, text, fields: params.searchs }))
  }

  const handleSelectItem = (item) => {
    console.log(`selected: `, item)
    setSelectedCust({ custId: item.custId, custName: item.custName })
  }

  return (
    <Page className={classes.root} title='Customers'>
      <Container maxWidth={false}>
        <ToolbarSearch
          title={'Клиенты'}
          placeholder={'Поиск по названию, типу (u,f), ИНН ...'}
          params={toolbarParams(selectedCust)}
          onSearch={handleSearch}
        />
        <Box mt={1}>
          <ItemsList
            items={customers}
            params={params}
            onSelect={handleSelectItem}
            isCheckbox={false}
            heightUsed={300}
          />
        </Box>
      </Container>
    </Page>
  )
}

export default Customers
