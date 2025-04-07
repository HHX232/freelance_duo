import {LinkProps} from 'next/link'
import {AnchorHTMLAttributes} from 'react'

export type TTypeDecorNumber = 'dashed' | 'monolite' | 'spaces' | 'classic'
type TLinkSize = 'lg' | 'md' | 'sm' | 'xs'
interface ITelLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'size'>,
    Omit<LinkProps, 'href' | 'size'> {
  customNumber?: string
  customHref?: string
  extraClass?: string
  extraStyle?: React.CSSProperties
  children?: React.ReactNode
  hideDefaultNumber?: boolean
  typeDecorNumber?: TTypeDecorNumber
  linkSize?: TLinkSize
}
export default ITelLinkProps
