export type TTypeDecorNumber = 'dashed' | 'monolite' | 'spaces' | 'classic'
type TLinkSize = 'lg' | 'md' | 'sm' | 'xs'
interface ITelLinkProps {
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
