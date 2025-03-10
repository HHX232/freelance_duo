import styles from './Header.module.scss'
import cn from 'clsx'
import {FC, PropsWithChildren} from 'react'
import {ITitleProps} from './Headers.type'

const H3Title: FC<PropsWithChildren<ITitleProps>> = ({children, className, extraStyle}) => {
  return (
    <h3 className={cn(styles.h3Title, className)} style={extraStyle}>
      {children}
    </h3>
  )
}

export default H3Title
