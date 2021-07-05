import {
  customerAdapter,
  numberAdapter,
  reportAdapter,
} from 'src/store/adapters'
import customersJson from './json/customers'
import tariffsJson1 from './json/tariffs1'
import tariffsJson2 from './json/tariffs2'
import tariffsJson3 from './json/tariffs3'
import tariffsJson4 from './json/tariffs4'
import tariffsJson5 from './json/tariffs5'
import numbersJson from './json/numbers'
import numbersA2Json from './json/numbers-a2'
import { reportYears as reportYearsJson } from './reports'
import { reportMonths as reportMonthsJson } from './reports'
import { reportFiles as reportFilesJson } from './reports'

const DELAY = 1000 * 1

const sort = (items, fieldSort) =>
  items.sort((a, b) => {
    const x = a[fieldSort].toLowerCase()
    const y = b[fieldSort].toLowerCase()
    return x < y ? -1 : x > y ? 1 : 0
  })

// customers
export const customers = sort(
  customerAdapter.adaptToClient(customersJson).filter((cust) => cust.isA2),
  'custAlias'
)

export const customersList = sort(
  customers.map((cust) => ({ custId: cust.custId, custAlias: cust.custAlias })),
  'custAlias'
)

export const customers_ = sort(
  customerAdapter.adaptToClient(customersJson),
  'custAlias'
)

export const getCustomer = (cid) =>
  customers.find((cust) => Number(cust.custId) === Number(cid))

export const getCustomerAsync = (cid) => {
  const customer = getCustomer(cid)
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(customer), DELAY)
  })
}

export const getCustomersAsync = () => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(customers), DELAY)
  })
}

// tariffs
const tariffsAll = [
  ...tariffsJson1,
  ...tariffsJson2,
  ...tariffsJson3,
  ...tariffsJson4,
  ...tariffsJson5,
]
export const getTariff = (tid) =>
  tariffsAll.filter((tariff) => Number(tariff.tid) === Number(tid))

export const getTariffAsync = (tid) => {
  const tariff = getTariff(tid)
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(tariff), DELAY)
  })
}

// numbers
export const numbers = sort(numberAdapter.adaptToClient(numbersJson), 'number')
export const numbersA2 = sort(
  numberAdapter.adaptToClient(numbersA2Json),
  'number'
)

export const getNumbersAsync = (isOnlyA2) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => (isOnlyA2 ? resolve(numbersA2) : resolve(numbers)), DELAY)
  })
}

export const getNumberInfo = (number) =>
  numbers.find((numb) => String(numb.number) === String(number))

export const getNumberInfoAsync = (number) => {
  const info = getNumberInfo(number)
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(info), DELAY)
  })
}

// reports
export const reportYears = JSON.parse(reportYearsJson)
export const reportMonths = JSON.parse(reportMonthsJson)
export const reportFiles = reportAdapter.adaptToClient(
  JSON.parse(reportFilesJson)
)

export const getMonthsByYear = (year) =>
  reportMonths.filter((it) => it.startsWith(year))

export const getFiles = (year, month) => reportFiles

export const getFilesAsync = (year, month) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(getFiles(year, month)), DELAY)
  })
}

