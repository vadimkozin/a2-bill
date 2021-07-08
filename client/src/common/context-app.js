import React from 'react'

export const appInit = {
  title: null,
  login: null,
  customers: null,
  numbers: null,
  tariffs: null,
}

export const ContextApp = React.createContext(appInit)

export const ctx = {
  isCustomers: (context) => isExist(context, 'customers'),
  isNumbers: (context) => isExist(context, 'numbers'),
  isTariffs: (context) => isExist(context, 'tariffs'),
  getCustomersList: (context) => {
    if (!isExist(context, 'customers')) {
      return []
    }
    return context['customers'].map((customer) => ({
      custId: customer.custId,
      custAlias: customer.custAlias,
    }))
  },
  getNumberInfo: (context, number) =>
    context['numbers'].find((numb) => String(numb.number) === String(number)),
  getTariff: (context, tarId) =>
    context['tariffs'].filter((tariff) => tariff.tid === tarId),
}

const isExist = (obj, item) => {
  return Array.isArray(obj[item]) && obj[item].length > 0 ? true : false
}
