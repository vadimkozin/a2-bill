import { BACKEND_URL, TIMEOUT_MAX, STORAGE_NAME } from 'src/const'
import {
  customerAdapter,
  numberAdapter,
  tariffAdapter,
  tariffsListAdapter,
} from 'src/store/adapters'

const headers = { 'Content-Type': 'application/json;charset=utf-8' }

const getToken = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
  return data && data.token ? data.token : null
}

const getHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const getHeadersUpdate = () => {
  const token = getToken()
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers
}

// GET:
const fetchList = async (what, adapter = null, id = null) => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), TIMEOUT_MAX)

  try {
    let url = `${BACKEND_URL}/${what}`
    if (id) url += `/${id}`

    const response = await fetch(url, {
      headers: getHeaders(),
      signal: controller.signal,
    })

    if (response.ok) {
      const items = await response.json()
      return adapter ? adapter.adaptToClient(items) : items
    } else {
      const err = await response.json()
      throw err
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      err.ecode = err.name
    }
    throw err
  }
}

export const fetchCustomers = () => fetchList('customers', customerAdapter)
export const fetchNumbers = () => fetchList('numbers', numberAdapter)
export const fetchTariffs = () => fetchList('tariffs', tariffAdapter)
export const fetchTariffsList = () =>
  fetchList('tariffs/list', tariffsListAdapter)
export const fetchTariff = (tarId) => fetchList('tariffs', tariffAdapter, tarId)
export const fetchReportYears = () => fetchList('reports')
export const fetchReportMonths = (year) => fetchList(`reports/${year}`)
export const fetchReportFiles = (year, period) =>
  fetchList(`reports/${year}/${period}`)

// PUT/POST:
const update = async (what, item, method = 'PUT') => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), TIMEOUT_MAX)

  try {
    const url = `${BACKEND_URL}/${what}`

    const response = await fetch(url, {
      method,
      headers: getHeadersUpdate(),
      signal: controller.signal,
      body: JSON.stringify(item),
    })

    if (response.ok) {
      const items = await response.json()
      return items
    } else {
      const err = await response.json()
      throw err
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      err.ecode = err.name
    }
    throw err
  }
}

// /api/numbers/transfer/6261001
export const transferNumber = (info) =>
  update(`numbers/transfer/${info.number}`, info)

// /api/customers/edit/42
export const updateCustomer = (customer) => {
  const data = customerAdapter.adaptToServerCustomer(customer)
  // console.log(`data:`, data)
  return update(`customers/edit/${customer.custId}`, data)
}

// /api/customers/add
export const addCustomer = (customer) => {
  const data = customerAdapter.adaptToServerCustomer(customer)
  // console.log(`add_data:`, data)
  return update(`customers/add`, data, 'POST')
}

// /api/auth/login
export const login = (info) => update(`auth/login`, info, 'POST')
