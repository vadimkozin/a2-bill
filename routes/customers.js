const express = require('express')
const config = require('config')
const db = require('knex')(config.get('db_customers'))
const customersRouter = express.Router()
const errorHandler = require('../utils/error-handler')
const { log, TableDb } = require('./helper')

// (GET) localhost:5000/api/customers
customersRouter.route('/').get(async (req, res) => {
  try {
    const customers = await db
      .select(
        'CustID',
        'CustAlias',
        'CustName',
        'CustType',
        'AddressU',
        'AddressP',
        'Tel',
        'Email',
        'fMoscow',
        'a2',
        'fCalcTel',
        'fCalcInt',
        'fA',
        'tid_t',
        'tid_i',
        'BankName',
        'Account',
        'KAccount',
        'BIK',
        'INN',
        'KPP',
        'OKPO',
        'NumDTelAbonRss',
        'DateDTelAbonRss',
        'NumDTelRssMtc',
        'DateDTelRssMtc',
        'DatePrDTelRssOOO',
        'DatePrDTelRssOOO_642',
        'NumDInetRssOOO',
        'DateDInetRssOOO',
        'f_fio_notice',
        'f_contract_date',
        'f_contract_num',
        'f_contract_document',
        'f_birthday'
      )
      .from(TableDb.CUSTOMERS)
      .where('a2', '+')
      .orderBy('CustAlias')
      .on('query', (data) => log(data))

    res.status(200).json(customers)
  } catch (e) {
    errorHandler(res, e)
  }
})

// (POST) localhost:5000/api/customers/add
customersRouter.route('/add').post(async (req, res) => {
  res.send('add..')
})

// (PUT) localhost:5000/api/customers/edit/42
customersRouter.route('/edit/:custId').put(async (req, res) => {
  const { custId } = req.params

  try {
    const updated = await db(TableDb.CUSTOMERS_TEST)
      .where('CustID', '=', custId)
      .update(req.body)
      .on('query', (data) => log(data))

    res.send(updated === 1 ? true : false)
  } catch (e) {
    errorHandler(res, e)
  }
})

module.exports = customersRouter
