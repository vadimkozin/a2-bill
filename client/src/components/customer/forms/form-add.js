import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormCustomerMain from './form-customer-main'
import FormPersonalMain from './form-personal-main'

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '550px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(4),
  },
  item: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

const FormAdd = () => {
  const classes = useStyles()
  const [typeCust, setTypeCust] = useState(null)
  const [next, setNext] = useState(false)

  const handleChange = (event) => setTypeCust(event.target.value)

  const handleNext = () => setNext(true)

  const go = (typeCust) => {
    switch (typeCust) {
      case 'u':
        return <FormCustomerMain isNewCustomer={true} />
      case 'f':
        return <FormPersonalMain isNewCustomer={true} />
      default:
        break
    }
  }

  return (
    <>
      {typeCust && next ? (
        go(typeCust)
      ) : (
        <Paper className={classes.paper} elevation={10}>
          <Typography
            variant='h4'
            component='h1'
            align='center'
            color='primary'
            className={classes.title}
          >
            Новый клиент
          </Typography>
          <Grid item xs={6} className={classes.item}>
            <FormControl component='fieldset' required>
              <FormLabel component='legend' className={classes.label}>
                Тип клиента
              </FormLabel>
              <RadioGroup
                aria-label='type customer'
                name='typeCust'
                value={typeCust}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='u'
                  control={<Radio />}
                  label='Юридическое лицо'
                />
                <FormControlLabel
                  value='f'
                  control={<Radio />}
                  label='Физическое лицо'
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Button
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            className={classes.button}
            disabled={!typeCust}
            onClick={typeCust ? handleNext : null}
          >
            {` Далее > `}
          </Button>
        </Paper>
      )}
    </>
  )
}

export default FormAdd
