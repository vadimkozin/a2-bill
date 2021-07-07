const express = require('express')
const config = require('config')
const path = require('path')
const cors = require('cors')
const customersRouter = require('./routes/customers')
const numbersRouter = require('./routes/numbers')
const tariffsRouter = require('./routes/tariffs')


const app = express()
/**
 * get:  customers
 * post: customers/add
 * put:  customers/edit/42
 *
 * get:  numbers
 * put:  numbers/transfer/6261001
 *
 * get:  tariffs
 *
 * get:  reports
 * get:  reports/2021
 * get:  reports/2021/2021_05
 *
 */

const client = `${__dirname}/client`

app.use(express.json({ extended: true }))
app.use(express.static(path.join(client, 'build')))
app.use(express.urlencoded({ extended: true }))

const myLogger = (req, res, next) => {
  console.log('LOGGED:', req.method, req.originalUrl)
  next()
}

app.use(myLogger)
app.use(cors())

app.get('/abc', (req, res) => res.send('Hello World!'))
app.use('/api/customers', customersRouter)
app.use('/api/numbers', numbersRouter)
app.use('/api/tariffs', tariffsRouter)


app.get('/*', function (req, res) {
  res.sendFile(path.join(client, 'build', 'index.html'))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const PORT = config.get('port') || 5000

try {
  app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
} catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
}
