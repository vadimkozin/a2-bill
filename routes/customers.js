const express = require('express')
const config = require('config')
const db = require('knex')(config.get('db_customers'))
const customersRouter = express.Router()
const errorHandler = require('../utils/errorHandler')

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
      .from('Cust')
      .where('a2', '+')
      .orderBy('CustAlias')
    res.status(200).json(customers)
  } catch (e) {
    errorHandler(res, e)
  }
})

customersRouter.route('/add').post(async (req, res) => {
  res.send('add..')
})

customersRouter.route('/edit/:custId').put(async (req, res) => {
  res.send(req.params.custId)
})

module.exports = customersRouter
