import styles from './LogoLink.module.scss'
import Link from 'next/link'
import LogoSVG from '@icons/logo.svg'
import LogoLgSVG from '@icons/logo-lg.svg'
import {ILogoLinkProps} from './LogoLink.types'
import clsx from 'clsx'

export default function LogoLink({isMenuOpened, isSmall, isTransparent}: ILogoLinkProps) {
  return (
    <div
      className={clsx(styles.logoLink, isMenuOpened ? styles.menuOpened : '', isTransparent ? styles.transparent : '')}
    >
      {isSmall ? (
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
