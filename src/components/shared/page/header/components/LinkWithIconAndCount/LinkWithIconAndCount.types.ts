import {ReactNode} from 'react'

export interface ILinkWithIconAndCountProps {
  href: string
  count: number
  isMenuOpened: boolean
  style?: React.CSSProperties | undefined
  children: ReactNode
}
