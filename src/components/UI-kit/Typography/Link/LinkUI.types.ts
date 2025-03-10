import {LinkProps} from 'next/link'
import {AnchorHTMLAttributes, ReactNode} from 'react'

type TLinkSize = 'lg' | 'md' | 'sm' | 'xs'
type TLinkWeight = 'light' | 'regular' | 'medium' | 'bold'

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export interface ILinkUIProps extends LinkProps, AnchorProps {
  children: ReactNode
  size: TLinkSize
  weight?: TLinkWeight
  extraClass?: string
  extraStyle?: React.CSSProperties
}
