import {
  customerAdapter,
  numberAdapter,
  tariffAdapter,
  // reportAdapter,
} from 'src/store/adapters'

// const BACKEND_URL = `http://localhost:5000/api/`
const BACKEND_URL = `http://192.168.1.218:5000/api/`

const TIMEOUT_MAX = 1000 * 5

const fetchList = async (what, adapter = null, id = null) => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), TIMEOUT_MAX)

  try {
    let url = `${BACKEND_URL}${what}`
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

export const handleDownload =
  ({ name, year, month }) =>
  (event) => {
    event.preventDefault()
    console.log(name, year, month)
  }
