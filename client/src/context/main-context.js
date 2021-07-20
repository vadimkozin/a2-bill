import { createContext } from 'react'

function noop() {}

export const MainContext = createContext({
  title: null,
  customers: null,
  numbers: null,
  tariffs: null,
  saveCustomers: noop,
  saveNumbers: noop,
  saveTariffs: noop,
  saveTitle: noop,
  reset: noop,
  isCustomers: noop,
  isNumbers: noop,
  isTariffs: noop,
  transferNumber: noop,
  getNumberInfo: noop,
  getCustomersList: noop,
})
