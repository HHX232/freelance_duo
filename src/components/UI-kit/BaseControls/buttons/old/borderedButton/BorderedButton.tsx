import clsx from 'clsx'
import styles from './BorderedButton.module.scss'
import {ButtonHTMLAttributes, FC} from 'react'

const BorderedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, style, ...props}) => {
  return (
    <button {...props} style={style} className={clsx(className, styles.borderedButton)}>
      {children}
    </button>
  )
}

export default BorderedButton
