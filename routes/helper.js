const fs = require('fs')
const config = require('config')

const TableDb = {
  CUSTOMERS: 'customers.Cust',
  CUSTOMERS_TEST: 'customers.Cust_test_',
  PERSONS: 'customers.CustKS',
  HISTORY: 'telefon.history_test_',
  NUMBERS: 'telefon.tel_test_',
  NUMBERS_A2: 'telefon.q1000a2',
  TARIFFS: 'tarif.mtsTar',
  PHONE_CODE: 'tarif.komstarCode',
  USERS: 'bill.users',
}

const PATH_LOG = config.path_log

const log = (data) => {
  const { bindings, sql } = data
  let i = 0
  const request = sql.replace(/\?/g, () => `'${bindings[i++]}'`)
  const text = `log: ${request}`
  console.log(text)
  fs.promises.appendFile(PATH_LOG, `${text}\n`)
}

const subtractDay = (date) => {
  const dt = new Date(Date.parse(date))
  return new Date(dt.setDate(dt.getDate() - 1))
}

// добавляет ведущие нули: ( '2' => '02')
const az = (number, digitsInNumber = 2) =>
  `${number}`.padStart(digitsInNumber, `0`)

// 30-apr-2021 -> 20210430000000
const createMysqlDate = (date) => {
  const dt = new Date(Date.parse(date))
  return (
    `${dt.getFullYear()}${az(dt.getMonth() + 1)}${az(dt.getDate())}` + '000000'
  )
}
module.exports = {
  log,
  subtractDay,
  createMysqlDate,
  TableDb,
}
