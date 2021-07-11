import React, { useEffect, useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchReportYears } from 'src/store/api-action'
import ShowError from 'src/common/show-error'
import ShowProgress from 'src/common/show-progress'

// app/reports
const ReportsYears = () => {
  const [years, setYears] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    try {
      const years = await fetchReportYears()
      if (!mountedRef.current) return null
      setYears(years)
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

  if (years === null) {
    return <ShowProgress />
  }

  return (
    <ul>
      {years.map((year) => (
        <li key={year}>
          <Link to={`${year}`}>{year}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ReportsYears
