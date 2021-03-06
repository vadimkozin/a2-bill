const express = require('express')
const config = require('config')
const db = require('knex')(config.get('db_numbers'))
const numbersRouter = express.Router()
const errorHandler = require('../utils/error-handler')
const numberTransferRouter = require('./number-transfer')
const auth = require('../middleware/auth.middleware')
const { log, TableDb } = require('./helper')

numbersRouter.use(auth)

// (GET) localhost:5000/api/numbers
numbersRouter.route('/').get(async (req, res) => {
  try {
    const numbers = await db
      .select('number', 'xnumber', 'cust_id', 'cust_name', 'date_on')
      .from(TableDb.NUMBERS_A2)
      .on('query', (data) => log(data))

    res.status(200).json(numbers)
  } catch (e) {
    errorHandler(res, e)
  }
})

// (PUT) localhost:5000/api/numbers/transfer
numbersRouter.use('/transfer', numberTransferRouter)

module.exports = numbersRouter
