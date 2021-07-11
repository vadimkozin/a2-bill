// api/reports:
const years = ['2020', '2021', '2022']
// api/reports/2021
const months = [
  '2021_01',
  '2021_02',
  '2021_03',
  '2021_04',
  '2021_05',
  '2021_06',
  '2020_01',
  '2020_02',
  '2020_03',
  '2020_04',
  '2020_05',
  '2020_06',
  '2020_07',
  '2020_08',
  '2020_09',
  '2020_10',
  '2020_11',
  '2020_12',
  '2022_01',
  '2022_02',
  '2022_03',
]

// api/reports/2021/2021_05
const files = [
  {
    name: '2021_05.zip',
    desc: 'Счета и расшифровки клиентам в pdf-формате',
  },
  {
    name: '2021_05.xlsx',
    desc: 'Книга продаж и акт взаиморасчёта с МТС',
  },
  {
    name: '2021_05__loc.xlsx',
    desc: 'Итоги по местной связи',
  },
]

export const reportYears = JSON.stringify(years)
export const reportMonths = JSON.stringify(months)
export const reportFiles = JSON.stringify(files)
