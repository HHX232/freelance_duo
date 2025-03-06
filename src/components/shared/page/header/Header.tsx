'use client'
import {useEffect, useState} from 'react'
import styles from './Header.module.scss'
import {IHeaderProps} from './Header.types'
import LogoLink from './components/LogoLink/LogoLink'
import ToggleMenuButton from './components/ToggleMenuButton/ToggleMenuButton'
import FindApartmentButton from './components/FindApartmentButton/FindApartmentButton'
import LinkWithIconAndCount from './components/LinkWithIconAndCount/LinkWithIconAndCount'
import CompareSVG from '@icons/compare.svg'
import FavoriteSVG from '@icons/favorite.svg'
import PhoneSVG from '@icons/phone.svg'
import clsx from 'clsx'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import TextLink from './components/TextLink/TextLink'
import {useStore} from '@src/lib/store/store'
import DashboardActions from './components/DashboardActions/DashboardActions'
import useRouterNext from '@src/lib/hooks/useRouter'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import UserSVG from '@icons/user.svg'
import {useIsXl, useIsSm} from '@utils/useIsMobile'

export default function Header({dark, dashboard}: IHeaderProps) {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isXl = useIsXl()
  const isSm = useIsSm()

  const {favorites, compare} = useStore()
  const {token, clearToken} = useStore()

  const router = useRouter()
  const {replace} = useRouterNext()
  const pathname = usePathname()

  const [isOpenAuth, setOpenAuth] = useState(false)
  const [isLK, setLK] = useState(false)

  const [favoritesCount, setFavoritesCount] = useState(0)
  const [compareCount, setCompareCount] = useState(0)
  const [isLoadingCount, setIsLoadingCount] = useState(true)

  const handleClick = (): void => {
    setIsMenuOpened(false)
    replace({
      pathname: '/planirovki-i-ceny',
      query: {}
    })
  }

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  useEffect(() => {
    if (favorites) {
      setFavoritesCount(favorites.length)
    }

    if (compare) {
      setCompareCount(compare.length)
    }

    setIsLoadingCount(false)
  }, [favorites, compare])

  useEffect(() => {
    setLK(true)
  }, [token])

  useEffect(() => {
    console.log('CLOSE MENU')
    setIsMenuOpened(false)
  }, [router, pathname])

  const handleLogout = () => {
    clearToken()
    if (pathname.startsWith('/lk')) {
      router.push('/')
    }
  }

  return (
    <header
      className={clsx(styles.header, {[styles.dark]: dark}, isMenuOpened ? `${styles.menuOpened} no-scroll` : '')}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <LogoLink
            isSmall={(isXl && isScrolled && !isMenuOpened) || (isSm && isMenuOpened)}
            isTransparent={isSm && isMenuOpened}
            isMenuOpened={isMenuOpened}
          />
        </div>

        {isLK && (
          <>
            {token ? (
              <div className={styles.personalCabinetLink}>
                <TextLink href={'/lk'} title='Личный кабинет' />
              </div>
            ) : (
              <div className={styles.personalCabinetLink}>
                <TextLink onClick={() => setOpenAuth(!isOpenAuth)} href={'/lk'} title='Личный кабинет' />
              </div>
            )}

            {token && (
              <button type='button' onClick={handleLogout}>
                <svg width='12' height='12' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
        <div className={styles.phoneLink}>
          <TextLink href={'tel:+71231234567'} title='+ 7 (123) 123-45-67' />
        </div>
        <div className={styles.phoneIcon}>
          <Link href={'tel:+71231234567'}>
            <PhoneSVG />
          </Link>
        </div>
        {!isLoadingCount && (
          <>
            <div className={styles.compareLink}>
              <LinkWithIconAndCount
                href={dashboard ? '/lk/sravnenie' : '/sravnenie'}
                isMenuOpened={isMenuOpened}
                count={compareCount}
              >
                <CompareSVG className={clsx(styles.icon)} />
              </LinkWithIconAndCount>
            </div>
            <div className={styles.favoriteLink}>
              <LinkWithIconAndCount
                href={dashboard ? '/lk/izbrannoe' : '/izbrannoe'}
                isMenuOpened={isMenuOpened}
                count={favoritesCount}
              >
                <FavoriteSVG className={clsx(styles.icon)} />
              </LinkWithIconAndCount>
            </div>
          </>
        )}
        <div className={clsx(styles.findApartment, isLoadingCount ? styles.alignRight : '')}>
          {dashboard ? <DashboardActions onClick={handleClick} /> : <FindApartmentButton onClick={handleClick} />}
        </div>
        <div className={styles.toggleMenuButton}>
          <ToggleMenuButton isMenuOpened={isMenuOpened} onClick={() => setIsMenuOpened((prev) => !prev)} />
        </div>
      </div>

      <div className={styles.mobileMenu}>
        <div className={styles.mobilePersonalCabinetLink}>
          <TextLink href={'/lk'} title='Личный кабинет' />
        </div>
        <div className={styles.mobileCompareLink}>
          {token ? (
            <Link href={'/lk'}>
              <UserSVG className={styles.user} />
            </Link>
          ) : (
            <button type='button' onClick={() => setOpenAuth(!isOpenAuth)}>
              <UserSVG className={styles.user} />
            </button>
          )}
        </div>
        {!isLoadingCount && (
          <>
            <div className={styles.mobileCompareLink}>
              <LinkWithIconAndCount
                href={dashboard ? '/lk/sravnenie' : '/sravnenie'}
                isMenuOpened={isMenuOpened}
                count={compareCount}
              >
                <CompareSVG className={clsx(styles.icon)} />
              </LinkWithIconAndCount>
            </div>
            <div className={styles.mobielFavoriteLink}>
              <LinkWithIconAndCount
                href={dashboard ? '/lk/izbrannoe' : '/izbrannoe'}
                isMenuOpened={isMenuOpened}
                count={favoritesCount}
              >
                <FavoriteSVG className={clsx(styles.icon)} />
              </LinkWithIconAndCount>
            </div>
          </>
        )}
      </div>

      <div className={styles.menu}>
        <HeaderMenu onClose={() => setIsMenuOpened(false)} setIsMenuOpened={setIsMenuOpened} />
      </div>
    </header>
  )
}
