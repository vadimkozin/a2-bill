const express = require('express')
const config = require('config')
const db = require('knex')(config.get('db_numbers'))
const numbersRouter = express.Router()
const errorHandler = require('../utils/errorHandler')

// (GET) localhost:5000/api/numbers
numbersRouter.route('/').get(async (req, res) => {
  try {
    const numbers = await db
      .select('number', 'xnumber', 'cust_id', 'cust_name', 'date_on')
      .from('q1000a2')
    res.status(200).json(numbers)
  } catch (e) {
    errorHandler(res, e)
  }
})

module.exports = numbersRouter
