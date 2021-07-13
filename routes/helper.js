const log = (data) => {
  const { bindings, sql } = data
  let i = 0
  const request = sql.replace(/\?/g, () => `'${bindings[i++]}'`)
  console.log('log: ', request)
}

const subtractDay = (date) => {
  const dt = new Date(Date.parse(date))
  return new Date(dt.setDate(dt.getDate() - 1))
}

// добавляет ведущие нули: ( '2' => '02')
const az = (number, digitsInNumber = 2) => {
  return `${number}`.padStart(digitsInNumber, `0`)
}

// 30-apr-2021 -> 20210430000000
const createMysqlDate = (date) => {
  const dt = new Date(Date.parse(date))
  return (
    `${dt.getFullYear()}${az(dt.getMonth() + 1)}${az(dt.getDate())}` + '000000'
  )
}
module.exports = {
  log,
  subtractDay,
  createMysqlDate
}