import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import DatePicker from 'src/common/date-picker'
import ButtonsNextPrev from 'src/common/buttons-next-prev'
import { obtainError } from 'src/common/helper-form'
import { FORM_CUSTOMER_DOGOVOR_TYPE } from 'src/types/types'

const FormCustomerDogovor = ({
  handleNext,
  handleBack,
  handleChange,
  values: {
    numDogTelAbon,
    dateDogTelAbon,
    numDogTelMts,
    dateDogTelMts,
    datePrilDogTel,
    datePrilDogTel642,
    numDogInet,
    dateDogInet,
  },
  params,
  formErrors,
}) => {
  const isValid =
    !formErrors.numDogTelAbon &&
    !formErrors.dateDogTelAbon &&
    !formErrors.numDogTelMts &&
    !formErrors.dateDogTelMts &&
    !formErrors.datePrilDogTel &&
    !formErrors.datePrilDogTel642 &&
    !formErrors.numDogInet &&
    !formErrors.dateDogInet

  const canBeError = (field) => obtainError(field, formErrors)

  return (
    <Fragment>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='№ дог.тел.абон-плата'
            name='numDogTelAbon'
            placeholder='Номер дог.тел.абон-плата'
            value={numDogTelAbon || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('numDogTelAbon')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='dateDogTelAbon'
            value={dateDogTelAbon}
            label='дата дог.тел.абон-плата'
            handleChange={handleChange}
            {...params}
            {...canBeError('dateDogTelAbon')}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='№ дог.тел.МТС'
            name='numDogTelMts'
            placeholder='Номер дог.тел с МТС'
            value={numDogTelMts || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('numDogTelMts')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='dateDogTelMts'
            value={dateDogTelMts}
            label='дата дог.тел.МТС'
            handleChange={handleChange}
            {...params}
            {...canBeError('dateDogTelMts')}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='datePrilDogTel'
            value={datePrilDogTel}
            label='дата пр. №2 (626-е)'
            handleChange={handleChange}
            {...params}
            {...canBeError('datePrilDogTel')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='datePrilDogTel642'
            value={datePrilDogTel642}
            label='дата пр. №2 (642-е)'
            handleChange={handleChange}
            {...params}
            {...canBeError('datePrilDogTel642')}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='№ дог.интернет'
            name='numDogInet'
            placeholder='Номер дог. интернет'
            value={numDogInet || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('numDogInet')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='dateDogInet'
            value={dateDogInet}
            label='дата дог.интернет'
            handleChange={handleChange}
            {...params}
            {...canBeError('dateDogInet')}
          />
        </Grid>
      </Grid>
      <ButtonsNextPrev
        textNext='Далее >'
        textPrev='< Назад'
        disabledNext={!isValid}
        handleBack={handleBack}
        handleNext={isValid ? handleNext : null}
      />
    </Fragment>
  )
}

FormCustomerDogovor.propTypes = FORM_CUSTOMER_DOGOVOR_TYPE
export default FormCustomerDogovor
