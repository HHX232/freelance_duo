import {Coords, Size} from '@src/components/model'
import {PointIcon} from '../model'

export interface CardProps {
  type: PointIcon
  title: string
  coords: Coords
  size: Size
}
