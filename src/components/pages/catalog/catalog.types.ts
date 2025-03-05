import {IObj} from '@src/types/object.interface'
import {IFilterInterface, Parametrs} from '@src/types/filters.interface'
import type {DefaultOptionType} from 'antd/es/select'

export interface CatalogPageProps {
  data: IObj[]
  filters_data: IFilterInterface
  id?: string
  param?: string
}
export interface IFiltersState {
  minSquareValue: number
  maxSquareValue: number
  minFloorValue: number
  maxFloorValue: number
  minFrameValue: number
  maxFrameValue: number
  minPriceValue: number
  maxPriceValue: number
  selectedParams: string[]
  currentPage: number
  selectedPlandate: string
}
export interface FilterProps {
  onTypeChange: (value: string) => void
  onPriceMinChange: (value: number) => void
  onPriceMaxChange: (value: number) => void
  onFloorMinChange: (value: number) => void
  onFloorMaxChange: (value: number) => void
  onFrameMinChange: (value: number) => void
  onFrameMaxChange: (value: number) => void
  onSquareMaxChange: (value: number) => void
  onSquareMinChange: (value: number) => void
  resetFilters: () => void
  options: DefaultOptionType[]
  selectedType: string
  minPriceValue: number
  maxPriceValue: number
  minSquareValue: number
  maxSquareValue: number
  minFrameValue: number
  maxFrameValue: number
  maxFloorValue: number
  minFloorValue: number
  selectedPlandate: string
  onPlandateChange: (value: string) => void
  onParamChange: (value: string, checked: boolean) => void
  selectedParams: string[]
  onClose?: () => void
  filters_data: IFilterInterface
  parametrs: Parametrs
}
