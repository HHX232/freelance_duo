import clsx from 'clsx'
import styles from './FilledButton.module.scss'
import {HtmlHTMLAttributes} from 'react'

interface FilledButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  type?: 'submit' | 'button'
  variety?: 'primary' | 'secondary' | 'without-bg' | 'white'
}

export default function FilledButton({children, className, type, variety = 'primary', ...rest}: FilledButtonProps) {
  return (
    <button
      type={type || 'button'}
      className={clsx(className, styles.filledButton, styles[`${variety}-btn`])}
      {...rest}
    >
      {children}
    </button>
  )
}
