import {CollapseProps} from 'antd'

export const text = `Здравствуйте! К сожалению в личном кабинете не предусмотрена подгрузка аватара. Хорошего дня.`

export const panelStyle: React.CSSProperties = {
  background: `#fff`,
  borderRadius: `4px`,
  border: 'none',
  padding: `13px 18px`,
  marginBottom: `9px`
}

export const items1: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '2',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '3',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '4',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '5',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '6',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '7',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '8',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '8',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '7',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '8',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '8',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  }
]

export const items2: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Скажите как поменять аватарку? У меня нет волос и худая шея. Что делать?',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '2',
    label: 'Вопрос второй рубрики',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '3',

    label: 'Вопрос второй рубрики',
    children: <p>{text}</p>,
    style: panelStyle
  }
]

export const items3: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Вопрос третьей рубрики',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '2',
    label: 'Вопрос третьей рубрики',
    children: <p>{text}</p>,
    style: panelStyle
  },
  {
    key: '3',
    label: 'Вопрос третьей рубрики',
    children: <p>{text}</p>,
    style: panelStyle
  }
]

export const categories = [
  {
    id: '1',
    label: 'Рубрика 1',
    items: items1
  },
  {
    id: '2',
    label: 'Рубрика 2',
    items: items2
  },
  {
    id: '3',
    label: 'Рубрика 3',
    items: items3
  }
]

export const breadcrumbItems = [{title: 'Главная', href: '/'}, {title: 'Частые вопросы'}]
