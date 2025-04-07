import styles from './main-container.module.scss'
import clsx from 'clsx'
export const MainContainer = ({
  children,
  customClassName,
  style,
  itemScope = false,
  itemType = '',
  ...props
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  customClassName?: string
  itemScope?: boolean
  itemType?: string
}) => {
  return (
    <div {...{itemScope, itemType}} className={clsx(styles.container, customClassName)} {...props} style={style}>
      {children}
    </div>
  )
}
