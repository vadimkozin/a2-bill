// import {shape, exact, func, number, bool, string, oneOf, oneOfType, instanceOf, array, arrayOf, object} from 'prop-types';
import { arrayOf } from 'prop-types';
import {element, shape, exact, func, bool, number, string, oneOfType, instanceOf, array, object, node} from 'prop-types';

const dateOrNull = oneOfType([instanceOf(Date), () => null])
const funcOrNull = oneOfType([func.isRequired, () => null])

export const FORM_CUSTOMER_MAIN_TYPE = {
  isNewCustomer: bool.isRequired,
  custType: string,
  customer: object
}

export const FORM_PERSONAL_TYPE = {
  handleChange: func.isRequired,
  handleSave: func.isRequired,
  tariffsTelList: array.isRequired,
  tariffsInetList: array.isRequired,
  parameters: object,
  formErrors: object,
  isNewCustomer: bool.isRequired,
  values: object
}

const CUSTOMER_BASIC_FIELDS = {
  custAlias: string.isRequired, 
  custName: string.isRequired, 
  custType: string.isRequired, 
  addressU: string, 
  addressP: string, 
  contactTel: string, 
  contactEmail: string, 
  isTel: bool.isRequired, 
  isInet: bool.isRequired, 
  isAct: bool.isRequired, 
  tarTel: object, 
  tarInet: object
}
export const FORM_CUSTOMER_BASIC_TYPE = {
  handleNext: func.isRequired,
  handleChange: func.isRequired,
  tariffsTelList: array.isRequired,
  tariffsInetList: array.isRequired,
  isNewCustomer: bool.isRequired,
  values: shape(CUSTOMER_BASIC_FIELDS),
  params: object,
  formErrors: object,
}

const CUSTOMERS_DOGOVOR_FIELDS = {
  numDogTelAbon: string, 
  dateDogTelAbon: dateOrNull, 
  numDogTelMts: string, 
  dateDogTelMts: dateOrNull,
  datePrilDogTel: dateOrNull,
  datePrilDogTel642: dateOrNull,
  numDogInet: string, 
  dateDogInet: dateOrNull,
}
export const FORM_CUSTOMER_DOGOVOR_TYPE = {
  handleNext: func.isRequired,
  handleBack: func.isRequired,
  handleChange: func.isRequired,
  values: shape(CUSTOMERS_DOGOVOR_FIELDS),
  params: object,
  formErrors: object,
}

const CUSTOMERS_BANK_FIELDS = {
  bankName: string, 
  bankAccount: string, 
  bankKAccount: string, 
  bankBik: string, 
  bankInn: string, 
  bankKpp: string, 
  bankOkpo: string
}
export const FORM_CUSTOMER_BANK_TYPE = {
  handleNext: func.isRequired,
  handleBack: func.isRequired,
  handleChange: func.isRequired,
  values: shape(CUSTOMERS_BANK_FIELDS),
  params: object,
  formErrors: object,
}

export const BOTTON_MORE_TYPE = {
  text: string.isRequired,
  disabled: bool.isRequired,
  onClick: funcOrNull
}

export const BOTTONS_NEXTPREV_TYPE = {
  textNext: string.isRequired,
  textPrev: string.isRequired,
  disabledNext: bool.isRequired,
  handleBack: func.isRequired,
  handleNext: funcOrNull,
}

export const BOTTONS_CANCELSAVE_TYPE = {
  textCancel: string,
  textSave: string,
  disabledSave: bool.isRequired,
  handleCancel: func.isRequired,
  handleSave: funcOrNull,
}

export const BOTTONS_CANCELSAVEPREV_TYPE = {
  textCancel: string,
  textSave: string,
  textPrev: string,
  disabledSave: bool.isRequired,
  handleCancel: func.isRequired,
  handleSave: funcOrNull,
  handlePrev: func.isRequired,
}

export const DATE_PICKER_TYPE = {
  name: string,
  label: string.isRequired,
  value: dateOrNull,
  handleChange: func.isRequired,
  variant: string
}

export const SELECT_TYPE = {
  name: string,
  options: array,
  option_label: string,
  option_value: string,
  label: string,
  placeholder: string,
  value: object,
}

export const PAGE_TYPE = {
  children: node.isRequired,
  title: string
}

export const CUSTOMER_LIST_TYPE = {
  className: string,
  customers: array.isRequired,
  onSelected: func.isRequired
}

export const TARIFF_LIST_TYPE = {
  className: string,
  tariffs: array.isRequired,
}
const LIST_PARAMS_TYPE = {
  headers: arrayOf(string).isRequired,  // заголовки колонок
  fields: arrayOf(string).isRequired,   // поля для отображения, fields.length === headers.length
  searchs: arrayOf(string),             // поля для поиска, searchs.length <== fields.length
  key: string.isRequired                // уникальный ключ из fields
}

export const ITEMS_LIST_TYPE = {
  className: string,
  items: arrayOf(object).isRequired,
  params: exact(LIST_PARAMS_TYPE),
  onSelect: func,
  heightUsed: number,
  isCheckbox: bool,
  isPagination: bool,
  isSwitchDense: bool
}

export const NUMBERS_TYPE = {
  data: arrayOf(object).isRequired,
  params: shape(LIST_PARAMS_TYPE),
}

export const REPORTS_FILES_TYPE = {
  params: shape(LIST_PARAMS_TYPE)
}

const TOOLBAR_BUTTON_TYPE = {
  id: number.isRequired,
  icon: element.isRequired,
  to: string.isRequired,
  ariaLabel: string.isRequired,
  text: string.isRequired,
  disabled: bool.isRequired,
  tooltip: string.isRequired,
  tooltipDisabled: string,
}
const TOOLBAR_BUTTONS_TYPE = {
  buttons: arrayOf(shape(TOOLBAR_BUTTON_TYPE))
}
export const TOOLBAR_SEARCH_TYPE = {
  title: string,
  placeholder: string,
  params: shape(TOOLBAR_BUTTONS_TYPE),
  onSearch: func.isRequired,
}
