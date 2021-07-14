import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import moment from 'moment'

const NotFound = ({ text = '' }) => {
  const date = moment(new Date()).format('DD/MM/YYYY')

  return (
    <>
      <h3>{`Нет запрошенной страницы. ${date}`}</h3>
      <RouterLink to={'/'}>Перейти на главную</RouterLink>
    </>
  )
}

export default NotFound
