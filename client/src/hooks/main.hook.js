import { useState, useCallback } from 'react'
import { formatDate } from 'src/utils'

export const useMain = () => {
  const [customers, setCustomers] = useState(null)
  const [numbers, setNumbers] = useState(null)
  const [tariffs, setTariffs] = useState(null)
  const [title, setTitle] = useState(null)

  const saveCustomers = useCallback((customers) => {
    setCustomers(customers)
  }, [])

  const saveNumbers = useCallback((numbers) => {
    setNumbers(numbers)
  }, [])

  const saveTariffs = useCallback((tariffs) => {
    setTariffs(tariffs)
  }, [])

  const saveTitle = useCallback((title) => {
    setTitle(title)
  }, [])

  const reset = useCallback(() => {
    setCustomers(null)
    setNumbers(null)
    setTariffs(null)
    setTitle(null)
  }, [])

  const isCustomers = useCallback(() => isExist(customers), [customers])
  const isNumbers = useCallback(() => isExist(numbers), [numbers])
  const isTariffs = useCallback(() => isExist(tariffs), [tariffs])

  const getCustomer = useCallback(
    (custId) => {
      return isExist(customers)
        ? customers.find((cust) => String(cust.custId) === String(custId))
        : null
    },
    [customers]
  )

  const transferNumber = useCallback(
    ({ number, custId, comment, dateOn }) => {
      const length = numbers.length
      const customer = getCustomer(custId)

      for (let i = 0; i < length; i++) {
        if (String(numbers[i].number) === String(number)) {
          numbers[i].custId = custId
          numbers[i].comment = comment
          numbers[i].dateOn = formatDate.dmy(dateOn)
          numbers[i].custName = customer ? customer.custAlias : '?'
          break
        }
      }
    },
    [numbers, getCustomer]
  )

  const getNumberInfo = useCallback(
    (number) => numbers.find((numb) => String(numb.number) === String(number)),
    [numbers]
  )

  const getCustomersList = useCallback(() => {
    if (!isExist(customers)) {
      return []
    }
    return customers.map((customer) => ({
      custId: customer.custId,
      custAlias: customer.custAlias,
    }))
  }, [customers])

  return {
    customers,
    numbers,
    tariffs,
    title,
    saveCustomers,
    saveNumbers,
    saveTariffs,
    saveTitle,
    reset,
    isCustomers,
    isNumbers,
    isTariffs,
    transferNumber,
    getNumberInfo,
    getCustomersList,
  }
}

function isExist(item) {
  return Array.isArray(item) && item.length > 0 ? true : false
}