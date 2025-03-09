import styles from './Header.module.scss'
import cn from 'clsx'
import {FC, PropsWithChildren} from 'react'
import {ITitleProps} from './Headers.type'

const H4Title: FC<PropsWithChildren<ITitleProps>> = ({children, className, extraStyle}) => {
  return (
    <h4 className={cn(styles.h4Title, className)} style={extraStyle}>
      {children}
    </h4>
  )
}

export default H4Title
