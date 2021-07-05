import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ButtonsNextPrev from 'src/common/buttons-next-prev'
import { obtainError } from 'src/common/helper-form'
import { FORM_CUSTOMER_BANK_TYPE } from 'src/types/types'

const FormCustomerBank = ({
  handleNext,
  handleBack,
  handleChange,
  values: {
    bankName,
    bankAccount,
    bankKAccount,
    bankBik,
    bankInn,
    bankKpp,
    bankOkpo,
  },
  params,
  formErrors,
}) => {
  const isValid =
    !formErrors.bankName &&
    !formErrors.bankAccount &&
    !formErrors.bankKAccount &&
    !formErrors.bankBik &&
    !formErrors.bankInn &&
    !formErrors.bankKpp &&
    !formErrors.bankOkpo

  const canBeError = (field) => obtainError(field, formErrors)

  return (
    <Fragment>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Название банка'
            name='bankName'
            placeholder='Номер дог.тел.абон-плата'
            value={bankName || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('bankName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Номер счёта'
            name='bankAccount'
            placeholder='Номер счёта в банке'
            value={bankAccount || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('bankAccount')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Номер кор-счёта'
            name='bankKAccount'
            placeholder='Номер кор-счёта в банке'
            value={bankKAccount || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('bankKAccount')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='БИК'
            name='bankBik'
            placeholder='Банковский идентификатор (БИК)'
            value={bankBik || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('bankBik')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='ИНН'
            name='bankInn'
            placeholder='Индив. номер налогоплат.'
            value={bankInn || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('bankInn')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='КПП'
            name='bankKpp'
            placeholder='КПП'
            value={bankKpp || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('bankKpp')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='ОКПО'
            name='bankOkpo'
            placeholder='ОКПО'
            value={bankOkpo || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('bankOkpo')}
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
//˃

FormCustomerBank.propTypes = FORM_CUSTOMER_BANK_TYPE
export default FormCustomerBank
