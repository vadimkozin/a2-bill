import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { makeStyles } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import { isDate, formatDate, isObject } from 'src/utils'
import { customerAdapter } from 'src/store/adapters'
import ButtonsCancelSavePrev from 'src/common/button-cancel-save-prev'

const useStyles = makeStyles({
  table: {
    // minWidth: 450,
    width: '100%',
  },
})

const Confirm = ({ handleNext, handleBack, values, schema }) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log(values)
    handleNext()
  }

  const handleCancel = () => {
    navigate('/app/cust')
  }

  const print = (key, value) => {
    if (isDate(value)) {
      return formatDate(value)
    }

    if (isObject(value)) {
      const id = schema.fields[key].id
      return id ? `${id}=${value[id]}` : null
    }

    return String(value)
  }

  console.log(`confirm.values:`, values)
  console.log(`adaptToServer:`, customerAdapter.adaptToServerCustomer(values))

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Field</TableCell>
              <TableCell align='right'>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(values).map(([k, v]) => (
              <TableRow key={k}>
                <TableCell component='th' scope='row'>
                  {k}
                </TableCell>
                <TableCell align='right'>{print(k, v)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonsCancelSavePrev
        textCancel='Отменить'
        textSave='Сохранить'
        textPrev='< Назад'
        handleCancel={handleCancel}
        handleSave={handleSubmit}
        handlePrev={handleBack}
        disabledSave={false}
      ></ButtonsCancelSavePrev>
    </Fragment>
  )
}

export default Confirm
