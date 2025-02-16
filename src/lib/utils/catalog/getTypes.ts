import {IObj} from '@src/types/object.interface'
export const extractUniqueTypes = (items: IObj[]) => {
  const uniqueTypesSet = new Set<string>()

  items.forEach((item) => {
    if (item.Type) {
      uniqueTypesSet.add(item.Type)
    }
  })

  const uniqueTypesArray = Array.from(uniqueTypesSet).map((type) => ({
    label: type,
    value: type
  }))

  uniqueTypesArray.unshift({label: 'Все квартиры', value: ''})

  return uniqueTypesArray
}
