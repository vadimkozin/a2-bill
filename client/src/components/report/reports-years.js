import React from 'react'
import { Link } from 'react-router-dom'
import { reportYears } from 'src/mock/storeMock'

// app/reports/years
const ReportsYears = () => {
  return (
    <ul>
      {reportYears.map((year) => (
        <li key={year}>
          <Link to={`${year}`}>{year}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ReportsYears
