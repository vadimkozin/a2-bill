import React from 'react'

export const isYear = (year) => {
  const result = {}
  const test = /^\d{4}$/.test(year) // 2021...2099

  if (test) {
    result.isOk = true
    result.answer = ''
  } else {
    result.isOk = false
    result.answer = <p>Год '{year}' введён неверно. Год должен выглядеть так: 2021, 2022, ..</p>
  }

  return result
}

export const isPeriod = (period) => {
  const result = {}
  const test = /^\d{4}_\d{2}$/.test(period) // 2021_05

  if (test) {
    result.isOk = true
  } else {
    result.isOk = false
    result.answer = <p>Период '{period}' введён неверно. Период должен выглядеть так: 2021_01, 2021_02, ..</p>
  }

  return result
}