'use client'
import {FC, PropsWithChildren} from 'react'
import Link from 'next/link'
import cn from 'clsx'
import styles from './LinkUI.module.scss'
import {ILinkUIProps} from './LinkUI.types'

const LinkUI: FC<PropsWithChildren<ILinkUIProps>> = ({
  children,
  size = 'lg',
  weight = 'medium',
  extraClass,
  extraStyle,
  href,
  ...linkProps
}) =>
  href ? (
    <Link
      {...linkProps}
      href={href}
      className={cn(styles.link, styles[`link_${size}`], styles[`link_${weight}`], extraClass)}
      style={extraStyle}
    >
      {children}
    </Link>
  ) : (
    <span
      {...linkProps}
      className={cn(styles.link, styles[`link_${size}`], styles[`link_${weight}`], extraClass)}
      style={extraStyle}
    >
      {children}
    </span>
  )

export default LinkUI
