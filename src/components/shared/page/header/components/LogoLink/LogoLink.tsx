'use client'
import styles from './LogoLink.module.scss'
import Link from 'next/link'
import LogoSVG from '@icons/logo.svg'
import LogoLgSVG from '@icons/logo-lg.svg'
import {ILogoLinkProps} from './LogoLink.types'
import clsx from 'clsx'
import {useWindowWidth} from '../HeaderMenu/hooks/useWindowWidth'
import {usePathname} from 'next/navigation'

export default function LogoLink({isMenuOpened, isSmall, isTransparent}: ILogoLinkProps) {
  const windowWidth = useWindowWidth()
  const pathname = usePathname()

  const isNotHomePageAndSmallScreen = pathname !== '/' && windowWidth && windowWidth < 1280

  return (
    <div
      className={clsx(styles.logoLink, isMenuOpened ? styles.menuOpened : '', isTransparent ? styles.transparent : '')}
    >
      {isSmall || isNotHomePageAndSmallScreen ? (
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
