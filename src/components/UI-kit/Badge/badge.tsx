import {Badge as MuiBadge} from '@material-tailwind/react'
import styles from './badge.module.scss'
import {FC} from 'react'
import cn from 'clsx'

type TPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
interface IBadget {
  children?: React.ReactNode
  content: string | number
  placement?: TPlacement
  overlap?: 'circular'
  withBorder?: boolean
  extraClassName?: string
}
export function BadgeDefault({children, content, placement, overlap, withBorder, extraClassName}: IBadget) {
  return (
    <MuiBadge
      className={extraClassName}
      content={content}
      placement={placement}
      overlap={overlap}
      withBorder={withBorder}
    >
      {children}
    </MuiBadge>
  )
}

type TBadgeType = 'default' | 'primary' | 'blue' | 'danger'

interface IBadge {
  value: string | React.ReactNode
  placement?: TPlacement
  extraClassName?: string
  extraBackground?: string
  type?: TBadgeType
}

// !Пример реализации
{
  /* <div style={{marginTop: '15px', position: 'relative', width: 'fit-content'}}>
        <CompareSVG style={{width: '40px', height: '40px'}} className={clsx(styles.icon)} />
        <Badge placement='top-end' value={'6'} />
      </div> */
}

const Badge: FC<IBadge> = ({value, placement = 'top-end', extraClassName, extraBackground, type}) => {
  return (
    <span
      style={{background: extraBackground}}
      className={cn(styles.badge, styles[`badge_${placement}`], styles[`badge_${type}`], extraClassName)}
    >
      {value}
    </span>
  )
}

export default Badge
