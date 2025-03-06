import {IObj} from '@src/types/object.interface'
import {useMemo} from 'react'

interface UseFilteredAndSortedItemsProps {
  items: IObj[]
  selectedType: string
  selectedPlandate: string
  selectedParams: string[]
  minSquareValue: number
  maxSquareValue: number
  minFloorValue: number
  maxFloorValue: number
  minPriceValue: number
  maxPriceValue: number
  sortOrder: string
  matchType: (selectedType: string, itemType: string) => boolean
  sortItems: (items: IObj[], sortOrder: string) => IObj[]
}

const useFilteredAndSortedItems = ({
  items,
  selectedType,
  selectedPlandate,
  selectedParams,
  minSquareValue,
  maxSquareValue,
  minFloorValue,
  maxFloorValue,
  minPriceValue,
  maxPriceValue,
  sortOrder,
  matchType,
  sortItems
}: UseFilteredAndSortedItemsProps): IObj[] => {
  return useMemo(() => {
    const filtered = items.filter((item) => {
      const itemTypeMatches = selectedType ? matchType(selectedType.toLowerCase(), item.Type.toLowerCase()) : true
      const itemPlandateMatches = selectedPlandate ? item.Plandate === selectedPlandate : true

      const itemParamsMatch = (selectedParams || []).every((param) =>
        item.attributes.some((attribute) => attribute.toLowerCase().trim() === param.toLowerCase().trim())
      )

      const squareMatches = parseFloat(item.Tsquare) >= minSquareValue && parseFloat(item.Tsquare) <= maxSquareValue

      const floorMatches = parseInt(item.Floor, 10) >= minFloorValue && parseInt(item.Floor, 10) <= maxFloorValue

      const priceMatches =
        parseFloat(item.Fvalue) >= minPriceValue * 1000000 && parseFloat(item.Fvalue) <= maxPriceValue * 1000000

      return itemTypeMatches && itemPlandateMatches && itemParamsMatch && squareMatches && floorMatches && priceMatches
    })

    return sortItems(filtered, sortOrder)
  }, [
    items,
    selectedType,
    selectedPlandate,
    selectedParams,
    minSquareValue,
    maxSquareValue,
    minFloorValue,
    maxFloorValue,
    minPriceValue,
    maxPriceValue,
    sortOrder,
    matchType,
    sortItems
  ])
}

export default useFilteredAndSortedItems
