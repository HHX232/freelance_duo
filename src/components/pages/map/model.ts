import { Coords } from '@src/components/model'
import { ReactNode } from 'react'

export interface Point {
  name: string
  text?: string
  color: string
  coords: Coords
}

export interface PinType {
  name: string
  coords: Coords
  coords_mob?: Coords
  coords_high?: Coords
  onClick?: () => void
  isActive?: boolean
}

export interface DirectionHint {
  name: string
  coords: Coords
  icon?: ReactNode
}