'use client'
import styles from './Header.module.scss'
import LogoSVG from '@icons/logo.svg'
//import LogoAccentSVG from '@icon/logo-accent.svg'
import LogoMainSVG from '@icon/logo-main.svg'

import MenuSVG from '@icons/menu.svg'
import CompareSVG from '@icons/compare.svg'
import CallBackSVG from '@icons/callback.svg'
import UserSVG from '@icons/user.svg'
import FavoriteSVG from '@icons/favorite.svg'
import CancelSVG from '@icons/cancel.svg'
import Link from 'next/link'
import clsx from 'clsx'
import IconWithCount from '@shared/IconWithCount/IconWithCount'
import FilledButton from '@shared/filledButton/FilledButton'
import { useEffect, useRef, useState } from 'react'
import MenuItem from './menuItem/MenuItem'
import MenuBlock from './menuBlock/MenuBlock'
import { useIsMobile, useIsTablet } from '@utils/useIsMobile'
import { useClickOutside } from '@src/lib/hooks/useOutsideClick'
import { AuthPopup } from '@pages/dashboard/auth/auth'
import { useStore } from '@src/lib/store/store'
import { usePathname, useRouter } from 'next/navigation'
import { Backcall } from '@shared/back-call-popup/backcall'
import useRouterNext from "@src/lib/hooks/useRouter";

interface HeaderProps {
  dark?: boolean
  dashboard?: {
    information: boolean
    selection: boolean
  }
}

const Header = ({ dark, dashboard }: HeaderProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const burgerRef = useRef(null)

  const router = useRouter()

  const { replace } = useRouterNext();
  const pathname = usePathname()

  const { token, clearToken } = useStore()

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   router.replace('/planirovki-i-ceny');
  //   setIsMenuOpened(false);
  // };
  //
  const handleClick = () => {
    setIsMenuOpened(false)
    //router.push('/planirovki-i-ceny')
    replace({
      pathname: '/planirovki-i-ceny',
      query: {}
    });
  }

  useEffect(() => {
    const scrollbarWidth = 17

    if (isMenuOpened) {
      document.body.style.overflow = 'hidden'
      if (!isTablet) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isMenuOpened])

  const onMenuClick = () => {
    setIsMenuOpened(!isMenuOpened)
    if (isMenuOpened) {
      //document.body.style.overflow = 'unset'
    } else {
      //document.body.style.overflow = 'hidden'
    }
  }

  const closeHandler = () => {
    setIsMenuOpened(false)
  }

  const [isDropDown, setDropDown] = useState(false)
  const ref = useRef<HTMLUListElement>(null)
  useClickOutside(ref, () => setDropDown(false))

  const [isOpenAuth, setOpenAuth] = useState(false)

  const { favorites, compare } = useStore()

  const [favoritesCount, setFavoritesCount] = useState(0)
  const [compareCount, setCompareCount] = useState(0)
  const [isLoadingCount, setIsLoadingCount] = useState(true)

  useEffect(() => {
    if (favorites) {
      setFavoritesCount(favorites.length)
    }

    if (compare) {
      setCompareCount(compare.length)
    }

    setIsLoadingCount(false)
  }, [favorites, compare])
  const isMapPage = typeof document !== 'undefined' ? document.URL.includes('map') : false

  let LogoComponent = <Link href={'/map'}>{isMenuOpened ? <LogoSVG /> : <LogoMainSVG />}</Link>

  if (dashboard) {
    LogoComponent = (
      <Link href={'/map'}>
        <LogoSVG />
      </Link>
    )
  }

  if (isMapPage) {
    LogoComponent = (
      <Link href={'/map'}>
        <LogoSVG />
      </Link>
    )
  }

  if (!dashboard && !isMapPage) {
    LogoComponent = <Link href={'/map'}>{isMenuOpened ? <LogoMainSVG /> : <LogoMainSVG />}</Link>
  }

  const [isLK, setLK] = useState(false)

  useEffect(() => {
    setLK(true)
  }, [token])

  useEffect(() => {
    console.log('CLOSE MENU')
    setIsMenuOpened(false)
  }, [router, pathname])

  const [callBackModal, setCallBackModal] = useState(false)

  const handleLogout = () => {
    clearToken()
    if (pathname.startsWith('/lk')) {
      router.push('/map')
    }
  }

  return (
    <>
      <header
        className={clsx(styles.header, { [styles.dark]: dark }, isMenuOpened ? `${styles.active} no-scroll` : '')}
        ref={burgerRef}
      >
        <div className={styles.container}>
          <div className={styles.headerTop}>
            <div className={styles.leftHeader}>
              <div className={clsx(styles.logoWrapper, isMenuOpened ? styles.opened : '')}>{LogoComponent}</div>
              {!isTablet && (
                <>
                  <div className={styles.lkWrapper}>
                    {isLK && (
                      <>
                        {token ? (
                          <Link href={'/lk'} className={styles.lk} style={isMenuOpened ? { color: '#fff' } : {}}>
                            Личный кабинет
                          </Link>
                        ) : (
                          <button
                            type='button'
                            className={styles.lk}
                            onClick={() => setOpenAuth(!isOpenAuth)}
                            style={isMenuOpened ? { color: '#fff' } : {}}
                          >
                            Личный кабинет
                          </button>
                        )}

                        {token && (
                          <button type='button' onClick={handleLogout}>
                            <svg
                              width='12'
                              height='12'
                              viewBox='0 0 15 15'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M14.2962 7.88445C14.2964 9.46982 14.3044 11.0552 14.2939 12.6405C14.2847 14.0391 13.4522 14.8637 12.0439 14.8696C10.0353 14.8779 8.02654 14.8811 6.01796 14.868C4.57394 14.8585 3.66321 13.8211 3.80321 12.3957C3.84569 11.9631 4.07066 11.6355 4.48982 11.7254C4.74212 11.7794 5.07162 12.1186 5.11754 12.3739C5.31719 13.4841 5.32785 13.531 6.46495 13.5322C8.26581 13.5342 10.0667 13.5365 11.8675 13.5305C12.7259 13.5277 12.9476 13.3155 12.949 12.4808C12.9541 9.402 12.9544 6.32316 12.9486 3.24439C12.9471 2.45254 12.7193 2.23131 11.9031 2.22775C10.0329 2.21952 8.16282 2.22113 6.2927 2.22636C5.37475 2.22894 5.20594 2.38145 5.14978 3.28638C5.12174 3.73889 4.94767 4.07355 4.46991 4.07188C3.99053 4.07021 3.8213 3.73177 3.79851 3.27969C3.72595 1.84062 4.57654 0.901433 6.02939 0.889155C8.0379 0.872202 10.0468 0.873946 12.0553 0.888038C13.4717 0.897945 14.2842 1.71742 14.2936 3.12836C14.3044 4.71366 14.2961 6.29909 14.2962 7.88445Z'
                                fill='#D38F6D'
                              />
                              <path
                                d='M8.91894 8.54762C8.67294 8.54762 8.42701 8.54762 8.18101 8.54762C5.87015 8.54734 3.55928 8.54365 1.24848 8.54951C0.771417 8.55069 0.315595 8.49558 0.301153 7.90661C0.28566 7.27648 0.756835 7.20002 1.26299 7.201C3.57386 7.20518 5.88466 7.20253 8.19552 7.20232C8.44061 7.20232 8.6857 7.20232 8.93079 7.20232C8.95876 7.14833 8.98666 7.0944 9.01463 7.0404C8.50819 6.52776 8.00926 6.00744 7.49272 5.50506C7.14676 5.16858 6.88856 4.79805 7.28598 4.37917C7.68719 3.95639 8.07172 4.18913 8.41636 4.53447C9.31202 5.43173 10.2069 6.33004 11.1185 7.21111C11.5749 7.65211 11.6061 8.05242 11.1404 8.50458C10.2143 9.40386 9.30101 10.3163 8.38544 11.2262C8.038 11.5716 7.64576 11.7835 7.25135 11.3588C6.89059 10.9704 7.09972 10.5996 7.43384 10.281C7.9646 9.77502 8.48954 9.26293 9.01701 8.75343C8.98428 8.68485 8.95161 8.6162 8.91887 8.54762H8.91894Z'
                                fill='#D38F6D'
                              />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {!dashboard && (
                    <a className={styles.phone} href={'tel:+7 812 602 20 10'}>
                      +7 (812) 602-20-10
                    </a>
                  )}
                </>
              )}
            </div>

            <div className={styles.rightHeader}>
              {isMobile && isMenuOpened && (
                <>
                  {token ? (
                    <Link href={'/lk'}>
                      <UserSVG className={styles.user} />
                    </Link>
                  ) : (
                    <button type='button' onClick={() => setOpenAuth(!isOpenAuth)}>
                      <UserSVG className={styles.user} />
                    </button>
                  )}
                </>
              )}

              {((isTablet && isMenuOpened) || !isTablet) && (
                <>
                  {!isLoadingCount && (
                    <>
                      <button type='button' className={styles.callback} onClick={() => setCallBackModal(true)}>
                        <CallBackSVG className={clsx(styles.compare, isMenuOpened ? styles.opened : '')} />
                      </button>

                      <Link href={`${dashboard ? '/lk/sravnenie' : '/sravnenie'}`}>
                        <IconWithCount
                          count={compareCount}
                          color={isMenuOpened || dashboard || isMapPage ? 'brown' : 'brown'}
                        >
                          <CompareSVG className={clsx(styles.compare, isMenuOpened ? styles.opened : '')} />
                        </IconWithCount>
                      </Link>

                      <Link href={`${dashboard ? '/lk/izbrannoe' : '/izbrannoe'}`}>
                        <IconWithCount
                          count={favoritesCount}
                          color={isMenuOpened || dashboard || isMapPage ? 'brown' : 'brown'}
                        >
                          <FavoriteSVG className={clsx(styles.favorite, isMenuOpened ? styles.opened : '')} />
                        </IconWithCount>
                      </Link>
                    </>
                  )}
                </>
              )}

              {!isMenuOpened && (
                <a href={'tel:+7 (812) 602-20-10'} className={styles.phone_mobile}>
                  <svg width='10' height='14' viewBox='0 0 10 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M7.67786 9.2864C7.48831 9.16779 7.24407 9.17561 7.06395 9.30709C6.92155 9.41099 6.76218 9.52408 6.66222 9.58615C6.40477 9.74613 6.19966 9.77923 5.94787 9.78153C5.65365 9.78383 5.36367 9.34065 5.15526 9.04458C4.72099 8.4267 4.37018 7.91318 4.08539 7.48379C3.84256 7.03096 3.55682 6.4802 3.21969 5.80715C3.05796 5.48442 2.8057 5.02009 2.95281 4.77184C3.07871 4.55944 3.20979 4.40176 3.47902 4.262C3.5837 4.20775 3.76287 4.12868 3.92602 4.0588C4.13207 3.97053 4.25938 3.76687 4.24712 3.54803C4.21081 2.90533 4.22873 1.83324 4.04248 1.10456C3.9628 0.791945 3.69215 0.598858 3.4116 0.516106C3.19234 0.451744 1.64247 0.597938 1.47933 0.644831C1.37559 0.674713 1.27422 0.717468 1.17803 0.772176C0.89182 0.934921 0.710287 1.16846 0.622585 1.2811C0.278851 1.72382 0.0756282 2.31503 0.0185749 3.03865C-0.0719559 4.18522 0.189263 5.12721 0.352879 5.58648C0.694256 6.54456 1.01394 7.69343 1.69953 8.84046C2.50629 10.1093 3.25317 10.8247 3.93969 11.5864C4.26881 11.9519 4.9808 12.6378 6.04878 13.1256C6.72304 13.4336 7.35063 13.5527 7.91503 13.4787C8.05837 13.4598 8.35637 13.4208 8.64258 13.2585C8.7383 13.2038 8.82647 13.139 8.90474 13.0659C9.02734 12.9505 9.92133 11.7078 9.97225 11.4899C10.0368 11.2118 9.99771 10.8867 9.75818 10.6647C9.19944 10.1475 8.23425 9.63442 7.67833 9.28686'
                      fill='#555555'
                    />
                  </svg>
                </a>
              )}

              {!dashboard ? (
                <div
                  onClick={handleClick}
                  className={styles.get}
                >
                  <FilledButton
                    className={clsx(styles.searchApartments, !isMenuOpened ? styles.closed : '')}
                    variety={isMenuOpened || isMapPage ? 'primary' : 'primary'}
                  >
                    Подобрать квартиру
                  </FilledButton>
                </div>
              ) : (
                <nav className={styles.dashboard_actions}>
                  <ul>
                    <li className={styles.dropdown} onClick={() => setDropDown(!isDropDown)}>
                      <span>Моя информация</span>
                      <ul className={clsx(styles.dropdown_list, isDropDown ? styles.active : '')} ref={ref}>
                        <li>
                          <Link href={'/lk/reservation'}>Бронь</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div onClick={handleClick}>
                        <Link href='/planirovki-i-ceny'>Подобрать квартиру</Link>
                      </div>
                    </li>
                  </ul>
                </nav>
              )}

              {isMenuOpened ? (
                <CancelSVG className={styles.burger} onClick={onMenuClick} />
              ) : (
                <MenuSVG className={styles.burger} onClick={onMenuClick} />
              )}
            </div>
          </div>

          <div className={styles.menu}>
            <MenuBlock closeHandler={closeHandler} title='Недвижимость'>
              <MenuItem text='Квартиры' openable>
                <div onClick={() => setIsMenuOpened(false)}>
                  <MenuItem text='Все квартиры' href='/planirovki-i-ceny' />
                </div>
                <div onClick={() => setIsMenuOpened(false)}>
                  <MenuItem text='Студии' href='/studii' />
                </div>
                <div onClick={() => setIsMenuOpened(false)}>
                  <MenuItem text='Однокомнатные' href='/odnokomnatnye' />
                </div>
                <div onClick={() => setIsMenuOpened(false)}>
                  <MenuItem text='Двухкомнатные' href='/dvuhkomnatnye' />
                </div>
                <div onClick={() => setIsMenuOpened(false)}>
                  <MenuItem text='Трехкомнатные' href='/3-komnatnye' />
                </div>
              </MenuItem>
              <div onClick={() => setIsMenuOpened(false)}>
                <MenuItem text={'Кладовые'} href={'/storerooms'} />
              </div>
              <div onClick={() => setIsMenuOpened(false)}>
                <MenuItem text={'Паркинг'} href={'/parking'}/>
              </div>
            </MenuBlock>

            <MenuBlock closeHandler={closeHandler} title='О проекте'>
              <MenuItem text='О проекте' openable>
                <MenuItem text='О проекте "Кронфорт"' href='/o-proekte' />
                <MenuItem text='"Кронфорт. Центральный"' href='/tsentralnyi' />
              </MenuItem>
              <MenuItem text='Расположение' href='/raspolozhenie' />
              <MenuItem text='Инфраструктура' href='/infrastruktura' />
              <MenuItem text='Благоустройство' href='/blagoustroistvo' />
              <MenuItem text='Архитектура' href='/architektura' />
              <MenuItem text='Виды отделки' href='/otdelka' />
              {/*<MenuItem text='Ход строительства' />*/}
              <MenuItem text='Новости' href='/news' />
            </MenuBlock>

            <MenuBlock closeHandler={closeHandler} title='Информация'>
              <MenuItem text='О застройщике' href='/alkor' />
              <MenuItem text='Способы покупки' href='/payment-methods' />
              <MenuItem text='Ход строительства' href='/gallery' />
              <MenuItem text='Документы' href='/docs' />
              <MenuItem text='Контакты' href='/contacts' />
              <MenuItem text='Служба доверия' href='/feedback' />

              {/*<MenuItem text='FAQ' href='/faq' />*/}
            </MenuBlock>
          </div>
        </div>
      </header>
      {isOpenAuth && <AuthPopup onClose={() => setOpenAuth(false)} />}
      {callBackModal && <Backcall onClose={() => setCallBackModal(false)} />}
    </>
  )
}

export default Header
