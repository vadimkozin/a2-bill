import * as yup from 'yup'
import { hints } from 'src/common/helper-form'

export const initialValues = {
  // basic
  custAlias: '', // краткое название клиента
  custName: '', // полное название клиента
  custType: '', // тип клиента: u | f
  addressU: '', // адрес юридический
  addressP: '', // адрес почтовый
  contactTel: '', // контактный телефон
  contactEmail: '', // контактный email
  isMoscow: true,
  isA2: true, // клиент A2
  isTel: false, // услуга телефонии: true | false
  isInet: false, // услуга интернет: true | false
  isAct: true, // уктивность клиента: true | false
  tarTel: null, // тариф по телефонии: {}
  tarInet: null, // тариф по интернет: {}
  // bank
  bankName: '',
  bankAccount: '',
  bankKAccount: '',
  bankBik: '',
  bankInn: '',
  bankKpp: '',
  bankOkpo: '',
  // dogovors
  numDogTelAbon: '', // номер договора по телефонии на абон-плату
  dateDogTelAbon: null, // дата договора по телефонии на абон-плату
  numDogTelMts: '', // номер договора по телефонии с МТС
  dateDogTelMts: null, // дата договора по телефонии с МТС
  datePrilDogTel: null, // дата приложения №2 к договору по телефонии на 626-е , new Date()
  datePrilDogTel642: null, // дата приложения №2 к договору по телефонии на 642-е
  numDogInet: '', // номер договора по интернет
  dateDogInet: null, // дата договора по интерннет
}

export const schema = yup.object().shape({
  // basic
  custAlias: yup.string().min(2, hints.min).max(24, hints.max).required(),
  custName: yup.string().min(2, hints.min).max(250, hints.max).required(),
  custType: yup.string().required().nullable(),
  addressU: yup.string().min(2, hints.min).max(250, hints.max),
  addressP: yup.string().min(2, hints.min).max(250, hints.max),
  contactTel: yup.string().min(11, hints.minDigits),
  contactEmail: yup.string().email(hints.email),
  isTel: yup.bool(),
  isInet: yup.bool(),
  isAct: yup.bool(),
  tarTel: yup.object(),
  tarInet: yup.object(),
  // dogovors
  numDogTelAbon: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogTelAbon: yup.date(),
  numDogTelMts: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogTelMts: yup.date(),
  datePrilDogTel: yup.date(),
  datePrilDogTel642: yup.date(),
  numDogInet: yup.string().min(2, hints.min).max(14, hints.max).required(),
  dateDogInet: yup.date(),
  // bank
  bankName: yup.string().min(2, hints.min).max(100, hints.max).required(),
  bankAccount: yup.string().matches(/^\d{20}$/, {
    excludeEmptyString: true,
    message: hints.bankAccount,
  }),
  bankKAccount: yup.string().matches(/^\d{20}$/, {
    excludeEmptyString: true,
    message: hints.bankAccount,
  }),
  bankBik: yup
    .string()
    .matches(/^\d{9}$/, { excludeEmptyString: true, message: hints.bankBik }),
  bankInn: yup.string().matches(/^\d{10}(\d\d)?$/, {
    excludeEmptyString: true,
    message: hints.bankInn,
  }),
  bankKpp: yup
    .string()
    .matches(/^\d{9}$/, { excludeEmptyString: true, message: hints.bankKpp }),
  bankOkpo: yup.string().matches(/^\d{8}(\d\d)?$/, {
    excludeEmptyString: true,
    message: hints.bankOkpo,
  }),
})

schema.fields.tarTel.id = 'tid'
schema.fields.tarInet.id = 'tid'
