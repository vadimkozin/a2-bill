import React, { useState, useContext, useEffect } from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { hints, obtainError, parameters } from 'src/common/helper-form'
import { ContextApp } from 'src/common/context-app'
import { LOGIN_TYPE } from 'src/types/types'

const initialValues = {
  login: null,
  password: null,
}

const schema = yup.object().shape({
  login: yup.string().min(5, hints.min).max(20, hints.max).required(),
  password: yup.string().min(8, hints.min).max(50, hints.max).required(),
})

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  error: {
    color: '#f44336',
  },
}))

const isEntryOk = ({ login, password }) => {
  return password === '12345678' ? true : false
}

const Login = ({ action = 'login' }) => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)
  const classes = useStyles()
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isLoginOk, setIsLoginOk] = useState(null)

  const isValid =
    formValues.login &&
    !formErrors.login &&
    formValues.password &&
    !formErrors.password

  const canBeError = (field) => obtainError(field, formErrors)

  useEffect(() => {
    if (action === 'logout') {
      setContextApp((context) => ({ ...context, login: null }))
    }
  }, [action, setContextApp])

  const handleChange = async (e) => {
    const { name, value } = e.target

    setIsLoginOk(true) // clearing the output of previous errors

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`formValues:`, formValues)
    const ok = isEntryOk({ ...formValues })
    setIsLoginOk(ok)
    if (ok) {
      setContextApp((context) => ({ ...context, login: formValues.login }))
      navigate('/')
    }
  }

  return (
    <Container maxWidth='xs' className={classes.container}>
      <Paper elevation={5} className={classes.paper}>
        <Typography variant='h4' align='center' color='primary' noWrap>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            className={classes.field}
            label='логин'
            name='login'
            placeholder='Введите логин'
            value={formValues.login || ''}
            onChange={handleChange}
            required={true}
            {...parameters}
            {...canBeError('login')}
          />
          <TextField
            fullWidth
            className={classes.field}
            label='пароль'
            name='password'
            placeholder='Введите пароль'
            value={formValues.password || ''}
            onChange={handleChange}
            required={true}
            {...parameters}
            {...canBeError('password')}
          />
          <Box mt={2}>
            {isLoginOk !== null && isLoginOk === false ? (
              <p className={classes.error}>Неверный логин или пароль</p>
            ) : null}
            <Button
              color='primary'
              disabled={!isValid}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
            >
              Продолжить
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

Login.propTypes = LOGIN_TYPE
export default Login
