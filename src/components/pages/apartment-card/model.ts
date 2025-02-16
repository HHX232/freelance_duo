import {IAllow} from '@src/types/reservation.interface'

export interface ApartmentCardProps {
  type: string
  tsquare: string
  floor: string
  fvalue: string
  mvalue: string
  fprice: string
  dvalue: string
  rvalue: string
  attributes: string[]
  images: string[]
  id: string
  ext_guid: string
  num: string
  ready: string
  params?: string
  building?: string
  isAllow: IAllow
  pdf?: string
}
