import {
  customerAdapter,
  numberAdapter,
  tariffAdapter,
  // reportAdapter,
} from 'src/store/adapters'

const BACKEND_URL = `http://localhost:5000/api/`
const TIMEOUT_MAX = 1000 * 2

const fetchList = async (what, adapter, id = null) => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), TIMEOUT_MAX)

  try {
    let url = `${BACKEND_URL}${what}`
    if (id) url += `/${id}`
    const response = await fetch(url, { signal: controller.signal })

    if (response.ok) {
      const items = await response.json()
      return adapter.adaptToClient(items)
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
export const fetchTariffs = (tarId) => fetchList('tariffs', tariffAdapter, tarId)


export const fetchNumbers_ = async (what = 'numbers') => {
  let controller = new AbortController()
  setTimeout(() => controller.abort(), 1000)

  try {
    const response = await fetch(`${BACKEND_URL}${what}`, {
      signal: controller.signal,
    })
    if (response.ok) {
      const numbers = await response.json()
      return numberAdapter.adaptToClient(numbers)
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

export const fetchNumbers__ = async (what = 'numbers') => {
  const response = await fetch(`${BACKEND_URL}${what}`)

  if (response.ok) {
    // http-status: 200-299
    const numbers = await response.json()
    return numberAdapter.adaptToClient(numbers)
  } else {
    const err = await response.json()
    throw err
  }
}

export const fetchCustomers__ = async (what = 'customers') => {
  const response = await fetch(`${BACKEND_URL}${what}`)

  if (response.ok) {
    const customers = await response.json()
    return customerAdapter.adaptToClient(customers)
  } else {
    const err = await response.json()
    throw err
  }
}
