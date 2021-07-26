import * as yup from 'yup'
import { hints } from 'src/common/helper-form'

export const initialValues = {
  // basic
  custAlias: '', // краткое название клиента
  custName: '', // полное название клиента
  custType: '', // тип клиента: u | f
  fzFioNotice: '', // название клиента в извещениях
  addressP: '', // адрес почтовый
  contactTel: '', // контактный телефон
  contactEmail: '', // контактный email
  fzContractDocument: '', // номер паспорта
  fzBirthday: null, // дата рождения
  tarTel: null, // тариф по телефонии: {}
  tarInet: null, // тариф по интернет: {}
  // dogovors
  fzContractNum: '', // номер договора
  fzContractDate: null, // дата договора
  numDogTelMts: '', // номер договора по телефонии с МТС
  dateDogTelMts: null, // дата договора по телефонии с МТС
  numDogInet: '', // номер договора по интернет
  dateDogInet: null, // дата договора по интернет
  // flags
  isTel: false, // услуга телефонии: true | false
  isInet: false, // услуга интернет: true | false
  isAct: true, // уктивность клиента: true | false
  // ...
  isA2: true, // клиент A2
  isMoscow: true, // клиент в Москве
}

export const schema = yup.object().shape({
  // basic
  custAlias: yup.string().min(2, hints.min).max(24, hints.max).required(),
  custName: yup.string().min(2, hints.min).max(250, hints.max).required(),
  custType: yup.string().required().nullable(),
  fzFioNotice: yup.string().min(2, hints.min).max(50, hints.max).required(),
  addressP: yup.string().min(2, hints.min).max(250, hints.max),
  contactTel: yup.string().min(11, hints.minDigits),
  contactEmail: yup.string().email(hints.email),
  fzContractDocument: yup
    .string()
    .min(2, hints.min)
    .max(50, hints.max)
    .required(),
  fzBirthday: yup.date(),
  tarTel: yup.object(),
  tarInet: yup.object(),
  // dogovors
  fzContractNum: yup.string().min(2, hints.min).max(16, hints.max).required(),
  fzContractDate: yup.date(),
  numDogTelMts: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogTelMts: yup.date(),
  numDogInet: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogInet: yup.date(),
  // flags
  isTel: yup.bool(),
  isInet: yup.bool(),
  isAct: yup.bool(),
})

schema.fields.tarTel.id = 'tid'
schema.fields.tarInet.id = 'tid'