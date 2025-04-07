import {CSSProperties} from '@ant-design/cssinjs/lib/hooks/useStyleRegister'
import {Coords} from '@src/components/model'
import {MouseEventHandler, ReactElement} from 'react'

export interface CompassProps {
  className?: string
  name: string
  text?: string
  color: string
  coords: Coords
  isMobile?: boolean
  onEnterCompass?: MouseEventHandler<HTMLDivElement>
  onLeaveCompass?: MouseEventHandler<HTMLDivElement>
  onClickCompass?: MouseEventHandler<SVGElement>
  coords_mob?: Coords
  link?: {
    title: string
    href: string
  }
  disablePopup?: boolean
  id?: string

  CustomStar?: (className?: string) => ReactElement | null
}

export interface CardProps {
  name: string
  text?: string
  color: string
  coords?: Coords
  onEnterCard?: MouseEventHandler<HTMLDivElement> | undefined
  onLeaveCard?: MouseEventHandler<HTMLDivElement> | undefined
  onClickCloseCard?: MouseEventHandler<SVGElement> | undefined
  isVisible: boolean
  style?: CSSProperties
  coords_mob?: Coords
  disablePopup?: boolean
}
