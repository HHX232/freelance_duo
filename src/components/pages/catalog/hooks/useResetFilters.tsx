import {useCallback} from 'react'
import {useRouter} from 'next/navigation'
import {getMinMaxFloor} from '@src/lib/utils/catalog/getMinMaxFloor'
import {DefaultOptionType} from 'antd/es/select'

interface UseResetFiltersProps {
  items: any[] // Замените на конкретный тип
  options: DefaultOptionType[]
  filters_data: {
    flats_square: {min: number; max: number}
    flats_price: {min: number; max: number}
  }
  setMinSquareValue: (value: number) => void
  setMaxSquareValue: (value: number) => void
  setMinFloorValue: (value: number) => void
  setMaxFloorValue: (value: number) => void
  setMinFrameValue: (value: number) => void
  setMaxFrameValue: (value: number) => void
  setMinPriceValue: (value: number) => void
  setMaxPriceValue: (value: number) => void
  setSelectedType: (value: string) => void
  setSelectedParams: (value: string[]) => void
  setSelectedPlandate: (value: string) => void
  setFilters: (filters: any) => void // Замените на конкретный тип
  setSortOrder: (value: string) => void
  selectedType?: string
}

export const useResetFilters = ({
  items,
  options,
  filters_data,
  setMinSquareValue,
  setMaxSquareValue,
  setMinFloorValue,
  setMaxFloorValue,
  setMinFrameValue,
  setMaxFrameValue,
  setMinPriceValue,
  setMaxPriceValue,
  setSelectedType,
  setSelectedParams,
  setSelectedPlandate,
  setFilters,
  setSortOrder,
  selectedType
}: UseResetFiltersProps) => {
  const router = useRouter()

  const resetFilters = useCallback(() => {
    if (items && items.length > 0) {
      const {minFloor, maxFloor} = getMinMaxFloor(items)
      const newFilters = {
        minSquareValue: Math.floor(filters_data.flats_square.min),
        maxSquareValue: Math.ceil(filters_data.flats_square.max),
        minFloorValue: minFloor,
        maxFloorValue: maxFloor,
        minFrameValue: 1,
        maxFrameValue: 5,
        minPriceValue: Math.floor(filters_data.flats_price.min / 1000000),
        maxPriceValue: Math.ceil(filters_data.flats_price.max / 1000000),
        selectedType: options.length > 0 && typeof options[0].value === 'string' ? options[0].value : '',
        currentPage: 1,
        selectedParams: [],
        sortOrder: '',
        selectedPlandate: ''
      }

      setMinSquareValue(newFilters.minSquareValue)
      setMaxSquareValue(newFilters.maxSquareValue)
      setMinFloorValue(newFilters.minFloorValue)
      setMaxFloorValue(newFilters.maxFloorValue)
      setMinFrameValue(newFilters.minFrameValue)
      setMaxFrameValue(newFilters.maxFrameValue)
      setMinPriceValue(newFilters.minPriceValue)
      setMaxPriceValue(newFilters.maxPriceValue)
      setSelectedType(newFilters.selectedType)
      setSelectedParams([])
      setSelectedPlandate('')
      setFilters({...newFilters})
      setSortOrder(newFilters.sortOrder)

      const params = new URLSearchParams()
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            params.set(key, value.join(','))
          } else {
            params.set(key, value.toString())
          }
        }
      })

      if (!selectedType) {
        // router.replace(`/planirovki-i-ceny`);
      } else {
        // router.replace(`/planirovki-i-ceny/${selectedType}`);
      }
    }
  }, [
    items,
    options,
    filters_data,
    setMinSquareValue,
    setMaxSquareValue,
    setMinFloorValue,
    setMaxFloorValue,
    setMinFrameValue,
    setMaxFrameValue,
    setMinPriceValue,
    setMaxPriceValue,
    setSelectedType,
    setSelectedParams,
    setSelectedPlandate,
    setFilters,
    setSortOrder,
    selectedType,
    router
  ])

  return resetFilters
}
