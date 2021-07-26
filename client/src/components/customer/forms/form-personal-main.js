import React, { useState, useContext } from 'react'
import Box from '@material-ui/core/Box'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormPersonal from './form-personal'
import { FORM_CUSTOMER_MAIN_TYPE } from 'src/types/types'
import { parameters } from 'src/common/helper-form'
import { tariffsInetList, TariffTel } from 'src/store/tariffs'
import { updateCustomer, addCustomer } from 'src/store/api-action'
import { MainContext } from 'src/context/main-context'
import {
  initialValues,
  schema,
} from 'src/components/customer/forms/form-customer-init'

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
  tariffsTelList,
  tarTel = tariffsTelList[TariffTel.FIZ],
}) => {
  const main = useContext(MainContext)
  const classes = useStyles()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(
    isNewCustomer ? { ...initialValues, custType, tarTel } : customer
  )
  const [formErrors, setFormErrors] = useState({})

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

  const handleSave = (data) => async (e) => {
    e.preventDefault()
    try {
      if (isNewCustomer) {
        const response = await addCustomer(data)
        main.addCustomer(data, response.custId)
      } else {
        await updateCustomer(data)
        main.updateCustomer(data)
      }
      navigate('/app/customers')
    } catch (e) {
      console.log('err:', e)
    }
  }

  const handleCancel = () => {
    navigate('/app/customers')
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
        handleSave={handleSave(formValues)}
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
