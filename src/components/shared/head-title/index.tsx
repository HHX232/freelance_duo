import classes from './index.module.scss'
import {ButtonHTMLAttributes, FC} from 'react'
import clsx from 'clsx'

export const HeadTitle: FC<ButtonHTMLAttributes<HTMLHeadingElement>> = ({children, ...props}) => {
  return (
    <h1 {...props} className={clsx(classes.headTitle, props.className)}>
      {children}
    </h1>
  )
}
