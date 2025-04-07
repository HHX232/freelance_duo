import styles from './Header.module.scss'
import cn from 'clsx'
import {FC, PropsWithChildren} from 'react'
import {ITitleProps} from './Headers.type'

const H2Title: FC<PropsWithChildren<ITitleProps>> = ({children, className, extraStyle, extraClass}) => {
  return (
    <h2 className={cn(styles.h2Title, className, extraClass)} style={extraStyle}>
      {children}
    </h2>
  )
}

export default H2Title
