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
  ...linkProps
}) => {
  return (
    <Link
      {...linkProps}
      className={cn(styles.linkText, styles[`linkText_${size}`], styles[`linkText_${weight}`], extraClass)}
      style={extraStyle}
    >
      {children}
    </Link>
  )
}

export default LinkUI
