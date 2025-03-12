'use client'
import styles from './footer.module.scss'
import {useEffect, useState} from 'react'
import {useStore} from '@src/lib/store/store'
import FooterNavigation from './components/FooterNavigation/FooterNavigation'
import {IFooterNavigationLink, IFooterNavigationLinksGroup} from './components/FooterNavigation/FooterNavigation.types'
import FooterContacts from './components/FooterContacts/FooterContacts'
import {AuthPopup} from '@pages/dashboard/auth/auth'
import {Backcall} from '@shared/back-call-popup/backcall'
import ScrollOnTopButton from '@src/components/UI-kit/buttons/ScrollOnTopButton/ScrollOnTopButton'

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
      <span style={{position: 'relative'}}></span>
      <div className={styles.footer_inner}>
        <div className={`${styles.side} ${styles.side_left}`}>
          <FooterContacts
            navProps={{
              linksGroups: PRIMARY_LINKS,
              secondaryLinks: SECONDARY_LINKS
            }}
            isDashboard={!!dashboard}
            isLK={isLK}
            token={token}
            onClickPrivateOffice={() => setOpenAuth(!isOpenAuth)}
          />
        </div>
        <div className={`${styles.side} ${styles.side_right}`}>
          <FooterNavigation linksGroups={PRIMARY_LINKS} secondaryLinks={SECONDARY_LINKS} />
        </div>

        {isOpenAuth && <AuthPopup onClose={() => setOpenAuth(false)} />}
        {callBackModal && <Backcall onClose={() => setCallBackModal(false)} />}
        <ScrollOnTopButton />
      </div>
    </div>
  )
}

export default Footer
