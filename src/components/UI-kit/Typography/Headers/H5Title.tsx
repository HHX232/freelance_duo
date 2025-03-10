import styles from './Header.module.scss'
import cn from 'clsx'
import {FC, PropsWithChildren} from 'react'
import {ITitleProps} from './Headers.type'

const H5Title: FC<PropsWithChildren<ITitleProps>> = ({children, className, extraStyle}) => {
  return (
    <h5 className={cn(styles.h5Title, className)} style={extraStyle}>
      {children}
    </h5>
  )
}

export default H5Title
