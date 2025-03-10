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
import ScrollOnTopButton from '@src/components/UI-kit/buttons/ScrollOnTopButton/ScrollOnTopButton'
import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import Link from 'next/link'
import Image from '@src/components/UI-kit/image/Image'

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
      {
        name: (
          <Accordion
            animationOn={false}
            leftArrow={false}
            items={[
              {
                header: 'Квартиры',
                children: (
                  <>
                    <div>
                      <Link href={'/odnokomnatnye'}>Однокомнатные</Link>
                    </div>
                    <div>
                      <Link href={'/dvuhkomnatnye'}>Двухкомнатные</Link>
                    </div>
                    <div>
                      <Link href={'/3-komnatnye'}>Трехкомнатные</Link>
                    </div>
                    <div>
                      <Link href={'/4-komnatnye'}>Четырехкомнатые</Link>
                    </div>
                    <div>
                      <Link href={'/lofty'}>Лофты</Link>
                    </div>
                    <div>
                      <Link href={'/planirovki-i-ceny'}>Апартаменты</Link>
                    </div>
                    <div>
                      <Link href={'/kvartiry-s-balkonom'}>С балконом</Link>
                    </div>
                  </>
                )
              }
            ]}
          />
        )
      },
      {
        name: (
          <Accordion
            animationOn={false}
            leftArrow={false}
            rightArrow={false}
            items={[{header: 'Паркинг', children: <></>, size: 'defaultXXL'}]}
          />
        ),
        href: '/parking'
      },
      {
        name: (
          <Accordion
            animationOn={false}
            leftArrow={false}
            rightArrow={false}
            items={[{header: 'Коммерческие помещения', children: <></>, size: 'defaultXXL'}]}
          />
        ),
        href: '/studii'
      },
      {
        name: (
          <Accordion
            animationOn={false}
            leftArrow={false}
            rightArrow={false}
            items={[{header: 'Кладовые', children: <></>, size: 'defaultXXL'}]}
          />
        ),
        href: '/kvartiry-s-kladovoi'
      }
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
      {
        name: (
          <Accordion
            animationOn={false}
            leftArrow={false}
            extraClass={styles.accordion_extra}
            arrowSize='medium'
            arrowColor='#fff'
            items={[
              {
                header: 'О проекте',
                children: (
                  <>
                    <div className={styles.accordeon_inner_item}>
                      <Link href={'/o-proekte'}>
                        <Image
                          className={styles.accordeon_inner_item_image}
                          src='/content/about/about-new.png'
                          alt='Кронфорт'
                          loading='lazy'
                          fill={true}
                          quality={10}
                        />
                        «Кронфорт»
                      </Link>
                    </div>
                    <div className={styles.accordeon_inner_item}>
                      <Link href={'/tsentralnyi'}>
                        <Image
                          className={styles.accordeon_inner_item_image}
                          src='/content/about/central-1.png'
                          alt='Кронфорт'
                          loading='lazy'
                          fill={true}
                          quality={10}
                        />
                        «Кронфорт. Центральный»
                      </Link>
                    </div>
                  </>
                ),
                size: 'defaultXL',
                color: 'white'
              }
            ]}
          />
        )
      },
      {name: 'Расположежие', href: '/locatio'},
      {name: 'Инфраструктура', href: '/infrastructure'},
      {name: 'Благоустройство', href: '/landscaping'},
      {name: 'Виды отделки', href: '/finishes'},
      {name: 'Ход строительства', href: '/gallery'},
      {name: 'Новости', href: '/news'},
      {name: 'Акции', href: '/stocks'}
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
      {name: 'О застройщике', href: '/alkor'},
      {name: 'План развития', href: '/plan-razvitiya'},
      {
        name: (
          <Accordion
            animationOn={false}
            leftArrow={false}
            extraClass={styles.accordion_extra}
            arrowSize='medium'
            arrowColor='#fff'
            items={[
              {
                header: 'Способы покупки',
                children: (
                  <>
                    <div className={styles.accordeon_inner_item}>
                      <Link href={'/payment-methods'}>Ипотека</Link>
                    </div>
                    <div className={styles.accordeon_inner_item}>
                      <Link href={'/payment-methods'}>Рассрочка</Link>
                    </div>
                    <div className={styles.accordeon_inner_item}>
                      <Link href={'/payment-methods'}>100% оплата</Link>
                    </div>
                    <div className={styles.accordeon_inner_item}>
                      <Link href={'/payment-methods'}>Trade In</Link>
                    </div>
                  </>
                ),
                size: 'defaultXL',
                color: 'white'
              }
            ]}
          />
        )
      },
      {name: 'Ипотечный калькулятор', href: '/ipotechniy-kalkulator'},
      {name: 'Инвестиции', href: '/investicii'},
      {name: 'Документы', href: '/docs'},
      {name: 'Контакты', href: '/contacts'},
      {name: 'FAQ', href: '/faq'}
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
        <ScrollOnTopButton />
      </div>
    </div>
  )
}

export default Footer
