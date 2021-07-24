import { formatDate } from 'src/utils'
import { tariffsTelList } from './tariffs'

const getYN = (bool) => (bool === true ? 'Y' : 'N')
const getPM = (bool) => (bool === true ? '+' : '-')
const getBoolYN = (yn) => (yn === 'Y' ? true : false)
const getBoolPM = (pm) => (pm === '+' ? true : false)
const getTariffItem = (tid) =>
  tariffsTelList.find((it) => Number(it.tid) === Number(tid))

const getTariffId = (obj, key, subkey) => {
  const id = obj[key] && obj[key][subkey]
  return id ? id : 0
}

export const customerAdapter = {
  adaptToServer(customers) {
    return customers.map((customer) => this.adaptToServerCustomer(customer))
  },

  adaptToServerCustomer(o) {
    return {
      // id: o.custId,
      CustID: o.custId,
      CustAlias: o.custAlias, // краткое название клиента
      CustName: o.custName, // полное название клиента
      CustType: o.custType, // тип клиента: u | f
      AddressU: o.addressU, // адрес юридический
      AddressP: o.addressP, // адрес почтовый
      Tel: o.contactTel, // контактный телефон
      Email: o.contactEmail, // контактный email
      fMoscow: getYN(o.isMoscow),
      a2: getPM(o.isA2), // клиент A2: 'Y' | 'N'
      fCalcTel: getYN(o.isTel), // услуга телефонии: 'Y' | 'N'
      fCalcInt: getYN(o.isInet), // услуга интернет: 'Y' | 'N'
      fA: getYN(o.isAct), // активность клиента: 'Y' | 'N'
      tid_t: getTariffId(o, 'tarTel', 'tid'), // код тарифа по телефонии
      tid_i: getTariffId(o, 'tarInet', 'tid'), // код тарифа по интернет
      // bank
      BankName: o.bankName,
      Account: o.bankAccount,
      KAccount: o.bankKAccount,
      BIK: o.bankBik,
      INN: o.bankInn,
      KPP: o.bankKpp,
      OKPO: o.bankOkpo,
      // dogovors
      NumDTelAbonRss: o.numDogTelAbon, // номер договора по телефонии на абон-плату
      DateDTelAbonRss: formatDate.mysql(o.dateDogTelAbon), // дата договора по телефонии на абон-плату
      NumDTelRssMtc: o.numDogTelMts, // номер договора по телефонии с МТС
      DateDTelRssMtc: formatDate.mysql(o.dateDogTelMts), // дата договора по телефонии с МТС
      DatePrDTelRssOOO: formatDate.mysql(o.datePrilDogTel), // дата приложения №2 к договору по телефонии на 626-е , new Date()
      DatePrDTelRssOOO_642: formatDate.mysql(o.datePrilDogTel642), // дата приложения №2 к договору по телефонии на 642-е
      NumDInetRssOOO: o.numDogInet, // номер договора по интернет
      DateDInetRssOOO: formatDate.mysql(o.dateDogInet), // дата договора по интерннет
      // fiz
      f_fio_notice: o.fzFioNotice, // (физ) ФИО в извещениях, например Петров М.П.
      f_contract_date: formatDate.mysql(o.fzContractDate), // (физ) дата заключения договора
      f_contract_num: o.fzContractNum, // (физ) номер договора
      f_contract_document: o.fzContractDocument, // (физ) номер паспорта или номер того что в договоре
      f_birthday: formatDate.mysql(o.fzBirthday), // (физ) день рождения
    }
  },

  adaptToClient(customers) {
    return customers.map((customer) => this.adaptToClientCustomer(customer))
  },

  adaptToClientCustomer(o) {
    return {
      id: o.CustID,
      custId: o.CustID,
      custAlias: o.CustAlias, // краткое название клиента
      custName: o.CustName, // полное название клиента
      custType: o.CustType, // тип клиента: u | f
      addressU: o.AddressU, // адрес юридический
      addressP: o.AddressP, // адрес почтовый
      contactTel: o.Tel, // контактный телефон
      contactEmail: o.Email, // контактный email
      isMoscow: getBoolYN(o.fMoscow), // клиент в Москве Y|N -> true|false
      isA2: getBoolPM(o.a2), // клиент A2 +|- -> true|false
      isTel: getBoolYN(o.fCalcTel), // услуга телефонии Y|N -> true|false
      isInet: getBoolYN(o.fCalcInt), // услуга интернет Y|N -> true|false
      isAct: getBoolYN(o.fA), // активность клиента Y|N -> true|false
      tarTel: getTariffItem(o.tid_t), // тарифа по телефонии
      tarInet: getTariffItem(o.tid_i), // тариф по интернет
      // bank
      bankName: o.BankName,
      bankAccount: o.Account,
      bankKAccount: o.KAccount,
      bankBik: o.BIK,
      bankInn: o.INN,
      bankKpp: o.KPP,
      bankOkpo: o.OKPO,
      // dogovors
      numDogTelAbon: o.NumDTelAbonRss, // номер договора по телефонии на абон-плату
      dateDogTelAbon: formatDate.one2one(o.DateDTelAbonRss), // дата договора по телефонии на абон-плату
      numDogTelMts: o.NumDTelRssMtc, // номер договора по телефонии с МТС
      dateDogTelMts: formatDate.one2one(o.DateDTelRssMtc), // дата договора по телефонии с МТС
      datePrilDogTel: formatDate.one2one(o.DatePrDTelRssOOO), // дата приложения №2 к договору по телефонии на 626-е , new Date()
      datePrilDogTel642: formatDate.one2one(o.DatePrDTelRssOOO_642), // дата приложения №2 к договору по телефонии на 642-е
      numDogInet: o.NumDInetRssOOO, // номер договора по интернет
      dateDogInet: formatDate.one2one(o.DateDInetRssOOO), // дата договора по интерннет

      // fiz
      fzFioNotice: o.f_fio_notice, // (физ) ФИО в извещениях, например Петров М.П.
      fzContractDate: o.f_contract_date, // (физ) дата заключения договора
      fzContractNum: o.f_contract_num, // (физ) номер договора
      fzContractDocument: o.f_contract_document, // (физ) номер паспорта или номер того что в договоре
      fzBirthday: o.f_birthday, // (физ) день рождения
    }
  },
}

export const tariffAdapter = {
  adaptToServer(tariffs) {
    return tariffs.map((tariff) => this.adaptToServerTariff(tariff))
  },

  adaptToServerTariff(o) {
    return {
      nid: o.nid,
      name: o.name,
      custTar: o.custTar,
      operTar: o.operTar,
      kf: o.kf,
    }
  },

  adaptToClient(tariffs) {
    return tariffs.map((tariff) => this.adaptToClientTariff(tariff))
  },

  adaptToClientTariff(o) {
    return {
      tid: o.tid, // код тарифа
      nid: o.nid, // код направления
      name: o.name, // название
      custTar: o.custTar, // клиентский тариф
      operTar: o.operTar, // тариф оператора
      kf: o.kf, // коэффициент = custTar/operTar
    }
  },
}

export const numberAdapter = {
  adaptToClient(tariffs) {
    return tariffs.map((tariff) => this.adaptToClientNumber(tariff))
  },

  adaptToClientNumber(o) {
    return {
      number: o.number, // номер (626xxxx)
      xnumber: o.xnumber, // полный номер (7495626xxxx)
      custId: o.cust_id, // код клиента
      custName: o.cust_name, // название клиента,
      dateOn: formatDate.dmy(new Date(o.date_on)), // дата начала предоставления услуги
    }
  },
}

export const reportAdapter = {
  adaptToClient(files) {
    return files.map((file) => this.adaptToClientFile(file))
  },

  adaptToClientFile(o) {
    return {
      name: o.name, // имя файла
      desc: o.desc, // описание файла
    }
  },
}

export const tariffsListAdapter = {
  adaptToClient(items) {
    return items.map((item) => this.adaptToClientTariffsList(item))
  },

  adaptToClientTariffsList(o) {
    return {
      label: o.name, // название тарифа
      tid: String(o.tid), // код тарифа
    }
  },
}
