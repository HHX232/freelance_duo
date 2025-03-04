'use client'
import styles from './footer.module.scss'
import LogoIcon from '@icons/logo-accent-footer.svg'
import LogoFooterDashboard from '@icons/logo-footer-dashboard.svg'
import TgIcon from '@icons/tg.svg'
// import FriendIcon from '@icons/friend.svg'
// import FriendMobIcon from '@icons/friend_mob.svg'
import Link from 'next/link'
import {useIsTablet} from '@utils/useIsMobile'
import {useEffect, useState} from 'react'
// import clsx from 'clsx'
import UserSVG from '@icon/user.svg'
import {useStore} from '@src/lib/store/store'
import {AuthPopup} from '@pages/dashboard/auth/auth'
import {Backcall} from '@shared/back-call-popup/backcall'
import FooterSiteMap from './components/FooterSiteMap/FooterSiteMap'
import FooterSiteMapWithAccordion from './components/FooterSiteMapWithAccordion/FooterSiteMapWithAccordion'

// interface FooterLink {
//   title: string
//   href: string
// }

// const FOOTER_LINKS: FooterLink[] = [
//   {title: 'Главная', href: '/'},
//   {title: 'О застройщике', href: '/alkor'},
//   {title: 'О проекте', href: '/o-proekte'},
//   {title: 'Выбрать квартиру', href: '/planirovki-i-ceny'},

//   {title: 'Выбрать паркинг', href: '#vibrat-parking'},
//   {title: 'Выбрать кладовую', href: '#vibrat-kladovuyu'},
//   {title: 'Отделка', href: '/otdelka'},
//   {title: 'Инвестиции', href: '#investicii'},

//   {title: 'Ипотечный калькулятор', href: '#ipotechniy-kalkulator'},
//   {title: 'Способы покупки', href: '#sposobi-pokupki'},
//   {title: 'Ход строительства', href: '/gallery'},
//   {title: 'Новости', href: '/news'},

//   {title: 'Акции', href: '#akcii'},
//   {title: 'Контакты', href: '/contacts'},
// ]

// const FOOTER_SECONDARY_LINKS: FooterLink[] = [
//   { title: 'Правила политики обработки данных ', href: '/consent' },
//   { title: 'Политика конфиденциальности', href: '/privacy-policy' },
// ];

const Footer = ({dashboard}: {dashboard?: boolean}) => {
  const isTablet = useIsTablet(800)
  const {token} = useStore()

  const [isLK, setLK] = useState(false)
  const [isOpenAuth, setOpenAuth] = useState(false)

  useEffect(() => {
    setLK(true)
  }, [token])

  const [callBackModal, setCallBackModal] = useState(false)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner_container}>
        <div className={styles.container_left}>
          <div className={styles.logo_wrapper}>
            <Link href={'/'}>
              <div className={styles.logo}>{dashboard ? <LogoFooterDashboard /> : <LogoIcon />}</div>
            </Link>
          </div>

          <div className={styles.bottom}>
            {isLK && (
              <div className={styles.lk}>
                {token ? (
                  <Link href={'/lk'}>
                    <span>Личный кабинет</span>
                  </Link>
                ) : (
                  <button
                    type='button'
                    style={{padding: '0', textAlign: 'left'}}
                    onClick={() => setOpenAuth(!isOpenAuth)}
                  >
                    <span>Личный кабинет</span>
                  </button>
                )}
              </div>
            )}

            <div className={styles.links}>
              <div className={styles.social}>
                <Link href={'https://t.me/Kronfort_life'}>
                  <TgIcon />
                </Link>
                <button type='button' onClick={() => setCallBackModal(true)}>
                  <svg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M22.5 0C34.9262 0 45 10.0733 45 22.5C45 34.9267 34.9267 45 22.5 45C10.0733 45 0 34.9262 0 22.5C0 10.0738 10.0733 0 22.5 0ZM34.5117 30.5653L28.8138 25.0999C28.4495 24.7506 27.8712 24.7566 27.5144 25.1134L24.9355 27.6923C21.6421 25.7133 19.0537 23.2046 17.3082 20.065L19.8871 17.4861C20.2439 17.1293 20.2499 16.551 19.9006 16.1867L14.4352 10.4888C14.2558 10.3019 14.0338 10.2056 13.7747 10.2031C13.5156 10.2006 13.2916 10.2918 13.1082 10.4752C12.4888 11.0946 12.121 11.4625 11.2751 12.3084C5.2043 18.3792 26.6218 39.7967 32.6926 33.7259C33.5385 32.88 33.9064 32.5122 34.5258 31.8928C34.7092 31.7094 34.8004 31.4854 34.7979 31.2263C34.7954 30.9672 34.6992 30.7452 34.5122 30.5658L34.5117 30.5653Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
              <a href={'tel:+78126022010'} className={styles.phone}>
                Тел: + 7 (123) 123-45-67
              </a>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          {isTablet ? <FooterSiteMapWithAccordion /> : <FooterSiteMap />}

          {/* <ul className={styles.columns_tablet}>
            {FOOTER_LINKS.map((footerLink: FooterLink, footerLinkIndex: number) => (
              <li key={footerLinkIndex}>
                <Link href={footerLink.href}>{footerLink.title}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.secondary_links}>
            <div className={styles.links}>
              <ul>
                {FOOTER_SECONDARY_LINKS.map((footerSecondaryLink: FooterLink, footerSecondaryLinkIndex: number) => (
                  <li key={footerSecondaryLinkIndex}>
                    <Link href={footerSecondaryLink.href}>{footerSecondaryLink.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
        </div>
        */}
        </div>

        <div className={styles.mobile_footer}>
          <div className={styles.container}>
            <Link href={'/'}>
              <div className={styles.logo}>
                <LogoIcon />
              </div>
            </Link>

            {isLK && (
              <>
                {token ? (
                  <Link href={'/lk'}>
                    <UserSVG className={styles.user} />
                  </Link>
                ) : (
                  <button
                    type='button'
                    style={{padding: '0', textAlign: 'left'}}
                    onClick={() => setOpenAuth(!isOpenAuth)}
                    className={styles.user}
                  >
                    <UserSVG className={styles.user} />
                  </button>
                )}
              </>
            )}

            <a href={'tel:+78126022010'} className={styles.phone}>
              +7 812 602 20 10
            </a>
            <button className={styles.scroll} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM7 19C7 19.5523 7.44772 20 8 20C8.55228 20 9 19.5523 9 19H7ZM7 1V19H9V1H7Z'
                  fill='white'
                />
              </svg>
            </button>
          </div>
          <div className={styles.nav}>
            {/* <ul>
            {FOOTER_LINKS.map((footerLink: FooterLink, footerLinkIndex: number) => (
              <Accordion
              key={footerLinkIndex}
              items={[
                {
                  header: 'Title I',
                  children: (
                    <p style={{fontSize: '12px'}} className='m-0'>
                      Content 2{' '}
                    </p>
                  ),
                  disabled: true,
                  color: 'accent',
                  font: 'romul',
                  size: 'accentSmall'
                },
                {
                  header: 'Title II',
                  children: <p className='m-0'>Content 2 </p>,
                  disabled: true
                }
              ]}
            />
            ))}
            <li>
              <Link href={'/'}>Главная</Link>
            </li>
            <li>
              <Link href={'/o-proekte'}>О проекте</Link>
            </li>
            <li>
              <Link href={'/alkor'}>О застройщике</Link>
            </li>
            <li>
              <Link href={'/gallery'}>Ход строительства</Link>
            </li>
            <li>
              <Link href={'/tsentralnyi'}>Кронфорт. Центральный</Link>
            </li>
            <li>
              <Link href={'/infrastruktura'}>Инфраструктура</Link>
            </li>
            <li>
              <Link href={'/blagoustroistvo'}>Благоустройство</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href={'/planirovki-i-ceny'}>Выбрать квартиру</Link>
            </li>
            <li>
              <Link href={'/otdelka'}>Отделка</Link>
            </li>
            <li>
              <Link href={'/news'}>Новости</Link>
            </li>
            <li>
              <Link href={'/contacts'}>Контакты</Link>
            </li>
          </ul> */}
          </div>
          <div className={styles.worktime}>
            <div>
              <p>Отдел продаж</p>
              <span>ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»</span>
            </div>
            <div>
              <p>
                По будням <span>с 9:00 до 19:00</span>
              </p>
              <p>
                Выходные <span>суббота - воскресенье</span>
              </p>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.social}>
              <Link href={'https://t.me/Kronfort_life'}>
                <TgIcon />
              </Link>
              <button type='button' onClick={() => setCallBackModal(true)}>
                <svg width='29' height='30' viewBox='0 0 29 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M14.5 0.308411C22.508 0.308411 29 6.80011 29 14.8084C29 22.8167 22.5083 29.3084 14.5 29.3084C6.4917 29.3084 0 22.8164 0 14.8084C0 6.80044 6.4917 0.308411 14.5 0.308411ZM22.2409 20.006L18.5689 16.4839C18.3341 16.2588 17.9614 16.2627 17.7315 16.4926L16.0696 18.1545C13.9471 16.8792 12.279 15.2625 11.1542 13.2392L12.8161 11.5773C13.0461 11.3473 13.0499 10.9746 12.8248 10.7398L9.3027 7.06784C9.18708 6.94738 9.04401 6.88537 8.87704 6.88376C8.71008 6.88214 8.56572 6.94092 8.44751 7.05912C8.04834 7.45829 7.81129 7.69534 7.26615 8.24049C3.35388 12.1528 17.1563 25.9552 21.0686 22.0429C21.6137 21.4978 21.8508 21.2607 22.2499 20.8615C22.3681 20.7433 22.4269 20.599 22.4253 20.432C22.4237 20.265 22.3614 20.1217 22.2409 20.006Z'
                    fill='white'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.policy}>
            <Link href={'/consent'}>Согласие на обработку персональных данных</Link>
            <Link href={'/privacy-policy'}>Политика конфиденциальности</Link>
          </div>
        </div>
        {isOpenAuth && <AuthPopup onClose={() => setOpenAuth(false)} />}
        {callBackModal && <Backcall onClose={() => setCallBackModal(false)} />}
      </div>
    </footer>
  )
}

export default Footer
