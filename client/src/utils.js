export const isValidDate = (value) => !isNaN(Date.parse(value))

export const isDate = (obj) =>
  Object.prototype.toString.call(obj) === '[object Date]'

export const isObject = (value) => typeof value === 'object' && value !== null

// добавляет ведущие нули: ( '2' => '02')
const addZeros = (number, digitsInNumber = 2) => {
  return `${number}`.padStart(digitsInNumber, `0`)
}

const az = addZeros

// форматривание дат
export const formatDate = {
  // 30-apr-2021 -> 2021-04-30
  ymd: (date) =>
    `${date.getFullYear()}-${az(date.getMonth() + 1)}-${az(date.getDate())}`,
  // 30-apr-2021 -> 30-04-2021
  dmy: (date) =>
    `${az(date.getDate())}-${az(date.getMonth() + 1)}-${date.getFullYear()}`,
  // 30-apr-2021 -> 20210430000000
  mysql: (date) =>
    `${date.getFullYear()}${az(date.getMonth() + 1)}${az(date.getDate())}` +
    '000000',
  // as is
  one2one: (date) => date,
}

// подготовка введённого текста перед поиском
const prepareReg = (str) => {
  const reChars = ['(', '\\', ')', '*', '.', '+', '[']
  let result = ''

  if (!str) {
    return ''
  }

  for (let i = 0; i < str.length; i++) {
    const index = reChars.indexOf(str[i])
    result += index > -1 ? '\\' + reChars[index] : str[i]
  }
  return result
}

// поиск введённого текста (what) в массиве слов (where)
export const isFindInText = (what, where = []) => {
  const re = new RegExp(prepareReg(what), 'i')
  return where.some((it) => (it ? re.test(it) : false))
}

// фильтрует массив данных (data) в поисках (text) по полям (fields)
export const getFiltred = ({ data, text, fields }) => {
  const filtered = data.filter((it) => {
    const searchs = fields.map((field) => it[field])
    return isFindInText(text, searchs)
  })
  return filtered
}

const MONTHS = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
]
// 2021_07 -> июль 2021
export const getPeriod = (yyyy_mm) => {
  const [year, month] = yyyy_mm.split('_')
  return `${MONTHS[+month - 1]} ${year}`
}

// уникальные элементы массива
export const uniqArray = (array) => {
  return Array.from(new Set(array))
}

// проверка 
export const check = {
  isYear: (year) => /^\d{4}$/.test(year),
  isPeriod: (period) => /^\d{4}_\d{2}$/.test(period),
}
