import styles from './LogoLink.module.scss'
import Link from 'next/link'
import LogoSVG from '@icons/logo.svg'
import LogoLgSVG from '@icons/logo-lg.svg'
import {ILogoLinkProps} from './LogoLink.types'
import clsx from 'clsx'

export default function LogoLink({isMenuOpened}: ILogoLinkProps) {
  return (
    <div className={clsx(styles.logoLink, isMenuOpened ? styles.menuOpened : '')}>
      <Link className={styles.icon} href={'/'}>
        <LogoSVG />
      </Link>
      <Link className={styles.lg} href={'/'}>
        <LogoLgSVG />
      </Link>
    </div>
  )
}
