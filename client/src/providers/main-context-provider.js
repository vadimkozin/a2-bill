import React from 'react'
import { MainContext } from 'src/context/main-context'
import { useMain } from 'src/hooks/main.hook'

const MainContextProvider = ({ children }) => {
  const {
    title,
    customers,
    numbers,
    tariffs,
    tariffsList,
    saveCustomers,
    saveNumbers,
    saveTariffs,
    saveTariffsList,
    saveTitle,
    reset,
    isCustomers,
    isNumbers,
    isTariffs,
    isTariffsList,
    transferNumber,
    getNumberInfo,
    getCustomersList,
    updateCustomer,
    addCustomer,
  } = useMain()

  console.log(`MAIN:`, { customers, numbers, tariffs, title, tariffsList })

  return (
    <MainContext.Provider
      value={{
        title,
        customers,
        numbers,
        tariffs,
        tariffsList,
        saveCustomers,
        saveNumbers,
        saveTariffs,
        saveTariffsList,
        saveTitle,
        reset,
        isCustomers,
        isNumbers,
        isTariffs,
        isTariffsList,
        transferNumber,
        getNumberInfo,
        getCustomersList,
        updateCustomer,
        addCustomer,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider
