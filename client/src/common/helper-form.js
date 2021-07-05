export const hints = {
  min: 'по крайней мере ${min} символа',
  max: 'не более ${max} символов',
  minDigits: 'по крайней мере ${min} цифр',
  email: 'введите корректный email',
  bankAccount: 'ровно 20 цифр',
  bankBik: 'ровно 9 цифр',
  bankInn: '10 или 12 цифр',
  bankKpp: 'ровно 9 цифр',
  bankOkpo: '8 или 10 цифр',
}

export const parameters = {
  size: 'small',
  // margin: "normal",
  // variant: "outlined",
  autoComplete: 'off',
}

export const obtainError = (field, formErrors) => {
  return {
    error: !!formErrors[field],
    helperText: formErrors[field],
  }
}
