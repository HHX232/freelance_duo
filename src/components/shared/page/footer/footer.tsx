'use client'
import styles from './footer.module.scss'
import {useEffect, useState} from 'react'
import {useStore} from '@src/lib/store/store'
import FooterNavigation from './components/FooterNavigation/FooterNavigation'
import {IFooterNavigationLink, IFooterNavigationLinksGroup} from './components/FooterNavigation/FooterNavigation.types'
import FooterContacts from './components/FooterContacts/FooterContacts'
import {AuthPopup} from '@pages/dashboard/auth/auth'
import {Backcall} from '@shared/back-call-popup/backcall'
import {MiniButton} from '@src/components/UI-kit/buttons/MiniButton/MiniButton'
import {SelectExample} from '@src/components/UI-kit/inputs/SelectExample/SelectExample'
import CheckBoxUI from '@src/components/UI-kit/CheckBoxUI/CheckBoxUI'

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    setLK(true)
  }, [token])

  const [callBackModal, setCallBackModal] = useState(false)

  return (
    <div className={styles.footer}>
      <div style={{backgroundColor: '#ffffff', padding: '20px', margin: '20px'}}>
        <SelectExample />

        <br />

        <CheckBoxUI>Checkbox 1.1</CheckBoxUI>
        <CheckBoxUI uiSize={'md'}>Checkbox 1.2</CheckBoxUI>
        <CheckBoxUI uiSize={'sm'}>Checkbox 1.3</CheckBoxUI>

        <br />

        <CheckBoxUI typeMark={'dash'}>Checkbox 2.1</CheckBoxUI>
        <CheckBoxUI typeMark={'dash'} uiSize={'md'}>
          Checkbox 2.2
        </CheckBoxUI>
        <CheckBoxUI typeMark={'dash'} uiSize={'sm'}>
          Checkbox 2.3
        </CheckBoxUI>

        <br />

        <CheckBoxUI error={'Error!'}>Checkbox 3.1</CheckBoxUI>
        <CheckBoxUI error={'Error!'} uiSize={'md'}>
          Checkbox 3.2
        </CheckBoxUI>
        <CheckBoxUI error={'Error!'} uiSize={'sm'}>
          Checkbox 3.3
        </CheckBoxUI>

        <br />

        <CheckBoxUI disabled>Checkbox 1.1</CheckBoxUI>
        <CheckBoxUI uiSize={'md'} disabled>
          Checkbox 1.2
        </CheckBoxUI>
        <CheckBoxUI uiSize={'sm'} disabled>
          Checkbox 1.3
        </CheckBoxUI>

        <br />

        <CheckBoxUI disabled checked>
          Checkbox 1.1
        </CheckBoxUI>
        <CheckBoxUI uiSize={'md'} disabled checked>
          Checkbox 1.2
        </CheckBoxUI>
        <CheckBoxUI uiSize={'sm'} disabled checked>
          Checkbox 1.3
        </CheckBoxUI>

        <br />

        <CheckBoxUI typeMark={'dash'} disabled checked>
          Checkbox 1.1
        </CheckBoxUI>
        <CheckBoxUI typeMark={'dash'} uiSize={'md'} disabled checked>
          Checkbox 1.2
        </CheckBoxUI>
        <CheckBoxUI typeMark={'dash'} uiSize={'sm'} disabled checked>
          Checkbox 1.3
        </CheckBoxUI>

        <br />
        <CheckBoxUI error={'Error!'} disabled>
          Checkbox 3.1
        </CheckBoxUI>
        <CheckBoxUI error={'Error!'} uiSize={'md'} disabled>
          Checkbox 3.2
        </CheckBoxUI>
        <CheckBoxUI error={'Error!'} uiSize={'sm'} disabled>
          Checkbox 3.3
        </CheckBoxUI>
      </div>
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

        <MiniButton
          extraClass={styles.scrollTopButton}
          arrowExtraClass={styles.scrollTopButtonArrow}
          activeButton={true}
          border={false}
          arrowColor={'#555'}
          buttonFill={'white'}
          onClick={handleScrollToTop}
        />
      </div>
    </div>
  )
}

export default Footer
