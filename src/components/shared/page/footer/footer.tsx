'use client'
import styles from './footer.module.scss'
import {useEffect, useState} from 'react'
import {useStore} from '@src/lib/store/store'
import FooterNavigation from './components/FooterNavigation/FooterNavigation'
import {
  IFooterNavigationLink,
  IFooterNavigationLinksGroup,
  IMobileFooterNavigationLinksGroup
} from './components/FooterNavigation/FooterNavigation.types'
import FooterContacts from './components/FooterContacts/FooterContacts'
import {AuthPopup} from '@pages/dashboard/auth/auth'
import {Backcall} from '@shared/back-call-popup/backcall'

const PRIMARY_LINKS: IFooterNavigationLinksGroup[] = [
  {
    links: [
      {name: 'Главная', href: '/'},
      {name: 'О застройщике', href: '/alkor'},
      {name: 'О проекте', href: '/o-proekte'},
      {name: 'Выбрать квартиру', href: '/planirovki-i-ceny'},
      {name: 'Выбрать паркинг', href: '#vibrat-parking'}
    ]
  },
  {
    links: [
      {name: 'Выбрать кладовую', href: '#vibrat-kladovuyu'},
      {name: 'Отделка', href: '/otdelka'},
      {name: 'Инвестиции', href: '#investicii'},
      {name: 'Ипотечный калькулятор', href: '#ipotechniy-kalkulator'},
      {name: 'Способы покупки', href: '#sposobi-pokupki'}
    ]
  },
  {
    links: [
      {name: 'Ход строительства', href: '/gallery'},
      {name: 'Новости', href: '/news'},
      {name: 'Акции', href: '#akcii'},
      {name: 'Контакты', href: '/contacts'}
    ]
  }
]

const SECONDARY_LINKS: IFooterNavigationLink[] = [
  {name: 'Правила политики обработки данных ', href: '/consent'},
  {name: 'Политика конфиденциальности', href: '/privacy-policy'}
]

const MOBILE_LINKS: IMobileFooterNavigationLinksGroup[] = [
  {
    name: (
      <p>
        Недвижимость
        <br />
      </p>
    ),
    links: [
      // {
      //   name: (
      //     <Accordion
      //       items={[
      //         {header: 'Квартиры', children: 'Квартиры'},
      //         {header: 'Комнаты', children: 'Комнаты'}
      //       ]}
      //     />
      //   ),
      // TODO если строка пустая то делаем не ссылку а div
      //   href: ''
      // },
      {name: 'Кладовые', href: '#link'},
      {name: 'Паркинг', href: '#link'}
    ]
  },
  {
    name: (
      <p>
        О проекте
        <br />
      </p>
    ),
    links: [
      {name: 'О проекте', href: '/about'},
      {name: 'Расположежие', href: '/locatio'},
      {name: 'Инфраструктура', href: '/infrastructure'},
      {name: 'Благоустройство', href: '/landscaping'},
      {name: 'Архитектура', href: '/architecture'},
      {name: 'Виды отделки', href: '/finishes'},
      {name: 'Новости', href: '/news'}
    ]
  },
  {
    name: (
      <p>
        Информация
        <br />
      </p>
    ),
    links: [
      {name: 'О застройщике', href: '#link'},
      {name: 'Способы покупки', href: '#link'},
      {name: 'Ход строительства', href: '#link'},
      {name: 'Документы', href: '#link'},
      {name: 'Контакты', href: '#link'},
      {name: 'Служба доверия', href: '#link'}
    ]
  }
]

const Footer = ({dashboard}: {dashboard?: boolean}) => {
  const {token} = useStore()

  const [isLK, setLK] = useState(false)
  const [isOpenAuth, setOpenAuth] = useState(false)

  useEffect(() => {
    setLK(true)
  }, [token])

  const [callBackModal, setCallBackModal] = useState(false)

  return (
    <div className={styles.footer}>
      <div className={styles.footer_inner}>
        <div className={`${styles.side} ${styles.side_left}`}>
          <FooterContacts
            navProps={{
              linksGroups: PRIMARY_LINKS,
              secondaryLinks: SECONDARY_LINKS,
              mobileLinksGroup: MOBILE_LINKS
            }}
            isDashboard={!!dashboard}
            isLK={isLK}
            token={token}
            onClickPrivateOffice={() => setOpenAuth(!isOpenAuth)}
          />
        </div>
        <div className={`${styles.side} ${styles.side_right}`}>
          <FooterNavigation
            linksGroups={PRIMARY_LINKS}
            secondaryLinks={SECONDARY_LINKS}
            mobileLinksGroup={MOBILE_LINKS}
          />
        </div>

        {isOpenAuth && <AuthPopup onClose={() => setOpenAuth(false)} />}
        {callBackModal && <Backcall onClose={() => setCallBackModal(false)} />}
      </div>
    </div>
  )
}

export default Footer
