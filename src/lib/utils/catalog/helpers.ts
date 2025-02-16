import {IObj} from '@src/types/object.interface'

export const matchType = (selectedType: string, itemType: string): boolean => {
  const typeMap: {[key: string]: string[]} = {
    '1 кв.': ['1 кв.', '1 st']
  }

  return selectedType === '' || itemType === selectedType || (typeMap[selectedType]?.includes(itemType) ?? false)
}

interface FilterState {
  selectedType: string
  minSquareValue: number
  maxSquareValue: number
  minFloorValue: number
  maxFloorValue: number
  minPriceValue: number
  maxPriceValue: number
}

export const getFilteredItems = (items: IObj[], state: FilterState) => {
  return items.filter((item) => {
    const itemTypeMatches = matchType(state.selectedType, item.Type)

    const itemSquare = parseFloat(item.Tsquare)
    const itemFloor = parseInt(item.Floor, 10)
    const itemPrice = parseFloat(item.Fvalue)

    return (
      itemTypeMatches &&
      itemSquare >= state.minSquareValue &&
      itemSquare <= state.maxSquareValue &&
      itemFloor >= state.minFloorValue &&
      itemFloor <= state.maxFloorValue &&
      itemPrice >= state.minPriceValue * 1000000 &&
      itemPrice <= state.maxPriceValue * 1000000
    )
  })
}
