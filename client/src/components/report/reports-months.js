import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMonthsByYear } from 'src/mock/storeMock'
import { isYear } from 'src/common/checker'

// app/reports/2021
const ReportsMonths = () => {
  const { year } = useParams()
  const months = getMonthsByYear(year)

  const test = isYear(year)
  if (!test.isOk) {
    return test.answer
  }

  return (
    <ul>
      {months.map((month) => (
        <li key={month}>
          <Link to={month}>{month}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ReportsMonths
