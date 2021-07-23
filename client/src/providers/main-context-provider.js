import React from 'react'
import { MainContext } from 'src/context/main-context'
import { useMain } from 'src/hooks/main.hook'

const MainContextProvider = ({ children }) => {
  const {
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
    updateCustomer,
    addCustomer,
  } = useMain()

  // console.log(`MAIN:`, { customers, numbers, tariffs, title })

  return (
    <MainContext.Provider
      value={{
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
        updateCustomer,
        addCustomer,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider
