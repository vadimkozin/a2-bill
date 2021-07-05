export const isValidDate = (value) => !isNaN(Date.parse(value))

export const isDate = (obj) =>
  Object.prototype.toString.call(obj) === '[object Date]'

export const isObject = (value) => typeof value === 'object' && value !== null

export const formatDate = (date, delimiter = '/') => {
  // 30 apr 2021 -> 30/04/2021
  let dd = date.getDate()
  if (dd < 10) dd = '0' + dd

  let mm = date.getMonth() + 1
  if (mm < 10) mm = '0' + mm

  const yyyy = date.getFullYear()

  return dd + delimiter + mm + delimiter + yyyy
}

export const formatDateSql = (date) => {
  // 30-apr-2021 -> 20210430000000

  if (!isDate(date)) {
    return null
  }
  let dd = date.getDate()
  if (dd < 10) dd = '0' + dd

  let mm = date.getMonth() + 1
  if (mm < 10) mm = '0' + mm

  const yyyy = date.getFullYear()

  return yyyy + mm + dd + '000000'
}

export const formatDate1 = (date) => {
  return date
}

// подготовка введённого текста перед поиском с использованием регулярного выражения
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
export const getPeriod = (yyyy_mm) => {
  const [year, month] = yyyy_mm.split('_')
  return `${MONTHS[+month - 1]} ${year}`
}

// уникальные элементы массива
export const uniqArray = (array) => {
  return Array.from(new Set(array));
};