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
import {useIsMd} from '@utils/useIsMobile'
import LogoutButton from './components/LogoutButton/LogoutButton'
import PhoneIconSVG from './components/icons/PhoneIconSVG/PhoneIconSVG'
import HeaderMenuBottom from './components/HeaderMenu/HeaderMenuBottom/HeaderMenuBottom'
import FindApartmentButton from './components/FindApartmentButton/FindApartmentButton'

import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import TelLink from '@src/components/UI-kit/Navigation/TelLink/TelLink'

export default function Header({dark, dashboard, hideLogo}: IHeaderProps) {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

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
      itemScope
      itemType='https://schema.org/WPHeader'
    >
      <div className={styles.headerTopContainer}>
        <div className={styles.container}>
          {/* Логотип с разметкой организации */}
          <div className={styles.logo} itemScope itemType='https://schema.org/Organization' itemProp='publisher'>
            <LogoLink
              isSmall={hideLogo ? true : isMd && isMenuOpened}
              isTransparent={isMd && isMenuOpened}
              isMenuOpened={isMenuOpened}
              itemProp='logo'
            />
            <meta itemProp='name' content='Кронфорт' />
            <meta itemProp='url' content='https://вашсайт.ru' />
          </div>

          {isLK && (
            <>
              {token ? (
                <div
                  className={styles.personalCabinetLink}
                  itemScope
                  itemType='https://schema.org/Person'
                  itemProp='account'
                >
                  <FullButton
                    extraClass={styles.buttonTextFont}
                    type={'Link'}
                    href={'/lk'}
                    activeButton={true}
                    border={false}
                    borderColor={'none'}
                    buttonFill={'none'}
                    buttonElementColor={'black'}
                    buttonText={'Личный кабинет'}
                    itemProp='url'
                  />
                  <meta itemProp='name' content='Личный кабинет' />
                </div>
              ) : (
                <div className={styles.personalCabinetLink}>
                  <FullButton
                    extraClass={styles.buttonTextFont}
                    type={'Link'}
                    href={'/lk'}
                    activeButton={true}
                    border={false}
                    borderColor={'none'}
                    onClick={() => setOpenAuth(!isOpenAuth)}
                    buttonFill={'none'}
                    buttonElementColor={'black'}
                    buttonText={'Личный кабинет'}
                    itemProp='potentialAction'
                    itemType='https://schema.org/AuthenticateAction'
                  />
                </div>
              )}

              {token && (
                <div className={styles.logoutButton}>
                  <LogoutButton
                    handleLogout={handleLogout}
                    itemProp='potentialAction'
                    itemType='https://schema.org/LogoutAction'
                  />
                </div>
              )}
            </>
          )}

          {/* Контактная информация */}
          <div className={styles.phoneLink} itemScope itemType='https://schema.org/ContactPoint'>
            <TelLink typeDecorNumber={'classic'} extraClass={styles.phone} itemProp='telephone' />
            <meta itemProp='contactType' content='customer service' />
          </div>

          <div className={styles.phoneIcon}>
            <FullButton
              type={'Link'}
              href={'tel:+71231234567'}
              activeButton={true}
              border={false}
              borderColor={'none'}
              onClick={() => setOpenAuth(!isOpenAuth)}
              buttonFill={'none'}
              buttonElementColor={'black'}
              buttonText={''}
              extraClass={styles.extra_weight}
              itemProp='telephone'
            >
              <PhoneIconSVG />
            </FullButton>
          </div>

          {!isLoadingCount && (
            <>
              <div
                className={styles.compareLink}
                itemProp='potentialAction'
                itemType='https://schema.org/CompareAction'
              >
                <LinkWithIconAndCount
                  href={dashboard ? '/lk/sravnenie' : '/sravnenie'}
                  isMenuOpened={isMenuOpened}
                  count={compareCount}
                  itemProp='url'
                >
                  <CompareSVG className={clsx(styles.icon)} />
                </LinkWithIconAndCount>
              </div>
              <div className={styles.favoriteLink} itemProp='potentialAction' itemType='https://schema.org/SaveAction'>
                <LinkWithIconAndCount
                  href={dashboard ? '/lk/izbrannoe' : '/izbrannoe'}
                  isMenuOpened={isMenuOpened}
                  count={favoritesCount}
                  itemProp='url'
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
            <ToggleMenuButton
              isMenuOpened={isMenuOpened}
              onClick={() => setIsMenuOpened((prev) => !prev)}
              aria-label={isMenuOpened ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpened}
            />
          </div>
        </div>

        {/* Мобильное меню */}
        <div className={styles.mobileMenu}>
          <div
            className={styles.mobilePersonalCabinetLink}
            itemScope
            itemType='https://schema.org/Person'
            itemProp='account'
          >
            <FullButton
              extraClass={styles.buttonTextFont}
              type={'Link'}
              href={'/lk'}
              activeButton={true}
              border={false}
              borderColor={'none'}
              buttonFill={'none'}
              buttonElementColor={'white'}
              buttonText={'Личный кабинет'}
              itemProp='url'
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
                  borderColor={'none'}
                  buttonFill={'none'}
                  buttonElementColor={'white'}
                  buttonText={'Личный кабинет'}
                  itemProp='url'
                >
                  <UserSVG className={styles.user} />
                </FullButton>
              ) : (
                <button
                  type='button'
                  onClick={() => setOpenAuth(!isOpenAuth)}
                  itemProp='potentialAction'
                  itemType='https://schema.org/AuthenticateAction'
                >
                  <UserSVG className={styles.user} />
                </button>
              )}
            </div>
          )}

          {!isLoadingCount && (
            <>
              <div
                className={styles.mobileCompareLink}
                itemProp='potentialAction'
                itemType='https://schema.org/CompareAction'
              >
                <LinkWithIconAndCount
                  href={dashboard ? '/lk/sravnenie' : '/sravnenie'}
                  isMenuOpened={isMenuOpened}
                  count={compareCount}
                  itemProp='url'
                >
                  <CompareSVG className={clsx(styles.icon)} />
                </LinkWithIconAndCount>
              </div>
              <div
                className={styles.mobileFavoriteLink}
                itemProp='potentialAction'
                itemType='https://schema.org/SaveAction'
              >
                <LinkWithIconAndCount
                  href={dashboard ? '/lk/izbrannoe' : '/izbrannoe'}
                  isMenuOpened={isMenuOpened}
                  count={favoritesCount}
                  itemProp='url'
                >
                  <FavoriteSVG className={clsx(styles.icon)} />
                </LinkWithIconAndCount>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Основное меню навигации */}
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
