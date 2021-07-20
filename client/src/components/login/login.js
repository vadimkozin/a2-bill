import React, { useState, useContext } from 'react'
import * as yup from 'yup'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { useNavigate } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { login } from 'src/store/api-action'
import ShowProgress from 'src/common/show-progress'
import { AuthContext } from 'src/context/auth-context'
import { MainContext } from 'src/context/main-context'
import { hints, obtainError, parameters } from 'src/common/helper-form'

const initialValues = {
  login: 'vadim',
  password: 'e0EmXDJ7aXuCqqeBO',
}

// const initialValues = {
//   login: null,
//   password: null,
// }
const ERRCODE_TO_MESSAGE_MAP = {
  AbortError: 'Превышено время ожидания',
  ERR_USER: 'Неверный логин или пароль, попробуйте еще раз',
  ERR_PASS: 'Неверный логин или пароль, попробуйте еще раз',
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

const Login = () => {
  const main = useContext(MainContext)
  const auth = useContext(AuthContext)
  const classes = useStyles()
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(null)
  const [problem, setProblem] = useState('')

  const isValid =
    formValues.login &&
    !formErrors.login &&
    formValues.password &&
    !formErrors.password

  const canBeError = (field) => obtainError(field, formErrors)

  const handleChange = async (e) => {
    const { name, value } = e.target

    setProblem('') // clearing the output of previous errors

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setProblem('')
      const ok = await login({ ...formValues })
      // console.log(`ok:`, ok)
      auth.login(ok.token, ok.userId, ok.userName)
      main.saveTitle('A2 Billing')
      setIsLoading(false)
      navigate('/')
    } catch (e) {
      setIsLoading(false)
      if (e.ecode) {
        setProblem(ERRCODE_TO_MESSAGE_MAP[e.ecode])
      }
      console.log(`e:`, e, `e.ecode:`, e.ecode, `err.name:`, e.name)
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
            {isLoading && <ShowProgress loading='' size={16} />}
            {problem && <p className={classes.error}>{problem}</p>}
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

export default Login
