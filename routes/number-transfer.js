const express = require('express')
const config = require('config')
const db = require('knex')(config.get('db_numbers'))
const db_cust = require('knex')(config.get('db_customers'))
const numberTransferRouter = express.Router()
const errorHandler = require('../utils/error-handler')
const auth = require('../middleware/auth.middleware')
const { log, createMysqlDate, subtractDay, TableDb } = require('./helper')

numberTransferRouter.use(auth)

/**
 * смена арендатора номера number
 * новый владелец из body: {number, custId, comment, dateOn}
 * 1) узнаем тип нового владельца:
 *    (f|u) = SELECT CustType FROM customers.Cust WHERE CustID=793;
 * 2) если физ. - узнаем pid нового владельца
 *    (901)  = SELECT DISTINCT pid FROM customers.CustKS WHERE cid=793;
 * 3) узнаем текущего владельца и дату начала использования номера:
 *    SELECT cid, pid, d1 FROM telefon.tel WHERE number='6261111';
 * 4) сохраним в истории факт смены номера:
 *  INSERT INTO telefon.history (`number`, `d1`, `d2`, `cid`, `pid`, `prim`)
 *    VALUES (number, d1, d2, cid, pid, prim)
 * 5) обновим номер в таблице
 *  UPDATE telefon.tel SET cid=xxx, pid=XXX, d1=dateOn, PRIM=xxx WHERE number=NUMBER
 *
 */
// (PUT) localhost:5000/api/numbers/transfer/6261626
numberTransferRouter.route('/:number').put(async (req, res) => {
  const { number, custId, comment, dateOn } = req.body

  try {
    const custType = await getCustomerType(custId)
    console.log(`custType:`, custType)

    const pid = await getPersonPid(custId)
    console.log(`pid:`, pid)

    const currentOwner = await getCurrentOwner(number) // cid, pid, d1
    console.log(`currentOwner:`, currentOwner)

    const history = await addHistory({
      number,
      d1: createMysqlDate(currentOwner.d1), // начало аренды номера
      d2: createMysqlDate(subtractDay(dateOn)), // окончание аренды номера = dateOn - 1day
      cid: currentOwner.cid, // арендатор
      pid: currentOwner.pid, // pid если cid=546(фл)
      prim: comment,
    })
    console.log(`history:`, history)

    const updated = await updateNumber(number, {
      cid: custId,
      pid,
      d1: createMysqlDate(dateOn),
      PRIM: comment,
    })
    console.log(`updated:`, updated)

    res.send(updated === 1 ? true : false)
  } catch (e) {
    errorHandler(res, e)
  }
})

const getCustomerType = async (custId) => {
  const result = await db_cust
    .first('CustType')
    .from(TableDb.CUSTOMERS)
    .on('query', (data) => log(data))
    .where('CustID', '=', custId)

  return result ? result.CustType : null
}

// SELECT DISTINCT pid FROM customers.CustKS WHERE cid=793
const getPersonPid = async (custId) => {
  const result = await db_cust
    .first('pid')
    .from(TableDb.PERSONS)
    .on('query', (data) => log(data))
    .where('cid', '=', custId)

  return result ? result.pid : 0
}

// SELECT cid, pid, d1 FROM telefon.tel WHERE number='6261111';
const getCurrentOwner = async (number) => {
  const result = await db
    .first('cid', 'pid', 'd1')
    .from(TableDb.NUMBERS)
    .on('query', (data) => log(data))
    .where('number', '=', number)

  console.log(`result:`, result)
  return result ? result : null
}

const addHistory = async (data = { number, d1, d2, cid, pid, prim }) => {
  const result = await db(TableDb.HISTORY)
    .insert(data)
    .on('query', (data) => log(data))
  return result
}

// UPDATE telefon.tel SET cid=xxx, pid=XXX, d1=dateOn, PRIM=xxx WHERE number=NUMBER
const updateNumber = async (number, data = { cid, pid, d1, PRIM }) => {
  const result = await db(TableDb.NUMBERS)
    .where('number', '=', number)
    .update(data)
    .on('query', (data) => log(data))
  return result
}

module.exports = numberTransferRouter
