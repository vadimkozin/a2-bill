import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import MuiPhoneNumber from 'material-ui-phone-number'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MySelect from 'src/common/select'
import ButtonMore from 'src/common/button-more'
import { obtainError } from 'src/common/helper-form'
import { FORM_CUSTOMER_BASIC_TYPE } from 'src/types/types'

const FormCustomerBasic = ({
  handleNext,
  handleChange,
  tariffsTelList,
  tariffsInetList,
  isNewCustomer,
  values: {
    custAlias,
    custName,
    custType,
    addressU,
    addressP,
    contactTel,
    contactEmail,
    isTel,
    isInet,
    isAct,
    tarTel,
    tarInet,
  },
  params,
  formErrors,
}) => {
  const isValid =
    !formErrors.custAlias &&
    custAlias &&
    !formErrors.custName &&
    custName &&
    !formErrors.addressU &&
    !formErrors.addressP &&
    !formErrors.contactTel &&
    !formErrors.contactEmail &&
    custType

  const canBeError = (field) => obtainError(field, formErrors)

  const handleOnChangePhone = (name) => (phone) => {
    const event = {}
    event.target = { name, value: phone.replace(/\D/g, ''), type: 'phone' }
    handleChange(event)
  }

  return (
    <Fragment>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Краткое название'
            name='custAlias'
            placeholder='Краткое название клиента'
            value={custAlias || ''}
            onChange={handleChange}
            required
            {...params}
            {...canBeError('custAlias')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id='select-type-customer-label'>Тип клиента</InputLabel>
            <Select
              labelId='select-type-customer-label'
              id='select-type-customer'
              name={'custType'}
              value={custType}
              onChange={handleChange}
              {...params}
              margin='dense'
              disabled={isNewCustomer}
            >
              <MenuItem value={'u'}>Юр-лицо</MenuItem>
              <MenuItem value={'f'}>Физ-лицо</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Полное название'
            name='custName'
            placeholder='Полное название клиента'
            value={custName || ''}
            onChange={handleChange}
            required
            {...params}
            {...canBeError('custName')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Юридический адрес'
            name='addressU'
            placeholder='Юридический адрес'
            value={addressU || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('addressU')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Почтовый адрес'
            name='addressP'
            placeholder='Почтовый адрес'
            value={addressP || ''}
            onChange={handleChange}
            {...params}
            {...canBeError('addressP')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPhoneNumber
            {...params}
            fullWidth
            defaultCountry={'ru'}
            value={contactTel}
            onChange={handleOnChangePhone('contactTel')}
            label='Телефон'
            disableDropdown={true}
            countryCodeEditable={false}
            {...canBeError('contactTel')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...params}
            fullWidth
            label='Email'
            name='contactEmail'
            placeholder='контактный email'
            type='email'
            value={contactEmail || ''}
            onChange={handleChange}
            {...canBeError('contactEmail')}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isTel}
                onChange={handleChange}
                name='isTel'
                color='primary'
              />
            }
            label='Телефония'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isInet}
                onChange={handleChange}
                name='isInet'
                color='primary'
              />
            }
            label='Интернет'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAct}
                onChange={handleChange}
                name='isAct'
                color='primary'
              />
            }
            label='Активен'
          />
        </Grid>

        <Divider style={{ width: '100%', margin: '16px 0' }} />

        {/* <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Тип клиента</FormLabel>
            <RadioGroup  aria-label="gender" name="typeCust" value={typeCust} onChange={handleChange}>
              <FormControlLabel value="u" control={<Radio />} label="Юр-лицо" />
              <FormControlLabel value="f" control={<Radio />} label="Физ-лицо" />
            </RadioGroup>
          </FormControl>
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <MySelect
            name='tarTel'
            options={tariffsTelList}
            option_label='label'
            option_value='tid'
            value={tarTel}
            label={'тариф телефонии'}
            placeholder='Введите тариф телефонии'
            required={false}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MySelect
            disabled
            name='tarInet'
            options={tariffsInetList}
            option_label='label'
            option_value='tid'
            value={tarInet}
            label={'тариф интернет'}
            placeholder='Введите тариф интернет'
            required={false}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
      <ButtonMore
        text='Далее >'
        disabled={!isValid}
        onClick={isValid ? handleNext : null}
      ></ButtonMore>
    </Fragment>
  )
}

FormCustomerBasic.propTypes = FORM_CUSTOMER_BASIC_TYPE
export default FormCustomerBasic
