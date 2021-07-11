import React, { useEffect, useRef, useCallback, useState } from 'react'
import { fetchReportMonths } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'
import { Link, useParams } from 'react-router-dom'
import { check } from 'src/utils'

// app/reports/2021
const ReportsMonths = () => {
  const { year } = useParams()
  const [months, setMonths] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      if (!check.isYear(year)) {
        throw new Error(`неверно задан год:: ${year}`)
      }

      const months = await fetchReportMonths(year)
      if (!mountedRef.current) return null
      setMonths(months)
    } catch (error) {
      setError(error)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData()
    return () => (mountedRef.current = false)
  }, [fetchData])

  if (error) {
    return <ShowError error={error} />
  }

  if (months === null) {
    return <ShowProgress />
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
