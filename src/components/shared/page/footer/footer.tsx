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
      <p className={styles.accordion_extra_font}>
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
            extraClass={styles.accordion_extra_font}
            items={[
              {
                header: 'Квартиры',
                children: (
                  <>
                    <div className={styles.accordeon_inner_item_font}>
                      <Link href={'/odnokomnatnye'}>Однокомнатные</Link>
                    </div>
                    <div className={styles.accordeon_inner_item_font}>
                      <Link href={'/dvuhkomnatnye'}>Двухкомнатные</Link>
                    </div>
                    <div className={styles.accordeon_inner_item_font}>
                      <Link href={'/3-komnatnye'}>Трехкомнатные</Link>
                    </div>
                    <div className={styles.accordeon_inner_item_font}>
                      <Link href={'/4-komnatnye'}>Четырехкомнатые</Link>
                    </div>
                    <div className={styles.accordeon_inner_item_font}>
                      <Link href={'/lofty'}>Лофты</Link>
                    </div>
                    <div className={styles.accordeon_inner_item_font}>
                      <Link href={'/planirovki-i-ceny'}>Апартаменты</Link>
                    </div>
                    <div className={styles.accordeon_inner_item_font}>
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
            extraClass={styles.accordion_extra_font}
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
            extraClass={styles.accordion_extra_font}
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
            extraClass={styles.accordion_extra_font}
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
      <p className={styles.accordion_extra_font}>
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
            // TODO Увеличить круглые изображения!
            extraClass={`${styles.accordion_extra} ${styles.accordion_extra_to_div}`}
            arrowSize='large'
            arrowColor='#fff'
            items={[
              {
                header: <p className={`${styles.secondary_font_prime_color_accordeon}`}>О проекте</p>,
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
      // TODO ссылки исправить
      {name: <p className={styles.secondary_font_prime_color}>Расположежие</p>, href: '/locatio'},
      {name: <p className={styles.secondary_font_prime_color}>Инфраструктура</p>, href: '/infrastructure'},
      {name: <p className={styles.secondary_font_prime_color}>Благоустройство</p>, href: '/landscaping'},
      {name: <p className={styles.secondary_font_prime_color}>Виды отделки</p>, href: '/finishes'},
      {name: <p className={styles.secondary_font_prime_color}>Ход строительства</p>, href: '/gallery'},
      {name: <p className={styles.secondary_font_prime_color}>Новости</p>, href: '/news'},
      {name: <p className={styles.secondary_font_prime_color}>Акции</p>, href: '/stocks'}
    ]
  },
  {
    name: (
      <p className={styles.accordion_extra_font}>
        Информация
        <br />
      </p>
    ),
    links: [
      {name: <p className={styles.secondary_font_prime_color}>О застройщике</p>, href: '/alkor'},
      {name: <p className={styles.secondary_font_prime_color}>План развития</p>, href: '/plan-razvitiya'},
      {
        name: (
          <Accordion
            animationOn={false}
            leftArrow={false}
            extraClass={`${styles.accordion_extra} ${styles.accordion_extra_to_div}`}
            arrowSize='medium'
            arrowColor='#fff'
            items={[
              {
                header: <p className={`${styles.secondary_font_prime_color_accordeon}`}>Способы покупки</p>,
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
      {
        name: <p className={styles.secondary_font_prime_color}>Ипотечный калькулятор</p>,
        href: '/ipotechniy-kalkulator'
      },
      {name: <p className={styles.secondary_font_prime_color}>Инвестиции</p>, href: '/investicii'},
      {name: <p className={styles.secondary_font_prime_color}>Документы</p>, href: '/docs'},
      {name: <p className={styles.secondary_font_prime_color}>Контакты</p>, href: '/contacts'},
      {name: <p className={styles.secondary_font_prime_color}>FAQ</p>, href: '/faq'}
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
