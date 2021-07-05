import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table'
import Switch from '@material-ui/core/Switch'
import Checkbox from '@material-ui/core/Checkbox'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import TablePaginationActions from 'src/common/table-pagination-actions'
import { ITEMS_LIST_TYPE } from 'src/types/types'

const heightTopBottom = 260

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  switchDense: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  container: {
    height: `calc(100vh - ${heightTopBottom}px)`,
  },
}))

/**
 * Выводит простую таблицу с данными в объекте items и настройкой отображения в params 
 * @param {className}     класс, если нужен
 * @param {items}         объект с данными
 * @param {params}        объект - что отображаем из items
 * @param {onSelect}      реагирует на выбор строки
 * @param {heightUsed}    уже занятая высота на экране (tollbar и пр.)
 * @param {isCheckbox}    (false) если true - добавляет колонку слева с checkbox
 * @param {isPagination}  (true)  если true - добавляет pagination
 * @param {isSwitchDense} (true)  если true - добавляет переключатель компактности строк
 * @returns JSX-код для табличного отображения данных items
 * params : {
    headers: список - заголовки колонок таблицы,
    fields: список - поля из items для отображения в колонках,
    searchs: список - поля из items для поиска (это нужно для toolbar),
    key: строка - уникальный ключ из fields
 * 
 * }
 */
const ItemsList = ({
  className,
  items,
  params,
  onSelect,
  heightUsed = 0,
  isCheckbox = false,
  isPagination = true,
  isSwitchDense = true,
  ...rest
}) => {
  const classes = useStyles()
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = useState(0)
  const [selectedRow, setSelectedRow] = useState(null)
  const [dense, setDense] = useState(true)

  useEffect(() => {
    setPage(0)
  }, [items])

  const handleLimitChange = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleClick = (event, item) => {
    const selected = item === selectedRow ? null : item[params.key]
    setSelectedRow(selected)
    onSelect(item)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (item) => selectedRow === item

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <TableContainer
        className={classes.container}
        style={{ height: `calc(100vh - ${heightUsed}px)` }}
      >
        <Table stickyHeader size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {isCheckbox ? <TableCell>{''}</TableCell> : null}
              {params.headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(rowsPerPage * page, rowsPerPage * (page + 1))
              .map((item) => {
                const isItemSelected = isSelected(item[params.key])
                return (
                  <TableRow
                    hover
                    key={item[params.key]}
                    tabIndex={-1}
                    onClick={(event) => handleClick(event, item)}
                    selected={isItemSelected}
                    style={
                      isItemSelected ? { backgroundColor: 'bisque' } : null
                    }
                  >
                    {isCheckbox ? (
                      <TableCell padding='checkbox'>
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                    ) : null}

                    {params.fields.map((field, index) => (
                      <TableCell key={index}>{item[field]}</TableCell>
                    ))}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {isPagination ? (
        <TablePagination
          component='div'
          count={items.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          ActionsComponent={TablePaginationActions}
        />
      ) : null}
      {isSwitchDense ? (
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          className={classes.switchDense}
          label='Компактно'
        />
      ) : null}
    </Card>
  )
}

ItemsList.propTypes = ITEMS_LIST_TYPE
export default ItemsList
