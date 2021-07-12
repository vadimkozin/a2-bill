module.exports = {
  // [2021_01.zip, 2021_01.xlsx, .. 2021_06.zip .. 2022_03.zip .. ] -> [2021, 2022, ..]
  getYears: ({ files }) => {
    const years = files.map((file) => file.split('_')[0]) // [2021, 2021, ..]
    return uniq(years)
  },
  // (2021, [2021_01.zip, 2021_02.xlsx, 2022_01.xlsx, ..  ]) -> [2021_01, 2021_02, ..]
  getMonths: ({ files, year }) => {
    const re = new RegExp(`^${year}`)
    const months = files
      .filter((file) => re.test(file))
      .map((file) => file.slice(0, 7))
    return uniq(months)
  },
  // (2021_01,[2021_01.zip, 2021_02.xlsx, 2022_01.xlsx, ..  ]) -> [2021_01.zip, 2021_01.xlsx, ..]
  getFiles: ({ files, month }) => {
    const re = new RegExp(`^${month}`)
    return files.filter((file) => re.test(file))
  },
}

const uniq = (array) => Array.from(new Set(array))
