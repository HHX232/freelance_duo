import {FC, ButtonHTMLAttributes} from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

export const CloseButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} className={clsx(styles.closeButton, props.className)}>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18 6L6 18' stroke='#11627D' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M6 6L18 18' stroke='#11627D' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </button>
  )
}
