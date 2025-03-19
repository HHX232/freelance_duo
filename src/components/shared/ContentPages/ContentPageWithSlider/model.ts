import {Coords} from '@src/components/model'

export interface Point {
  type: PointIcon
  title: string
  coords: Coords
}

export type PointIcon = 'compass' | 'sail' | 'wave'
