import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiPhoneNumber from 'material-ui-phone-number'
import MySelect from 'src/common/select'
import DatePicker from 'src/common/date-picker'
import ButtonsCancelSave from 'src/common/buttons-cancel-save'
import { obtainError } from 'src/common/helper-form'
import { FORM_PERSONAL_TYPE } from 'src/types/types'

const DividerFull = () => (
  <Divider style={{ width: '100%', margin: '16px 0' }} />
)

const Header = ({ title }) => {
  return (
    <Typography
      variant='h5'
      component='h2'
      align='center'
      color='primary'
      style={{ margin: '24px 0 0', width: '100%' }}
    >
      {title}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
  },
}))

const FormPersonal = ({
  handleChange,
  handleSave,
  handleCancel,
  tariffsTelList,
  tariffsInetList,
  parameters: params,
  formErrors,
  isNewCustomer,
  values: {
    custAlias,
    custName,
    custType,
    fzFioNotice,
    addressP,
    contactTel,
    contactEmail,
    fzContractDocument,
    fzBirthday,
    tarTel,
    tarInet,
    fzContractNum,
    fzContractDate,
    numDogTelMts,
    dateDogTelMts,
    numDogInet,
    dateDogInet,
    isTel,
    isInet,
    isAct,
  },
}) => {
  const isValid =
    !formErrors.custAlias &&
    custAlias &&
    !formErrors.custName &&
    custName &&
    !formErrors.addressP &&
    !formErrors.contactTel &&
    !formErrors.contactEmail &&
    !formErrors.fzFioNotice &&
    !formErrors.fzContractDocument &&
    !formErrors.fzBirthday &&
    !formErrors.tarTel &&
    !formErrors.tarInet &&
    !formErrors.fzContractNum &&
    !formErrors.fzContractDate &&
    !formErrors.numDogTelMts &&
    !formErrors.dateDogTelMts &&
    !formErrors.numDogInet &&
    !formErrors.dateDogInet &&
    custType

  const classes = useStyles()
  const canBeError = (field) => obtainError(field, formErrors)

  const handleOnChangePhone = (name) => (phone) => {
    const event = {}
    event.target = { name, value: phone.replace(/\D/g, ''), type: 'phone' }
    handleChange(event)
  }

  return (
    <Paper className={classes.paper} elevation={10}>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='?????????????? ????????????????'
            name='custAlias'
            placeholder='?????????????? ???????????????? ??????????????'
            value={custAlias || ''}
            onChange={handleChange}
            required
            {...params}
            {...canBeError('custAlias')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id='select-type-customer-label'>?????? ??????????????</InputLabel>
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
              <MenuItem value={'u'}>????-????????</MenuItem>
              <MenuItem value={'f'}>??????-????????</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='?????? ?? ????????????????????'
            name='fzFioNotice'
            placeholder='???????????????? ?????????????? ?? ??????????????????'
            value={fzFioNotice || ''}
            onChange={handleChange}
            required
            {...params}
            {...canBeError('fzFioNotice')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='??????'
            name='custName'
            placeholder='?????????????? ?????? ????????????????'
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
            label='???????????????? ??????????'
            name='addressP'
            placeholder='???????????????? ??????????'
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
            label='??????????????'
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
            placeholder='???????????????????? email'
            type='email'
            value={contactEmail || ''}
            onChange={handleChange}
            {...canBeError('contactEmail')}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...params}
            fullWidth
            label='??????????????'
            name='fzContractDocument'
            placeholder='?????????? ????????????????'
            type='text'
            value={fzContractDocument || ''}
            onChange={handleChange}
            {...canBeError('fzContractDocument')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='fzBirthday'
            value={fzBirthday}
            label='???????? ????????????????'
            handleChange={handleChange}
            {...params}
            {...canBeError('fzBirthday')}
          />
        </Grid>

        <Header title={'????????????'} />
        <Grid item xs={12}></Grid>
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
            label='??????????????????'
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
            label='????????????????'
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
            label='??????????????'
          />
        </Grid>

        <DividerFull />
        <Header title={'??????????????????'} />

        <Grid item xs={12} sm={6}>
          <TextField
            {...params}
            fullWidth
            label='??????????????'
            name='fzContractNum'
            placeholder='?????????? ????????????????'
            type='text'
            value={fzContractNum || ''}
            onChange={handleChange}
            {...canBeError('fzContractNum')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='fzContractDate'
            value={fzContractDate}
            label='???????? ????????????????'
            handleChange={handleChange}
            {...params}
            {...canBeError('fzContractDate')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...params}
            fullWidth
            label='?????????????? c ??????'
            name='numDogTelMts'
            placeholder='?????????? ???????????????? A2/MTC/????????????'
            type='text'
            value={numDogTelMts || ''}
            onChange={handleChange}
            {...canBeError('numDogTelMts')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='dateDogTelMts'
            value={dateDogTelMts}
            label='???????? ???????????????? ?? ??????'
            handleChange={handleChange}
            {...params}
            {...canBeError('dateDogTelMts')}
          />
        </Grid>
        <Grid item xs={12}>
          <MySelect
            name='tarTel'
            options={tariffsTelList}
            option_label='label'
            option_value='tid'
            value={tarTel}
            label={'?????????? ??????????????????'}
            placeholder='?????????????? ?????????? ??????????????????'
            required={false}
            handleChange={handleChange}
          />
        </Grid>

        <Header title={'????????????????'} />

        <Grid item xs={12} sm={6}>
          <TextField
            {...params}
            fullWidth
            label='?????????????? ????????????????'
            name='numDogInet'
            placeholder='?????????????? ???? ????????????????'
            type='text'
            value={numDogInet || ''}
            onChange={handleChange}
            {...canBeError('numDogInet')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            fullWidth
            name='dateDogInet'
            value={dateDogInet}
            label='???????? ???????????????? ???? ????????????????'
            handleChange={handleChange}
            {...params}
            {...canBeError('dateDogInet')}
          />
        </Grid>
        <Grid item xs={12}>
          <MySelect
            disabled
            name='tarInet'
            options={tariffsInetList}
            option_label='label'
            option_value='tid'
            value={tarInet}
            label={'?????????? ????????????????'}
            placeholder='?????????????? ?????????? ????????????????'
            required={false}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>

      <ButtonsCancelSave
        textCancel='????????????????'
        textSave='??????????????????'
        handleCancel={handleCancel}
        handleSave={handleSave}
        disabledSave={!isValid}
      ></ButtonsCancelSave>
    </Paper>
  )
}

FormPersonal.propTypes = FORM_PERSONAL_TYPE
export default FormPersonal
