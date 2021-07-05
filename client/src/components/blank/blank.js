import React from 'react';
import moment from 'moment';

const Blank = ({text=''}) => {

  const date = moment(new Date()).format('DD/MM/YYYY')

  return (
    <h3>{`Пустой компонент:${text}, ${date}`}</h3>
  )
}

export default Blank;
