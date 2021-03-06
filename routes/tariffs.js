const express = require('express')
const config = require('config')
const db = require('knex')(config.get('db_tariffs'))
const tariffsRouter = express.Router()
const errorHandler = require('../utils/error-handler')
const auth = require('../middleware/auth.middleware')
const { log, TableDb } = require('./helper')

tariffsRouter.use(auth)

// (GET) localhost:5000/api/tariffs
tariffsRouter.route('/').get(async (req, res) => {
  try {
    const tariffs = await db(`${TableDb.TARIFFS} AS t`)
      .join(`${TableDb.PHONE_CODE} AS c`, 't.nid', '=', 'c.nid')
      .select(
        't.tid',
        't.nid',
        'c.name',
        't.tar AS custTar',
        'c.tar AS operTar',
        db.raw('round(t.tar/c.tar,2) AS kf')
      )
      .orderBy('c.name')
      .on('query', (data) => log(data))

    res.status(200).json(tariffs)
  } catch (e) {
    errorHandler(res, e)
  }
})

// (GET) localhost:5000/api/tariffs/list
tariffsRouter.route('/list').get(async (req, res) => {
  try {
    const tariffsList = await db(`${TableDb.TARIFFS_LIST} AS t`)
      .select(
        'tid',
        'name'
      )
      .orderBy('id')
      .on('query', (data) => log(data))

    res.status(200).json(tariffsList)
  } catch (e) {
    errorHandler(res, e)
  }
})


// SELECT t.nid, c.name, t.tar custTar, c.tar operTar, round(t.tar/c.tar,2) kf FROM mtsTar t JOIN komstarCode c ON t.nid=c.nid WHERE t.tid=1 ORDER BY c.name;
// (GET) localhost:5000/api/tariffs/:1
tariffsRouter.route('/:tarId').get(async (req, res) => {
  const { tarId } = req.params
  try {
    const tariffs = await db(`${TableDb.TARIFFS} AS t`) // mtsTar as t
      .join(`${TableDb.PHONE_CODE} AS c`, 't.nid', '=', 'c.nid')
      .select(
        't.nid',
        'c.name',
        't.tar AS custTar',
        'c.tar AS operTar',
        db.raw('round(t.tar/c.tar,2) AS kf')
      )
      .where('t.tid', '=', tarId)
      .orderBy('c.name')
      .on('query', (data) => log(data))

    res.status(200).json(tariffs)
  } catch (e) {
    errorHandler(res, e)
  }
})



module.exports = tariffsRouter
