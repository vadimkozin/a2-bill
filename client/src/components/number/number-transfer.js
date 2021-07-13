import * as yup from 'yup'
import React, { useState, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MySelect from 'src/common/select'
import DatePicker from 'src/common/date-picker'
import ButtonsCancelSave from 'src/common/buttons-cancel-save'
import { hints, obtainError, parameters } from 'src/common/helper-form'
import { ContextApp, ctx } from 'src/common/context-app'

import { transferNumber } from 'src/store/api-action'

const initialValues = {
  customer: null, // клиент, арендующий номер с даты: dateOn
  dateOn: null, // дата начала аренды номера
  comment: '', // коментарий (причина переоформления номера)
}

const schema = yup.object().shape({
  customer: yup.object,
  dateOn: yup.date(),
  comment: yup.string().min(5, hints.min).max(150, hints.max).required(),
})

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(3),
  },
  table: {
    width: '100%',
  },
  field: {
    paddingTop: 25,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  number: {
    fontSize: '110%',
  },
}))

const NumberTransfer = () => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)
  const classes = useStyles()
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})

  const { number } = useParams()
  const info = ctx.getNumberInfo(contextApp, number)

  const isValid =
    formValues.customer &&
    formValues.dateOn &&
    !formErrors.comment &&
    formValues.comment

  const canBeError = (field) => obtainError(field, formErrors)

  const handleChange = async (e) => {
    const { name, value } = e.target

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    try {
      await yup.reach(schema, name).validate(value)
      setFormErrors({ ...formErrors, [name]: '' })
    } catch (error) {
      setFormErrors({ ...formErrors, [name]: error.message })
    }
  }

  const selectCustomer = () => {
    return (
      <MySelect
        name='customer'
        options={ctx.getCustomersList(contextApp)}
        option_label='custAlias'
        option_value='custId'
        value={formValues.customer}
        label={'клиент'}
        placeholder='Выберете нового клиента'
        required={true}
        handleChange={handleChange}
      />
    )
  }

  const getDate = () => {
    return (
      <DatePicker
        fullWidth
        name='dateOn'
        value={formValues.dateOn}
        label='дата'
        handleChange={handleChange}
        required={true}
        {...parameters}
        {...canBeError('dateOn')}
      />
    )
  }

  const getComment = () => {
    return (
      <TextField
        fullWidth
        label='коментарий'
        name='comment'
        placeholder='Введите коментарий'
        value={formValues.comment || ''}
        onChange={handleChange}
        required={true}
        {...parameters}
        {...canBeError('comment')}
      />
    )
  }

  const handleCancel = (e) => {
    navigate('..')
  }

  const handleSave = async (e) => {
    // console.log(`data:`, formValues)
    const {
      comment,
      customer: { custId },
      dateOn,
    } = formValues

    console.log(
      `number: ${number}, comment:${comment}, custId:${custId}, dateOn:${dateOn}`
    )
    // Save({number, custId, comment, dateOn})
    const response = await transferNumber({number, custId, comment, dateOn})
    console.log(`response:`, response)
  }

  const getButtons = () => {
    return (
      <ButtonsCancelSave
        textCancel='Отменить'
        textSave='Сохранить'
        handleCancel={handleCancel}
        handleSave={handleSave}
        disabledSave={!isValid}
      />
    )
  }

  return (
    <Container maxWidth='sm'>
      <Paper elevation={5} className={classes.paper}>
        <Typography
          variant='h4'
          align='center'
          color='primary'
          className={classes.title}
          noWrap
        >
          Переоформление номера <span className={classes.number}>{number}</span>
        </Typography>
        <table className={classes.table}>
          <tbody>
            <tr>
              <td>сейчас</td>
              <td>
                {info.custName}({info.custId}) с {info.dateOn}
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                &nbsp;
                <hr />
              </td>
            </tr>
            <tr>
              <td className={classes.field}>оформляем на</td>
              <td>{selectCustomer()}</td>
            </tr>
            <tr>
              <td className={classes.field}>начиная с</td>
              <td>{getDate()}</td>
            </tr>
            <tr>
              <td className={classes.field}>причина</td>
              <td>{getComment()}</td>
            </tr>
            <tr>
              <td colSpan={2}>{getButtons()}</td>
            </tr>
          </tbody>
        </table>
      </Paper>
    </Container>
  )
}

export default NumberTransfer
