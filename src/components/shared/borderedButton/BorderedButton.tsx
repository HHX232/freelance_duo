import clsx from 'clsx'
import styles from './BorderedButton.module.scss'
import { CSSProperties } from 'react'

interface BorderedButtonProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
}

export default function BorderedButton({ children, className, style }: BorderedButtonProps) {
  return (
    <button style={style} className={clsx(className, styles.borderedButton)}>
      {children}
    </button>
  )
}
