import {useEffect} from 'react'
import {useRouter} from 'next/navigation'

interface UseUpdateURLProps {
  isInitialized: boolean
  minSquareValue: number
  maxSquareValue: number
  minFloorValue: number
  maxFloorValue: number
  minFrameValue?: number
  maxFrameValue?: number
  minPriceValue: number
  maxPriceValue: number
  sortOrder?: string
  selectedPlandate: string
  selectedParams: string[]
  searchParams: URLSearchParams
  defaultFilters: {
    minSquareValue: number
    maxSquareValue: number
    minFloorValue: number
    maxFloorValue: number
    minFrameValue?: number
    maxFrameValue?: number
    minPriceValue: number
    maxPriceValue: number
    selectedPlandate: string
  }
  param?: string
  ObjParams: Record<string, string>
}

export const useUpdateURL = ({
  isInitialized,
  minSquareValue,
  maxSquareValue,
  minFloorValue,
  maxFloorValue,
  minFrameValue,
  maxFrameValue,
  minPriceValue,
  maxPriceValue,
  sortOrder,
  selectedPlandate,
  selectedParams,
  searchParams,
  defaultFilters,
  param,
  ObjParams
}: UseUpdateURLProps) => {
  const router = useRouter()

  useEffect(() => {
    if (isInitialized) {
      const params = new URLSearchParams(searchParams) // Сохраняем существующие параметры
      let shouldUpdateURL = false

      // Обновляем URL только с теми значимыми параметрами, которые отличаются от дефолтных
      if (minSquareValue !== defaultFilters.minSquareValue) {
        params.set('minSquareValue', minSquareValue.toString())
        shouldUpdateURL = true
      }
      if (maxSquareValue !== defaultFilters.maxSquareValue) {
        params.set('maxSquareValue', maxSquareValue.toString())
        shouldUpdateURL = true
      }
      if (minFloorValue !== defaultFilters.minFloorValue) {
        params.set('minFloorValue', minFloorValue.toString())
        shouldUpdateURL = true
      }
      if (maxFloorValue !== defaultFilters.maxFloorValue) {
        params.set('maxFloorValue', maxFloorValue.toString())
        shouldUpdateURL = true
      }
      if (minFrameValue !== undefined && minFrameValue !== defaultFilters.minFrameValue) {
        params.set('minFrameValue', minFrameValue.toString())
        shouldUpdateURL = true
      }
      if (maxFrameValue !== undefined && maxFrameValue !== defaultFilters.maxFrameValue) {
        params.set('maxFrameValue', maxFrameValue.toString())
        shouldUpdateURL = true
      }
      if (minPriceValue !== defaultFilters.minPriceValue) {
        params.set('minPriceValue', minPriceValue.toString())
        shouldUpdateURL = true
      }
      if (maxPriceValue !== defaultFilters.maxPriceValue) {
        params.set('maxPriceValue', maxPriceValue.toString())
        shouldUpdateURL = true
      }
      if (sortOrder) {
        params.set('sortOrder', sortOrder)
        shouldUpdateURL = true
      }
      if (selectedPlandate !== defaultFilters.selectedPlandate) {
        params.set('selectedPlandate', selectedPlandate)
        shouldUpdateURL = true
      }

      // Проверяем, соответствует ли текущий param какому-либо значению в ObjParams
      const matchingKey = Object.keys(ObjParams).find((key) => ObjParams[key] === param)

      // Логика работы с selectedParams
      let filteredSelectedParams = [...selectedParams]

      // Если текущий param соответствует значению в ObjParams (например, "Терраса"),
      // исключаем его из selectedParams
      if (matchingKey) {
        filteredSelectedParams = filteredSelectedParams.filter((p) => p !== matchingKey)
      }

      // Если после фильтрации остаются параметры, добавляем их в URL
      if (filteredSelectedParams.length > 0) {
        params.set('selectedParams', filteredSelectedParams.join(','))
        shouldUpdateURL = true
      } else {
        // Удаляем selectedParams, если пусто
        params.delete('selectedParams')
        shouldUpdateURL = true
      }

      // Создаем URLSearchParams только с значимыми параметрами для проверки изменений
      const significantParams = new URLSearchParams()
      const allowedParams = [
        'minSquareValue',
        'maxSquareValue',
        'minFloorValue',
        'maxFloorValue',
        'minFrameValue',
        'maxFrameValue',
        'minPriceValue',
        'maxPriceValue',
        'sortOrder',
        'selectedPlandate',
        'selectedParams'
      ]

      for (const [key, value] of params.entries()) {
        if (allowedParams.includes(key)) {
          significantParams.set(key, value)
        }
      }

      const currentSearchParams = new URLSearchParams(window.location.search)
      const currentSignificantParams = new URLSearchParams()

      for (const [key, value] of currentSearchParams.entries()) {
        if (allowedParams.includes(key)) {
          currentSignificantParams.set(key, value)
        }
      }

      // Обновляем URL, только если есть изменения
      if (shouldUpdateURL && significantParams.toString() !== currentSignificantParams.toString()) {
        router.replace(`${window.location.pathname}?${params.toString()}`)
      }
    }
  }, [
    isInitialized,
    minSquareValue,
    maxSquareValue,
    minFloorValue,
    maxFloorValue,
    minFrameValue,
    maxFrameValue,
    minPriceValue,
    maxPriceValue,
    sortOrder,
    selectedPlandate,
    selectedParams,
    searchParams,
    defaultFilters,
    router,
    param,
    ObjParams
  ])
}
