import {Coords} from '@src/components/model'
import {MouseEventHandler} from 'react'

export interface CompassProps {
  name: string
  text?: string
  color: string
  coords: Coords
  isMobile?: boolean
  onEnterCompass?: MouseEventHandler<HTMLDivElement>
  onLeaveCompass?: MouseEventHandler<HTMLDivElement>
  onClickCompass?: MouseEventHandler<SVGElement>
}
