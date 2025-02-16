import styles from './main-container.module.scss'
import clsx from 'clsx'
export const MainContainer = ({
  children,
  customClassName,
  style,
  ...props
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  customClassName?: string
}) => {
  return (
    <div className={clsx(styles.container, customClassName)} {...props} style={style}>
      {children}
    </div>
  )
}
