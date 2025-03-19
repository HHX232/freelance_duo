'use client'
import {useEffect, useState} from 'react'
import styles from './Header.module.scss'
import {IHeaderProps} from './Header.types'
import LogoLink from './components/LogoLink/LogoLink'
import ToggleMenuButton from './components/ToggleMenuButton/ToggleMenuButton'
import LinkWithIconAndCount from './components/LinkWithIconAndCount/LinkWithIconAndCount'
import CompareSVG from '@icons/compare.svg'
import FavoriteSVG from '@icons/favorite.svg'
import clsx from 'clsx'
import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import {useStore} from '@src/lib/store/store'
import DashboardActions from './components/DashboardActions/DashboardActions'
import useRouterNext from '@src/lib/hooks/useRouter'
import {usePathname, useRouter} from 'next/navigation'
import UserSVG from '@icons/user.svg'
import {useIsXl, useIsMd} from '@utils/useIsMobile'
import LogoutButton from './components/LogoutButton/LogoutButton'
import PhoneIconSVG from './components/icons/PhoneIconSVG/PhoneIconSVG'
import HeaderMenuBottom from './components/HeaderMenu/HeaderMenuBottom/HeaderMenuBottom'
import FindApartmentButton from './components/FindApartmentButton/FindApartmentButton'
import TelLink from '@src/components/UI-kit/Text-Elements/TelLink/TelLink'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

export default function Header({dark, dashboard, hideLogo}: IHeaderProps) {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isXl = useIsXl()
  const isMd = useIsMd()

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

  const handleScroll = (): void => setIsScrolled(window.scrollY > 0)

  useEffect(() => {
    window.document.body.style.overflowY = isMenuOpened ? 'hidden' : 'auto'
  }, [isMenuOpened])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
      {/* <div style={{backgroundColor: 'gray', padding: '20px', margin: '20px', width: '300px'}}>
        <InputRangeUI theme='white' />
      </div> */}
      <div className={styles.headerTopContainer}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <LogoLink
              isSmall={hideLogo ? true : (isXl && isScrolled && !isMenuOpened) || (isMd && isMenuOpened)}
              isTransparent={isMd && isMenuOpened}
              isMenuOpened={isMenuOpened}
            />
          </div>
          {isLK && (
            <>
              {token ? (
                <div className={styles.personalCabinetLink}>
                  <FullButton
                    extraClass={styles.buttonTextFont}
                    type={'Link'}
                    href={'/lk'}
                    activeButton={true}
                    border={false}
                    borderColor={''}
                    buttonFill={'none'}
                    buttonElementColor={'black'}
                    buttonText={'Личный кабинет'}
                  />
                </div>
              ) : (
                <div className={styles.personalCabinetLink}>
                  <FullButton
                    extraClass={styles.buttonTextFont}
                    type={'Link'}
                    href={'/lk'}
                    activeButton={true}
                    border={false}
                    borderColor={''}
                    onClick={() => setOpenAuth(!isOpenAuth)}
                    buttonFill={'none'}
                    buttonElementColor={'black'}
                    buttonText={'Личный кабинет'}
                  />
                </div>
              )}

              {token && (
                <div className={styles.logoutButton}>
                  <LogoutButton handleLogout={handleLogout} />
                </div>
              )}
            </>
          )}
          <div className={styles.phoneLink}>
            <TelLink typeDecorNumber={'classic'} extraClass={styles.phone} />
          </div>
          <div className={styles.phoneIcon}>
            <FullButton
              type={'Link'}
              href={'tel:+71231234567'}
              activeButton={true}
              border={false}
              borderColor={''}
              onClick={() => setOpenAuth(!isOpenAuth)}
              buttonFill={'none'}
              buttonElementColor={'black'}
              buttonText={''}
              extraClass={styles.extra_weight}
            >
              <PhoneIconSVG />
            </FullButton>
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
            <FullButton
              extraClass={styles.buttonTextFont}
              type={'Link'}
              href={'/lk'}
              activeButton={true}
              border={false}
              borderColor={''}
              buttonFill={'none'}
              buttonElementColor={'white'}
              buttonText={'Личный кабинет'}
            />
          </div>
          {dashboard && (
            <div className={styles.mobileCompareLink}>
              {token ? (
                <FullButton
                  extraClass={styles.buttonTextFont}
                  type={'Link'}
                  href={'/lk'}
                  activeButton={true}
                  border={false}
                  borderColor={''}
                  buttonFill={'none'}
                  buttonElementColor={'white'}
                  buttonText={'Личный кабинет'}
                >
                  <UserSVG className={styles.user} />
                </FullButton>
              ) : (
                <button type='button' onClick={() => setOpenAuth(!isOpenAuth)}>
                  <UserSVG className={styles.user} />
                </button>
              )}
            </div>
          )}

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
              <div className={styles.mobileFavoriteLink}>
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
      </div>
      <div className={styles.menu}>
        <div className={styles.menu_inner}>
          <HeaderMenu onClose={() => setIsMenuOpened(false)} setIsMenuOpened={setIsMenuOpened} />

          <div className={styles.headerMenuBottom}>
            <HeaderMenuBottom handleFindApartment={handleClick} />
          </div>
        </div>
      </div>
    </header>
  )
}
