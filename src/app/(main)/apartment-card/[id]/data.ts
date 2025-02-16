import {ApartmentCardProps} from '@pages/apartment-card/model'
import {ApartmentCardPageResponse} from './model'

export const parseData = (data: ApartmentCardPageResponse): ApartmentCardProps => {
  const result = <ApartmentCardProps>{}

  if (data.Type) {
    result.type = data.Type
  }

  if (data.Building) {
    result.building = data.Building
  }

  if (data.Tsquare) {
    result.tsquare = data.Tsquare
  }

  if (data.Floor) {
    result.floor = data.Floor
  }

  if (data.Plandate) {
    result.ready = data.Plandate
  }

  if (data.Floor) {
    result.floor = data.Floor
  }

  if (data.Num) {
    result.num = data.Num
  }

  if (data.Fvalue) {
    result.fvalue = data.Fvalue
  }

  if (data.Mvalue) {
    result.mvalue = data.Mvalue
  }

  if (data.Rvalue) {
    result.rvalue = data.Rvalue
  }


  if (data.Fprice) {
    result.fprice = data.Fprice
  }

  if (data.Dvalue) {
    result.dvalue = data.Dvalue
  }

  if (data.attributes) {
    result.attributes = [...data.attributes]
  }

  result.images = []

  if (data.ext_guid) {
    result.ext_guid = data.ext_guid
  }

  if (data.flat_plan) result.images = [...result.images, data.flat_plan]
  if (data.flat_plan_m) result.images = [...result.images, data.flat_plan_m]
  if (data.section_plan) result.images = [...result.images, data.section_plan]
  if (data.floor_plan) result.images = [...result.images, data.floor_plan]

  return result
}
