import React from 'react'
import { formatDate } from 'src/utils'

export const appInit = {
  title: null,
  login: null,
  customers: null,
  numbers: null,
  tariffs: null,
}

export const AppContext = React.createContext(appInit)

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
  getCustomer: (context, custId) =>
    context['customers'].find((cust) => String(cust.custId) === String(custId)),
  getNumberInfo: (context, number) =>
    context['numbers'].find((numb) => String(numb.number) === String(number)),
  // getTariff: (context, tarId) =>
  //   context['tariffs'].filter((tariff) => tariff.tid === tarId),
  transferNumber: (context, { number, custId, comment, dateOn }) => {
    const length = context['numbers'].length
    const customer = ctx.getCustomer(context, custId)

    for (let i = 0; i < length; i++) {
      if (String(context['numbers'][i].number) === String(number)) {
        context['numbers'][i].custId = custId
        context['numbers'][i].comment = comment
        context['numbers'][i].dateOn = formatDate.dmy(dateOn)
        context['numbers'][i].custName = customer.custAlias
        break
      }
    }
  },
}

const isExist = (obj, item) => {
  return Array.isArray(obj[item]) && obj[item].length > 0 ? true : false
}
