const BACKEND_URL = `http://localhost/api/`

export const fetchNumbers = async (what = 'numbers') => {
  let response = await fetch(`${BACKEND_URL}${what}`)

  if (response.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json()
  } else {
    console.log('Ошибка HTTP: ' + response.status)
  }
}
