import {LinkProps} from 'next/link'
import {AnchorHTMLAttributes, ReactNode} from 'react'

type TLinkSize = 'lg' | 'md' | 'sm' | 'xs'
type TLinkWeight = 'light' | 'regular' | 'medium' | 'bold'

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export interface ILinkUIProps extends Omit<LinkProps, 'href'>, AnchorProps {
  children: ReactNode
  size: TLinkSize
  weight?: TLinkWeight
  href?: string
  extraClass?: string
  extraStyle?: React.CSSProperties
}
