import React, { useState, useContext } from 'react'
import Box from '@material-ui/core/Box'
import Step from '@material-ui/core/Step'
import Paper from '@material-ui/core/Paper'
import { useNavigate } from 'react-router-dom'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'
import FormCustomerBasic from './form-customer-basic'
import FormCustomerBank from './form-customer-bank'
import FormCustomerDogovor from './form-customer-dogovor'
import Confirm from 'src/common/confirm'
import Success from 'src/common/success'
import { tariffsTelList, tariffsInetList, TariffTel } from 'src/store/tariffs'
import { hints, parameters } from 'src/common/helper-form'
import { FORM_CUSTOMER_MAIN_TYPE } from 'src/types/types'
import { updateCustomer, addCustomer } from 'src/store/api-action'
import { MainContext } from 'src/context/main-context'

// step headers
const labels = ['Основное', 'Договора', 'Банк', 'Подтв']

const initialValues = {
  // basic
  custAlias: '', // краткое название клиента
  custName: '', // полное название клиента
  custType: '', // тип клиента: u | f
  addressU: '', // адрес юридический
  addressP: '', // адрес почтовый
  contactTel: '', // контактный телефон
  contactEmail: '', // контактный email
  isMoscow: true,
  isA2: true, // клиент A2
  isTel: false, // услуга телефонии: true | false
  isInet: false, // услуга интернет: true | false
  isAct: true, // уктивность клиента: true | false
  tarTel: null, // тариф по телефонии: {}
  tarInet: null, // тариф по интернет: {}
  // bank
  bankName: '',
  bankAccount: '',
  bankKAccount: '',
  bankBik: '',
  bankInn: '',
  bankKpp: '',
  bankOkpo: '',
  // dogovors
  numDogTelAbon: '', // номер договора по телефонии на абон-плату
  dateDogTelAbon: null, // дата договора по телефонии на абон-плату
  numDogTelMts: '', // номер договора по телефонии с МТС
  dateDogTelMts: null, // дата договора по телефонии с МТС
  datePrilDogTel: null, // дата приложения №2 к договору по телефонии на 626-е , new Date()
  datePrilDogTel642: null, // дата приложения №2 к договору по телефонии на 642-е
  numDogInet: '', // номер договора по интернет
  dateDogInet: null, // дата договора по интерннет
}

const schema = yup.object().shape({
  // basic
  custAlias: yup.string().min(2, hints.min).max(24, hints.max).required(),
  custName: yup.string().min(2, hints.min).max(250, hints.max).required(),
  custType: yup.string().required().nullable(),
  addressU: yup.string().min(2, hints.min).max(250, hints.max),
  addressP: yup.string().min(2, hints.min).max(250, hints.max),
  contactTel: yup.string().min(11, hints.minDigits),
  contactEmail: yup.string().email(hints.email),
  isTel: yup.bool(),
  isInet: yup.bool(),
  isAct: yup.bool(),
  tarTel: yup.object(),
  tarInet: yup.object(),
  // dogovors
  numDogTelAbon: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogTelAbon: yup.date(),
  numDogTelMts: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogTelMts: yup.date(),
  datePrilDogTel: yup.date(),
  datePrilDogTel642: yup.date(),
  numDogInet: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogInet: yup.date(),
  // bank
  bankName: yup.string().min(2, hints.min).max(100, hints.max).required(),
  bankAccount: yup.string().matches(/^\d{20}$/, {
    excludeEmptyString: true,
    message: hints.bankAccount,
  }),
  bankKAccount: yup.string().matches(/^\d{20}$/, {
    excludeEmptyString: true,
    message: hints.bankAccount,
  }),
  bankBik: yup
    .string()
    .matches(/^\d{9}$/, { excludeEmptyString: true, message: hints.bankBik }),
  bankInn: yup.string().matches(/^\d{10}(\d\d)?$/, {
    excludeEmptyString: true,
    message: hints.bankInn,
  }),
  bankKpp: yup
    .string()
    .matches(/^\d{9}$/, { excludeEmptyString: true, message: hints.bankKpp }),
  bankOkpo: yup.string().matches(/^\d{8}(\d\d)?$/, {
    excludeEmptyString: true,
    message: hints.bankOkpo,
  }),
})

schema.fields.tarTel.id = 'tid'
schema.fields.tarInet.id = 'tid'

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
  },
  title: {
    margin: '0px 0 10px',
  },
  subtitle: {
    margin: '10px 0',
  },
  stepper: {
    margin: '10px 0 15px',
    padding: '16px 0 0',
  },
}))

const FormCustomerMain = ({
  isNewCustomer = true,
  custType = 'u',
  customer = null,
  tarTel = tariffsTelList[TariffTel.UR],
}) => {
  const main = useContext(MainContext)
  const navigate = useNavigate()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [formValues, setFormValues] = useState(
    isNewCustomer ? { ...initialValues, custType, tarTel } : customer
  )
  const [formErrors, setFormErrors] = useState({})

  // next step
  const handleNext = () => setActiveStep((prev) => prev + 1)
  // previous step
  const handleBack = () => setActiveStep((prev) => prev - 1)

  // changes in the form fields
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

  const handleSave = async (data) => {
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

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FormCustomerBasic
            handleNext={handleNext}
            handleChange={handleChange}
            tariffsTelList={tariffsTelList}
            tariffsInetList={tariffsInetList}
            isNewCustomer={isNewCustomer}
            values={{ ...formValues, custType, tarTel }}
            params={parameters}
            formErrors={formErrors}
          />
        )
      case 1:
        return (
          <FormCustomerDogovor
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            params={parameters}
            formErrors={formErrors}
          />
        )
      case 2:
        return (
          <FormCustomerBank
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            params={parameters}
            formErrors={formErrors}
          />
        )
      case 3:
        return (
          <Confirm
            handleCancel={handleCancel}
            handleBack={handleBack}
            handleSave={handleSave}
            values={formValues}
            schema={schema}
          />
        )
      case 4:
        return <Success values={formValues} />
      default:
        break
    }
  }

  return (
    <>
      {activeStep === labels.length ? (
        // последний компонент
        <Success values={formValues} />
      ) : (
        <>
          <Paper className={classes.paper} elevation={10}>
            <Box className={classes.title}>
              <Typography
                variant='h4'
                component='h1'
                align='center'
                color='primary'
              >
                {isNewCustomer
                  ? 'Новый клиент'
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
            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
              alternativeLabel
            >
              {labels.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {handleSteps(activeStep)}
          </Paper>
        </>
      )}
    </>
  )
}

FormCustomerMain.propTypes = FORM_CUSTOMER_MAIN_TYPE
export default FormCustomerMain
