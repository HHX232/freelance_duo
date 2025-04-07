import {HTMLAttributes, ReactNode} from 'react'

export interface ILinkWithIconAndCountProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  href: string
  count: number
  isMenuOpened: boolean
  style?: React.CSSProperties | undefined
  children: ReactNode
}
