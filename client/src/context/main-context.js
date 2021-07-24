import { createContext } from 'react'

function noop() {}

export const MainContext = createContext({
  title: null,
  customers: null,
  numbers: null,
  tariffs: null,
  tariffsList: null,
  saveTitle: noop,
  saveCustomers: noop,
  saveNumbers: noop,
  saveTariffs: noop,
  saveTariffsList: noop,
  reset: noop,
  isCustomers: noop,
  isNumbers: noop,
  isTariffs: noop,
  isTariffsList: noop,
  transferNumber: noop,
  getNumberInfo: noop,
  getCustomersList: noop,
  updateCustomer: noop,
  addCustomer: noop,
})
