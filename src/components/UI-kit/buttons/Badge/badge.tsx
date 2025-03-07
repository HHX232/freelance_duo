import {Badge} from '@material-tailwind/react'
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
    <Badge className={extraClassName} content={content} placement={placement} overlap={overlap} withBorder={withBorder}>
      {children}
    </Badge>
  )
}
