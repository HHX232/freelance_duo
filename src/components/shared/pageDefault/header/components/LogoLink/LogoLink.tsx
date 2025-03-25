'use client'
import styles from './LogoLink.module.scss'
import Link from 'next/link'
import LogoSVG from '@icons/logo.svg'
import LogoLgSVG from '@icons/logo-lg.svg'
import {ILogoLinkProps} from './LogoLink.types'
import clsx from 'clsx'
import {useWindowWidth} from '../HeaderMenu/hooks/useWindowWidth'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function LogoLink({isMenuOpened, isSmall, isTransparent}: ILogoLinkProps) {
  const windowWidth = useWindowWidth()
  const pathname = usePathname()

  const [isLogoSmall, setIsLogoSmall] = useState<boolean>(false)
  const [isNotHomePage, setIsNotHomePage] = useState<boolean>(false)

  const handleScroll = (): void => setIsLogoSmall(window.scrollY > 0)

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
    setIsNotHomePage(!!(pathname !== '/' && windowWidth && windowWidth < 1280))
  }, [windowWidth, pathname])

  return (
    <div
      className={clsx(styles.logoLink, isMenuOpened ? styles.menuOpened : '', isTransparent ? styles.transparent : '')}
    >
      {isSmall || isLogoSmall || isNotHomePage ? (
        <Link className={clsx(styles.icon, styles.small)} href={'/'}>
          <LogoLgSVG />
        </Link>
      ) : (
        <Link className={styles.icon} href={'/'}>
          <LogoSVG />
        </Link>
      )}
    </div>
  )
}
