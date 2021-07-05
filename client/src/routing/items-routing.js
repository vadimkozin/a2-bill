import {
  Users as CustomersIcon,
  Book as ReportIcon,
  DollarSign as TariffIcon,
  LogOut as LogoutIcon,
  Phone as NumbersIcon,
} from 'react-feather'

const itemsRouting = [
  {
    href: '/app/customers',
    icon: CustomersIcon,
    text: 'Клиенты',
  },
  {
    href: '/app/numbers',
    icon: NumbersIcon,
    text: 'Номера',
  },
  {
    href: '/app/tariffs',
    icon: TariffIcon,
    text: 'Тарифы',
  },
  {
    href: '/app/reports',
    icon: ReportIcon,
    text: 'Отчёты',
  },
  {
    href: '/logout',
    icon: LogoutIcon,
    text: 'Выход',
  },

]

export default itemsRouting
