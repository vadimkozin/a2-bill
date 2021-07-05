// возвращает случайное число между min и max
export const getRandomInteger = (min = 0, max = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// возвращает случайный элемент массива
export const getRandomFrom = (array) => {
  const index = getRandomInteger(0, array.length - 1)
  return array[index]
}

// возвращает случайную дату
export const getRandomDate = (daysBeforeMax = 31) => {
  const hours = getRandomInteger(1, 24 * daysBeforeMax)
  return new Date(Date.now() - 1000 * 3600 * hours)
}
