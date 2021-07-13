import { BACKEND_URL, TIMEOUT_MAX } from 'src/const'
import {
  customerAdapter,
  numberAdapter,
  tariffAdapter,
} from 'src/store/adapters'

// get
const fetchList = async (what, adapter = null, id = null) => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), TIMEOUT_MAX)

  try {
    let url = `${BACKEND_URL}/${what}`
    if (id) url += `/${id}`

    const response = await fetch(url, { signal: controller.signal })

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
export const fetchTariff = (tarId) => fetchList('tariffs', tariffAdapter, tarId)
export const fetchReportYears = () => fetchList('reports')
export const fetchReportMonths = (year) => fetchList(`reports/${year}`)
export const fetchReportFiles = (year, period) =>
  fetchList(`reports/${year}/${period}`)

// put:
const update = async (what, item) => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), TIMEOUT_MAX)

  try {
    const url = `${BACKEND_URL}/${what}`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      signal: controller.signal,
      body: JSON.stringify(item),
    })

    console.log(`response:`, response)

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

// numbers/transfer/6261001
export const transferNumber = (info) =>
  update(`numbers/transfer/${info.number}`, info)
