'use client'
import clsx from 'clsx'
import styles from './IconWithCount.module.scss'

interface IconWithCountProps {
  count?: number
  children: React.ReactNode
  doShowWhenZero?: boolean
  color?: 'accent' | 'brown'
  hw?: [number, number]
  position?: [number, number, number, number]
}

const IconWithCount = ({
  count,
  doShowWhenZero = true,
  hw,
  position,
  children,
  color = 'accent'
}: IconWithCountProps) => {
  return (
    <div className={clsx(styles.icon, color === 'brown' ? styles.brown : '')}>
      {(doShowWhenZero || !count) && (
        <span
          style={{
            height: hw?.[0],
            width: hw?.[1],
            top: position?.[0],
            right: position?.[1],
            bottom: position?.[2],
            left: position?.[3]
          }}
        >
          {count}
        </span>
      )}
      {children}
    </div>
  )
}

export default IconWithCount
