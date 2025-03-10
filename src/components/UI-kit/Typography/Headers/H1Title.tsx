import {FC, PropsWithChildren} from 'react'
import styles from './Header.module.scss'
import cn from 'clsx'
import {ITitleProps} from './Headers.type'

const H1Title: FC<PropsWithChildren<ITitleProps>> = ({children, className, extraStyle}) => {
  return (
    <h1 className={cn(styles.h1Title, className)} style={extraStyle}>
      {children}
    </h1>
  )
}

export default H1Title
