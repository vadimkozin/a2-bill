import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'
import FormPersonal from './form-personal'
import { tariffsTelList, tariffsInetList, TariffTel } from 'src/store/tariffs'
import { hints, parameters } from 'src/common/helper-form'
import { FORM_CUSTOMER_MAIN_TYPE } from 'src/types/types'
import { useNavigate } from 'react-router-dom'

const initialValues = {
  // basic
  custAlias: '', // краткое название клиента
  custName: '', // полное название клиента
  custType: '', // тип клиента: u | f
  fzFioNotice: '', // название клиента в извещениях
  addressP: '', // адрес почтовый
  contactTel: '', // контактный телефон
  contactEmail: '', // контактный email
  fzContractDocument: '', // номер паспорта
  fzBirthday: null, // дата рождения
  tarTel: null, // тариф по телефонии: {}
  tarInet: null, // тариф по интернет: {}
  // dogovors
  fzContractNum: '', // номер договора
  fzContractDate: null, // дата договора
  numDogTelMts: '', // номер договора по телефонии с МТС
  dateDogTelMts: null, // дата договора по телефонии с МТС
  numDogInet: '', // номер договора по интернет
  dateDogInet: null, // дата договора по интернет
  // flags
  isTel: false, // услуга телефонии: true | false
  isInet: false, // услуга интернет: true | false
  isAct: true, // уктивность клиента: true | false
  // ...
  isA2: true, // клиент A2
  isMoscow: true, // клиент в Москве
}

const schema = yup.object().shape({
  // basic
  custAlias: yup.string().min(2, hints.min).max(24, hints.max).required(),
  custName: yup.string().min(2, hints.min).max(250, hints.max).required(),
  custType: yup.string().required().nullable(),
  fzFioNotice: yup.string().min(2, hints.min).max(50, hints.max).required(),
  addressP: yup.string().min(2, hints.min).max(250, hints.max),
  contactTel: yup.string().min(11, hints.minDigits),
  contactEmail: yup.string().email(hints.email),
  fzContractDocument: yup
    .string()
    .min(2, hints.min)
    .max(50, hints.max)
    .required(),
  fzBirthday: yup.date(),
  tarTel: yup.object(),
  tarInet: yup.object(),
  // dogovors
  fzContractNum: yup.string().min(2, hints.min).max(16, hints.max).required(),
  fzContractDate: yup.date(),
  numDogTelMts: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogTelMts: yup.date(),
  numDogInet: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogInet: yup.date(),
  // flags
  isTel: yup.bool(),
  isInet: yup.bool(),
  isAct: yup.bool(),
})

schema.fields.tarTel.id = 'tid'
schema.fields.tarInet.id = 'tid'

const useStyles = makeStyles((theme) => ({
  title: {
    margin: '0px 0 10px',
  },
  subtitle: {
    margin: '10px 0 20px',
  },
}))

const FormPersonalMain = ({
  isNewCustomer = true,
  custType = 'f',
  customer = null,
}) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(
    isNewCustomer ? initialValues : customer
  )
  const [formErrors, setFormErrors] = useState({})
  const tarTel = isNewCustomer
    ? tariffsTelList[TariffTel.FIZ]
    : formValues.tarTel

  // изменения в полях формы
  const handleChange = async (e) => {
    const { name, value, type } = e.target

    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }))

    try {
      await yup.reach(schema, name).validate(value)
      setFormErrors({ ...formErrors, [name]: '' })
    } catch (error) {
      setFormErrors({ ...formErrors, [name]: error.message })
    }
  }

  const handleSave = () => {
    console.log('Save ..')
    console.log(formValues)
  }

  const handleCancel = () => {
    navigate('/app/cust')
  }

  return (
    <>
      <Box className={classes.title}>
        <Typography variant='h4' align='center' color='primary'>
          {isNewCustomer
            ? 'Новый частный клиент'
            : `${formValues.custAlias}(${formValues.custId})`}
        </Typography>
        <Typography
          variant='subtitle2'
          align='center'
          className={classes.subtitle}
        >
          поля со звёздочкой (*) обязательны
        </Typography>
      </Box>
      <FormPersonal
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        tariffsTelList={tariffsTelList}
        tariffsInetList={tariffsInetList}
        isNewCustomer={isNewCustomer}
        values={{ ...formValues, custType, tarTel }}
        parameters={parameters}
        formErrors={formErrors}
      />
    </>
  )
}

FormPersonalMain.propTypes = FORM_CUSTOMER_MAIN_TYPE
export default FormPersonalMain
