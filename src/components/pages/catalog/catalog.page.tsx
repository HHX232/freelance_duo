'use client'
import styles from './catalog.module.scss'
import {Col, Row, ConfigProvider, Select, Tabs, DrawerProps, Drawer} from 'antd'
import Card from '@shared/Cards/card/Card'
import {Suspense, useCallback, useEffect, useMemo, useState} from 'react'
import type {DefaultOptionType} from 'antd/es/select'
import {ItemLoader} from '@src/components/ItemLoader/ItemLoader'
import RefreshIcon from '@icon/refresh.svg'
import {tabs} from '@src/components/UI-kit/BaseControls/old/tabs/tabs'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import DropdownIcon from '@icons/dropdown_arrow.svg'
import {IObj} from '@src/types/object.interface'
import {matchType} from '@src/lib/utils/catalog/matchType'
import {useIsTablet} from '@utils/useIsMobile'
import {usePathname, useRouter} from 'next/navigation'
import {useSearchParams} from 'next/navigation'
import {transliterate} from '@utils/transliterate'
import {CatalogPageProps, FilterProps, IFiltersState} from './catalog.types'
import {useUpdateURL} from './hooks/useUpdateURL'
import {useResetFilters} from './hooks/useResetFilters'
import useFilteredAndSortedItems from './hooks/useFilteredAndSortedItems'
import RangeFilter from '@src/components/UI-kit/BaseControls/inputs/RangeFilter/RangeFilter'
import {ExtraOptions} from '@src/components/UI-kit/BaseControls/inputs/extra-options/extra-options'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

const onChange = (key: string) => {
  console.log(key)
}

const ObjParams: Record<string, string> = {
  Терраса: 'kvartiry-s-terrasoi',
  'с балконом': 'kvartiry-s-balkonom',
  Кладовая: 'kvartiry-s-kladovoi',
  'Раздельный СУ': 'kvartiry-s-razdelnym-su',
  Лоджия: 'kvartiry-s-lodzhiei',
  'Гардеробная в спальне': 'kvartiry-s-garderobnoi',
  Лофт: 'lofty'
}

const CatalogPage = ({data, filters_data, id, param}: CatalogPageProps) => {
  const items: IObj[] = data
  const router = useRouter()
  const searchParams = useSearchParams()

  const transformFlatTypes = (flatsTypes: string[]) => {
    const transformedArray = flatsTypes.map((type) => ({
      label: type,
      value: type
    }))

    transformedArray.unshift({label: 'Все квартиры', value: ''})

    return transformedArray
  }

  const options: DefaultOptionType[] = transformFlatTypes(filters_data.flats_types)

  const defaultFilters = {
    minSquareValue: Math.floor(filters_data.flats_square.min),
    maxSquareValue: Math.ceil(filters_data.flats_square.max),
    minFloorValue: 1,
    maxFloorValue: 4,
    minFrameValue: 1,
    maxFrameValue: 5,
    minPriceValue: Math.floor(filters_data.flats_price.min / 1000000),
    maxPriceValue: Math.ceil(filters_data.flats_price.max / 1000000),
    selectedParams: [],
    currentPage: 1,
    selectedPlandate: ''
  }

  const [minSquareValue, setMinSquareValue] = useState<number>(defaultFilters.minSquareValue)
  const [maxSquareValue, setMaxSquareValue] = useState<number>(defaultFilters.maxSquareValue)
  const [minFloorValue, setMinFloorValue] = useState<number>(defaultFilters.minFloorValue)
  const [maxFloorValue, setMaxFloorValue] = useState<number>(defaultFilters.maxFloorValue)
  const [minFrameValue, setMinFrameValue] = useState<number>(defaultFilters.minFrameValue)
  const [maxFrameValue, setMaxFrameValue] = useState<number>(defaultFilters.maxFrameValue)
  const [minPriceValue, setMinPriceValue] = useState<number>(defaultFilters.minPriceValue)
  const [maxPriceValue, setMaxPriceValue] = useState<number>(defaultFilters.maxPriceValue)

  const idToTypeMap: {[key: string]: string} = {
    odnokomnatnye: '1-комнатная',
    dvuhkomnatnye: '2-комнатная',
    '3-komnatnye': '3-комнатная',
    studii: 'Студия',
    'planirovki-i-ceny': ''
  }

  const [selectedType, setSelectedType] = useState<string>('')

  //const [selectedType, setSelectedType] = useState<string>(id ? reverseTransliterate(id) : '')
  const [sortOrder, setSortOrder] = useState<string>('')
  const [selectedPlandate, setSelectedPlandate] = useState<string>(defaultFilters.selectedPlandate)
  const [selectedParams, setSelectedParams] = useState<string[]>(defaultFilters.selectedParams)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (id && idToTypeMap[id]) {
      setSelectedType(idToTypeMap[id])
    }
  }, [id])

  // useEffect для отслеживания изменения selectedType и выполнения редиректа
  useEffect(() => {
    if (selectedType === '') {
      // Если selectedType пустой, то редирект на "планировки и цены"
      const hasException = Object.keys(ObjParams).some((param) => selectedParams.includes(param))
      if (hasException) {
        router.replace('/planirovki-i-ceny')
      }
    } else if (selectedType) {
      // Ищем соответствующий ключ (id) в idToTypeMap
      const newId = Object.keys(idToTypeMap).find((key) => idToTypeMap[key] === selectedType)

      if (newId) {
        const newUrl = `/${newId}` // Создаем новый URL
        router.replace(newUrl) // Редирект на новый URL
      }
    }
  }, [selectedType, router])

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false)

  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(6)

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      const width = window.innerWidth
      if (width > 2486) {
        setVisibleItemsCount(12)
      } else if (width > 2137) {
        setVisibleItemsCount(10)
      } else if (width > 1788) {
        setVisibleItemsCount(8)
      } else {
        setVisibleItemsCount(6)
      }
    }

    updateVisibleItemsCount()

    window.addEventListener('resize', updateVisibleItemsCount)

    return () => {
      window.removeEventListener('resize', updateVisibleItemsCount)
    }
  }, [])

  const [filters, setFilters] = useState<IFiltersState>({
    minSquareValue: Math.floor(filters_data.flats_square.min),
    maxSquareValue: Math.ceil(filters_data.flats_square.max),
    minFloorValue: 1,
    maxFloorValue: 4,
    minFrameValue: 1,
    maxFrameValue: 5,
    minPriceValue: Math.floor(filters_data.flats_price.min / 1000000),
    maxPriceValue: Math.ceil(filters_data.flats_price.max / 1000000),
    selectedParams: [],
    currentPage: 1,
    selectedPlandate: ''
  })

  const itemLoaderArray = useMemo(
    () =>
      Array(6)
        .fill(null)
        .map((_, i) => i + 1),
    []
  )
  useEffect(() => {
    if (!isInitialized) {
      const query = searchParams

      // Инициализация состояний значениями из URL или дефолтными значениями
      setMinSquareValue(
        query.get('minSquareValue') ? Number(query.get('minSquareValue')) : defaultFilters.minSquareValue
      )
      setMaxSquareValue(
        query.get('maxSquareValue') ? Number(query.get('maxSquareValue')) : defaultFilters.maxSquareValue
      )
      setMinFloorValue(query.get('minFloorValue') ? Number(query.get('minFloorValue')) : defaultFilters.minFloorValue)
      setMaxFloorValue(query.get('maxFloorValue') ? Number(query.get('maxFloorValue')) : defaultFilters.maxFloorValue)
      setMinFrameValue(query.get('minFrameValue') ? Number(query.get('minFrameValue')) : defaultFilters.minFrameValue)
      setMaxFrameValue(query.get('maxFrameValue') ? Number(query.get('maxFrameValue')) : defaultFilters.maxFrameValue)
      setMinPriceValue(query.get('minPriceValue') ? Number(query.get('minPriceValue')) : defaultFilters.minPriceValue)
      setMaxPriceValue(query.get('maxPriceValue') ? Number(query.get('maxPriceValue')) : defaultFilters.maxPriceValue)
      const selectedTypeFromQuery = query.get('selectedType')
      setSelectedType(
        selectedTypeFromQuery
          ? idToTypeMap[selectedTypeFromQuery] || '' // Если в query есть selectedType, используем его
          : id
            ? idToTypeMap[id] || '' // Если есть id, используем его
            : '' // Если ни того, ни другого, возвращаем пустую строку
      )
      setSortOrder(query.get('sortOrder') || '')
      setSelectedPlandate(query.get('selectedPlandate') || defaultFilters.selectedPlandate)
      setSelectedParams(
        query.get('selectedParams')
          ? decodeURIComponent(query.get('selectedParams') as string).split(',')
          : defaultFilters.selectedParams
      )

      setIsInitialized(true)
    }
  }, [isInitialized, searchParams, id, defaultFilters])

  //!новый кастомный хук
  useUpdateURL({
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
  })

  const pathname = usePathname()
  useEffect(() => {
    // Проверяем, что находимся на странице /planirovki-i-ceny и нет query параметров
    if (isInitialized && searchParams.toString() === '' && pathname === '/planirovki-i-ceny') {
      router.replace('/planirovki-i-ceny') // Очистка URL
      resetFilters() // Сброс фильтров
    }
  }, [isInitialized, searchParams, pathname, router])

  // Обработчик изменения параметров

  // Логика для установки активного параметра при загрузке страницы
  useEffect(() => {
    const matchingKey = Object.keys(ObjParams).find((key) => ObjParams[key] === param)

    if (matchingKey && !selectedParams.includes(matchingKey)) {
      setSelectedParams((prevParams) => [...prevParams, matchingKey])
    }
  }, [param, selectedParams])

  const handleParamChange = (value: string, checked: boolean) => {
    setSelectedParams((prevParams) => {
      const cleanedValue = value.toLowerCase().trim()

      // Находим ключ, если param соответствует значению в ObjParams
      const matchingKey = Object.keys(ObjParams).find((key) => ObjParams[key] === param)

      let updatedParams
      if (checked) {
        // Добавляем только параметры, которые не совпадают с текущим param (kvartiry-s-terrasoi)
        updatedParams =
          matchingKey && cleanedValue === matchingKey
            ? prevParams // Не добавляем "Террасу", если мы на странице "kvartiry-s-terrasoi"
            : [...prevParams, cleanedValue]
      } else {
        // Удаляем параметр из списка
        updatedParams = prevParams.filter((p) => p !== cleanedValue)
      }

      return updatedParams
    })
  }

  useEffect(() => {
    // Активируем "Террасу" при загрузке страницы, если мы на странице "kvartiry-s-terrasoi"
    const matchingKey = Object.keys(ObjParams).find((key) => ObjParams[key] === param)

    if (matchingKey && !selectedParams.includes(matchingKey)) {
      setSelectedParams((prevParams) => [...prevParams, matchingKey])
    }
  }, [param, selectedParams])

  const onSquareMinChange = useCallback((value: number) => setMinSquareValue(Math.floor(value)), [])
  const onSquareMaxChange = useCallback((value: number) => setMaxSquareValue(Math.ceil(value)), [])
  const onFloorMinChange = useCallback((value: number) => setMinFloorValue(Math.floor(value)), [])
  const onFloorMaxChange = useCallback((value: number) => setMaxFloorValue(Math.floor(value)), [])
  const onFrameMinChange = useCallback((value: number) => setMinFrameValue(Math.floor(value)), [])
  const onFrameMaxChange = useCallback((value: number) => setMaxFrameValue(Math.floor(value)), [])
  const onPriceMinChange = useCallback((value: number) => setMinPriceValue(Math.floor(value)), [])
  const onPriceMaxChange = useCallback((value: number) => setMaxPriceValue(Math.ceil(value)), [])

  const onTypeChange = useCallback((value: string) => setSelectedType(value), [])
  const onPlandateChange = useCallback((value: string) => setSelectedPlandate(value), [])

  //! новый кастомный хук
  const resetFilters = useResetFilters({
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
  })

  const sortItems = (items: IObj[], order: string) => {
    switch (order) {
      case 'price-h':
        return items.sort((a, b) => parseFloat(a.Fvalue) - parseFloat(b.Fvalue))
      case 'price-l':
        return items.sort((a, b) => parseFloat(b.Fvalue) - parseFloat(a.Fvalue))
      case 'square-h':
        return items.sort((a, b) => parseFloat(a.Tsquare) - parseFloat(b.Tsquare))
      case 'square-l':
        return items.sort((a, b) => parseFloat(b.Tsquare) - parseFloat(a.Tsquare))
      default:
        return items
    }
  }

  const sortedAndFilteredItems = useFilteredAndSortedItems({
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
  })

  const [currentVisibleCount, setCurrentVisibleCount] = useState<number>(visibleItemsCount)

  useEffect(() => {
    setCurrentVisibleCount(visibleItemsCount)
  }, [visibleItemsCount])

  const showMoreItems = () => {
    setCurrentVisibleCount((prevCount) => Math.min(prevCount + visibleItemsCount, sortedAndFilteredItems.length))
  }

  const paginatedItems = useMemo(() => {
    return sortedAndFilteredItems.slice(0, currentVisibleCount)
  }, [sortedAndFilteredItems, currentVisibleCount])

  useEffect(() => {
    setIsLoading(true)
    if (items && items.length > 0) {
      setIsLoading(false)
    }
  }, [items])

  const isTablet = useIsTablet(993)

  const [isDrawFilter, setDrawFilter] = useState(false)
  const [isDrawOrder, setDrawOrder] = useState(false)

  const [placement] = useState<DrawerProps['placement']>('bottom')

  const showOrder = () => {
    setDrawOrder(true)
  }

  const onCloseOrder = () => {
    setDrawOrder(false)
  }

  const showDrawer = () => {
    setDrawFilter(true)
  }

  const onCloseDrawer = () => {
    setDrawFilter(false)
  }

  const handleSortChange = (value: string) => {
    setIsFilterLoading(true)
    setSortOrder(value)

    const newFilters = {
      ...filters,
      sortOrder: value,
      currentPage: 1
    }

    setFilters(newFilters)

    const params = new URLSearchParams(searchParams)
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','))
        } else {
          params.set(key, value.toString())
        }
      }
    })

    const transliteratedType = transliterate(selectedType)
    const url = selectedType ? `/planirovki-i-ceny/${transliteratedType}` : `/planirovki-i-ceny`

    router.replace(`${url}?${params.toString()}`)

    setTimeout(() => {
      setIsFilterLoading(false)
    }, 500)
  }

  const OrderSelect = () => {
    return (
      <div className={styles.order_action}>
        <ConfigProvider theme={{token: {colorPrimary: '#F47422', colorPrimaryBg: '#F4F4F4'}}}>
          <Select
            suffixIcon={<DropdownIcon />}
            onChange={handleSortChange}
            options={[
              {value: '', label: 'По умолчанию'},
              {value: 'price-h', label: 'Цена по возрастанию'},
              {value: 'price-l', label: 'Цена по убыванию'},
              {value: 'square-h', label: 'Площадь по возрастанию'},
              {value: 'square-l', label: 'Площадь по убыванию'}
            ]}
            className='select_order'
            defaultValue={''}
            value={sortOrder}
          />
        </ConfigProvider>
      </div>
    )
  }

  const remainingItemsCount = useMemo(() => {
    return Math.max(sortedAndFilteredItems.length - currentVisibleCount, 0)
  }, [sortedAndFilteredItems.length, currentVisibleCount])

  const crumbs = [
    {key: 'odnokomnatnye', title: 'Однокомнатные', h1: '1-комнатные квартиры'},
    {key: 'dvuhkomnatnye', title: 'Двухкомнатные ', h1: '2-комнатные квартиры'},
    {key: '3-komnatnye', title: 'Трехкомнатные', h1: '3-комнатные квартиры'},
    {key: 'studii', title: 'Студии', h1: 'Студии'},
    {key: 'lofty', title: 'Лофты', h1: 'Лофты'},
    {key: 'kvartiry-s-garderobnoi', title: 'Квартиры с гардеробной', h1: 'Квартиры с гардеробной'},
    {key: 'kvartiry-s-kladovoi', title: 'Квартиры с кладовой', h1: 'Квартиры с кладовой'},
    {key: 'kvartiry-s-razdelnym-su', title: 'Квартиры с раздельным СУ', h1: 'Квартиры с раздельным санузлом'},
    {key: 'kvartiry-s-terrasoi', title: 'Квартиры с терассой', h1: 'Квартиры с терассой'},
    {key: 'kvartiry-s-balkonom', title: 'Квартиры с балконом', h1: 'Квартиры с балконом'},
    {key: 'kvartiry-s-lodzhiei', title: 'Квартиры с лоджией', h1: 'Квартиры с лоджией'}
  ]

  const crumb = crumbs.find((crumb) => crumb.key == id || crumb.key == param)?.title

  const breadcrumbItems = !crumb
    ? [
        {title: 'Главная', href: '/'},
        {title: 'Выбрать квартиру', href: '/planirovki-i-ceny'}
      ]
    : [{title: 'Главная', href: '/'}, {title: crumb}]

  const title = crumbs.find((crumb) => crumb.key == id || crumb.key == param)?.h1 || 'Выбрать квартиру'

  return (
    <MainContainer>
      <Title title={title} breadcrumbs={breadcrumbItems} dashboard={true} />

      <div className={styles.catalog}>
        <ConfigProvider theme={{token: {colorPrimary: '#D38F6D'}}}>
          <Row gutter={[16, 16]} className={styles.tabs}>
            <Col span={24}>
              <Tabs
                defaultActiveKey='1'
                items={tabs}
                onChange={onChange}
                tabBarExtraContent={{
                  left: <OrderSelect />
                }}
              />
            </Col>
          </Row>
        </ConfigProvider>

        <div className={styles.catalog_container}>
          {!isLoading && (
            <>
              {!isTablet ? (
                <div className={styles.sticky}>
                  <Filter
                    options={options}
                    maxPriceValue={maxPriceValue}
                    minPriceValue={minPriceValue}
                    minFloorValue={minFloorValue}
                    maxFloorValue={maxFloorValue}
                    minFrameValue={minFrameValue}
                    maxFrameValue={maxFrameValue}
                    minSquareValue={minSquareValue}
                    maxSquareValue={maxSquareValue}
                    onPriceMaxChange={onPriceMaxChange}
                    onPriceMinChange={onPriceMinChange}
                    onFloorMaxChange={onFloorMaxChange}
                    onFloorMinChange={onFloorMinChange}
                    onFrameMaxChange={onFrameMaxChange}
                    onFrameMinChange={onFrameMinChange}
                    onSquareMaxChange={onSquareMaxChange}
                    onSquareMinChange={onSquareMinChange}
                    selectedPlandate={selectedPlandate}
                    onPlandateChange={onPlandateChange}
                    parametrs={filters_data.parametrs ?? []}
                    onParamChange={handleParamChange}
                    selectedParams={selectedParams}
                    onTypeChange={onTypeChange}
                    resetFilters={resetFilters}
                    selectedType={selectedType}
                    filters_data={filters_data}
                  />
                </div>
              ) : (
                <>
                  <div className={styles.actions}>
                    <button type='button' className={styles.order} onClick={showOrder}>
                      <svg width='17' height='14' viewBox='0 0 17 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M8.27657 4.13935C8.27657 3.88626 8.17804 3.64832 7.99934 3.46942L4.79067 0.260947L4.78847 0.259352C4.75397 0.226842 4.71707 0.196926 4.67818 0.169801L4.61895 0.0515302L4.30023 0.0154307L4.25037 0.00107067H4.15723C4.02281 -0.00551101 3.89775 0.0182229 3.77529 0.0730703L3.64585 0.124727L3.60537 0.165214C3.5565 0.198521 3.51063 0.236416 3.46855 0.278499L0.277229 3.46962C0.0985258 3.64832 0 3.88626 0 4.13935C0 4.39245 0.0985258 4.63039 0.277229 4.80929C0.646601 5.17866 1.24773 5.17866 1.6169 4.80929L3.19072 3.23547V12.1174C3.19072 12.6397 3.61574 13.0647 4.13808 13.0647C4.66043 13.0647 5.08545 12.6397 5.08545 12.1174V3.23547L6.65927 4.80929C7.02864 5.17866 7.62977 5.17866 7.99894 4.80929C8.17784 4.63039 8.27617 4.39265 8.27617 4.13935H8.27657Z'
                          fill='#d38f6d'
                        />
                        <path
                          d='M15.9779 8.25665C15.799 8.07774 15.561 7.97922 15.3081 7.97922C15.0552 7.97922 14.8173 8.07774 14.6382 8.25665L13.0644 9.83047V0.948584C13.0642 0.426238 12.6391 0.0012207 12.1168 0.0012207C11.5945 0.0012207 11.1694 0.426238 11.1694 0.948584V9.83047L9.59821 8.25924C9.4203 8.07954 9.18296 7.98002 8.92847 7.97902H8.92568C8.67358 7.97902 8.43584 8.07735 8.25574 8.25645C8.07684 8.43515 7.97852 8.67309 7.97852 8.92638C7.97852 9.17968 8.07704 9.41742 8.25574 9.59632L11.4439 12.7844C11.5382 12.8804 11.6551 12.9562 11.7823 13.0038L11.911 13.0509H11.9537C11.9971 13.0585 12.0412 13.0631 12.0853 13.0645L12.1353 13.0651L12.1485 13.0645C12.1926 13.0631 12.2367 13.0585 12.2801 13.0509H12.3258L12.4529 13.0032C12.5791 12.956 12.6956 12.8802 12.7899 12.7842L15.9781 9.59612C16.157 9.41742 16.2553 9.17948 16.2553 8.92618C16.2553 8.67289 16.1568 8.43515 15.9781 8.25625L15.9779 8.25665Z'
                          fill='#d38f6d'
                        />
                      </svg>
                    </button>
                    <button type='button' className={styles.filterBtn} onClick={showDrawer}>
                      <svg width='19' height='20' viewBox='0 0 19 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M13.5714 3.33442C13.5714 4.43961 12.6609 5.33333 11.5358 5.33333C10.4107 5.33333 9.5 4.43961 9.5 3.33442C9.5 2.22923 10.4127 1.33333 11.5358 1.33333C12.659 1.33333 13.5714 2.22923 13.5714 3.33442ZM8.21149 4C8.52503 5.5214 9.89523 6.66667 11.5358 6.66667C13.1764 6.66667 14.5464 5.5214 14.8599 4H18.3214C18.6972 4 19 3.70209 19 3.33442C19 2.96674 18.6972 2.66667 18.3214 2.66667H14.8599C14.5464 1.14527 13.1764 0 11.5358 0C9.89523 0 8.52503 1.14527 8.21149 2.66667H0.678603C0.304953 2.66667 0 2.96458 0 3.33442C0 3.70426 0.304953 4 0.678603 4H8.21149ZM6.78559 10.0011C6.78559 11.1041 5.87513 12 4.75 12C3.62487 12 2.71419 11.1041 2.71419 10.0011C2.71419 8.89806 3.62685 8 4.75 8C5.87315 8 6.78559 8.8959 6.78559 10.0011ZM1.42568 10.6667C1.74142 12.1881 3.10942 13.3333 4.75 13.3333C6.39058 13.3333 7.76056 12.1881 8.0741 10.6667H18.3214C18.6972 10.6667 19 10.3688 19 10.0011C19 9.63341 18.6972 9.33333 18.3214 9.33333H8.0741C7.76056 7.81194 6.39278 6.66667 4.75 6.66667C3.10722 6.66667 1.74142 7.81194 1.42568 9.33333H0.678603C0.304953 9.33333 0 9.63124 0 10.0011C0 10.3709 0.304953 10.6667 0.678603 10.6667H1.42568ZM16.2858 16.6678C16.2858 17.7708 15.3732 18.6667 14.25 18.6667C13.1268 18.6667 12.2144 17.7708 12.2144 16.6678C12.2144 15.5647 13.1268 14.6667 14.25 14.6667C15.3732 14.6667 16.2858 15.5626 16.2858 16.6678ZM10.9259 17.3333C11.2394 18.8547 12.6072 20 14.25 20C15.8928 20 17.2586 18.8547 17.5743 17.3333H18.3214C18.6972 17.3333 19 17.0354 19 16.6678C19 16.3001 18.6972 16 18.3214 16H17.5743C17.2586 14.4786 15.8906 13.3333 14.25 13.3333C12.6094 13.3333 11.2394 14.4786 10.9259 16H0.678603C0.304953 16 0 16.2979 0 16.6678C0 17.0376 0.304953 17.3333 0.678603 17.3333H10.9259Z'
                          fill='white'
                        />
                      </svg>
                      <span>Фильтр параметров</span>
                    </button>
                  </div>

                  <Drawer
                    placement={placement}
                    closable={false}
                    onClose={onCloseOrder}
                    open={isDrawOrder}
                    key={placement}
                    className='custom-drawer'
                    styles={{
                      body: {
                        padding: '0 9px'
                      }
                    }}
                  >
                    <div className={styles.draw_order}>
                      <button type='button' onClick={onCloseOrder}>
                        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M2.92561 2.92492C6.82642 -0.974974 13.1736 -0.974974 17.0744 2.92492C20.9752 6.8249 20.9752 13.1705 17.0744 17.0704C15.1848 18.9596 12.6724 20 10 20C7.3276 20 4.81522 18.9596 2.92561 17.0704C-0.975203 13.1705 -0.975203 6.8249 2.92561 2.92492ZM3.77585 16.2203C5.43834 17.8825 7.64879 18.7979 10 18.7979C12.3512 18.7979 14.5617 17.8825 16.2242 16.2203C19.6562 12.7892 19.6562 7.20618 16.2242 3.77496C14.5081 2.05935 12.2541 1.20159 10 1.20159C7.74589 1.20159 5.49186 2.05935 3.77585 3.77496C0.343822 7.20618 0.343822 12.7892 3.77585 16.2203Z'
                            fill='#555555'
                          />
                          <path
                            d='M6.15412 6.15265C6.38887 5.91787 6.76952 5.91787 7.00427 6.15265L9.99973 9.14731L12.9952 6.15265C13.2299 5.91787 13.6106 5.91787 13.8454 6.15265C14.0802 6.38734 14.0802 6.76791 13.8454 7.00269L10.85 9.99735L13.8454 12.9921C14.0802 13.2268 14.0802 13.6074 13.8454 13.8421C13.728 13.9594 13.5741 14.0182 13.4203 14.0182C13.2665 14.0182 13.1126 13.9594 12.9952 13.8421L9.99973 10.8474L7.00427 13.8421C6.88694 13.9594 6.73305 14.0182 6.57915 14.0182C6.42525 14.0182 6.27145 13.9594 6.15412 13.8421C5.91928 13.6074 5.91928 13.2268 6.15412 12.9921L9.14949 9.99735L6.15412 7.00269C5.91928 6.76791 5.91928 6.38734 6.15412 6.15265Z'
                            fill='#555555'
                          />
                        </svg>
                      </button>
                      <ul className={styles.order_list}>
                        <li
                          className={sortOrder === '' ? styles.active_order : ''}
                          onClick={() => {
                            handleSortChange('')
                            onCloseOrder()
                          }}
                        >
                          По умолчанию
                        </li>
                        <li
                          className={sortOrder === 'price-h' ? styles.active_order : ''}
                          onClick={() => {
                            handleSortChange('price-h')
                            onCloseOrder()
                          }}
                        >
                          Цена по возрастанию
                        </li>
                        <li
                          className={sortOrder === 'price-l' ? styles.active_order : ''}
                          onClick={() => {
                            handleSortChange('price-l')
                            onCloseOrder()
                          }}
                        >
                          Цена по убыванию
                        </li>
                        <li
                          className={sortOrder === 'square-h' ? styles.active_order : ''}
                          onClick={() => {
                            handleSortChange('square-h')
                            onCloseOrder()
                          }}
                        >
                          Площадь по возрастанию
                        </li>
                        <li
                          className={sortOrder === 'square-l' ? styles.active_order : ''}
                          onClick={() => {
                            handleSortChange('square-l')
                            onCloseOrder()
                          }}
                        >
                          Площадь по убыванию
                        </li>
                      </ul>
                    </div>
                  </Drawer>

                  <Drawer
                    placement={placement}
                    closable={false}
                    onClose={onCloseDrawer}
                    open={isDrawFilter}
                    key={placement}
                    className='custom-drawer'
                    styles={{
                      body: {
                        padding: '0 9px'
                      }
                    }}
                  >
                    <Filter
                      options={options}
                      maxPriceValue={maxPriceValue}
                      minPriceValue={minPriceValue}
                      minFloorValue={minFloorValue}
                      maxFloorValue={maxFloorValue}
                      minFrameValue={minFrameValue}
                      maxFrameValue={maxFrameValue}
                      minSquareValue={minSquareValue}
                      maxSquareValue={maxSquareValue}
                      onPriceMaxChange={onPriceMaxChange}
                      onPriceMinChange={onPriceMinChange}
                      onFloorMaxChange={onFloorMaxChange}
                      onFloorMinChange={onFloorMinChange}
                      onFrameMaxChange={onFrameMaxChange}
                      onFrameMinChange={onFrameMinChange}
                      onSquareMaxChange={onSquareMaxChange}
                      onSquareMinChange={onSquareMinChange}
                      selectedPlandate={selectedPlandate}
                      onPlandateChange={onPlandateChange}
                      parametrs={filters_data.parametrs ?? []}
                      onParamChange={handleParamChange}
                      selectedParams={selectedParams}
                      onTypeChange={onTypeChange}
                      resetFilters={resetFilters}
                      selectedType={selectedType}
                      onClose={onCloseDrawer}
                      filters_data={filters_data}
                    />
                  </Drawer>
                </>
              )}
              <>
                {paginatedItems.length > 0 ? (
                  <div className={styles.grid}>
                    <div className={styles.gridRow}>
                      {isLoading || isFilterLoading
                        ? itemLoaderArray.map((index) => (
                            <div key={index} className={styles.gridCol}>
                              <ItemLoader key={index} />
                            </div>
                          ))
                        : paginatedItems.map((item) => (
                            <div key={item.id} className={styles.gridCol}>
                              <div className={styles.cardWrapper} style={{height: '100%'}}>
                                <Card data={item} dashboard={true} />
                              </div>
                            </div>
                          ))}
                    </div>
                    <div className={styles.showMoreContainer}>
                      {remainingItemsCount > 0 && (
                        <FullButton
                          onClick={showMoreItems}
                          borderColor={'none'}
                          buttonElementColor={'white'}
                          buttonFill={'bronze-500'}
                          buttonText={`Показать еще ${Math.min(remainingItemsCount, visibleItemsCount)} вариантов из${' '}${remainingItemsCount}`}
                          activeButton={true}
                          border={false}
                        />
                      )}

                      <div className={styles.scroll_up}>
                        <button type='button' onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                          <svg
                            width='16'
                            height='32'
                            viewBox='0 0 16 32'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM7 31C7 31.5523 7.44772 32 8 32C8.55228 32 9 31.5523 9 31H7ZM7 1V31H9V1H7Z'
                              fill='#555555'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.null}>
                    <p className={styles.emptyCatalog}>
                      По заданным параметрам ничего не найдено :(
                      <br /> Попробуйте изменить условия или сбросьте фильтр
                    </p>
                  </div>
                )}
              </>
            </>
          )}
        </div>
      </div>
    </MainContainer>
  )
}

const CatalogPageWrapper = ({data, filters_data, id, param}: CatalogPageProps) => {
  return (
    <Suspense>
      <CatalogPage data={data} filters_data={filters_data} id={id} param={param} />
    </Suspense>
  )
}

const Filter = ({
  onTypeChange,
  onPriceMinChange,
  onPriceMaxChange,
  onFloorMinChange,
  onFloorMaxChange,
  onFrameMinChange,
  onFrameMaxChange,
  onSquareMaxChange,
  onSquareMinChange,
  resetFilters,
  options,
  selectedType,
  minPriceValue,
  maxPriceValue,
  minSquareValue,
  maxSquareValue,
  minFrameValue,
  maxFrameValue,
  maxFloorValue,
  minFloorValue,
  selectedPlandate,
  onPlandateChange,
  onParamChange,
  selectedParams,
  onClose,
  filters_data
}: FilterProps) => {
  return (
    <ConfigProvider theme={{token: {colorPrimary: '#F47422'}}}>
      <aside className={styles.filter} style={{maxWidth: !onClose ? '312px' : '100%'}}>
        <div className={styles.filterTop}>
          <button
            type='button'
            className={styles.filterReset}
            onClick={resetFilters}
            style={{marginLeft: onClose ? '0' : 'auto'}}
          >
            <RefreshIcon /> <span>Сбросить фильтр</span>
          </button>
          {onClose && (
            <button type='button' onClick={onClose}>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M2.92561 2.92492C6.82642 -0.974974 13.1736 -0.974974 17.0744 2.92492C20.9752 6.8249 20.9752 13.1705 17.0744 17.0704C15.1848 18.9596 12.6724 20 10 20C7.3276 20 4.81522 18.9596 2.92561 17.0704C-0.975203 13.1705 -0.975203 6.8249 2.92561 2.92492ZM3.77585 16.2203C5.43834 17.8825 7.64879 18.7979 10 18.7979C12.3512 18.7979 14.5617 17.8825 16.2242 16.2203C19.6562 12.7892 19.6562 7.20618 16.2242 3.77496C14.5081 2.05935 12.2541 1.20159 10 1.20159C7.74589 1.20159 5.49186 2.05935 3.77585 3.77496C0.343822 7.20618 0.343822 12.7892 3.77585 16.2203Z'
                  fill='#555555'
                />
                <path
                  d='M6.15412 6.15265C6.38887 5.91787 6.76952 5.91787 7.00427 6.15265L9.99973 9.14731L12.9952 6.15265C13.2299 5.91787 13.6106 5.91787 13.8454 6.15265C14.0802 6.38734 14.0802 6.76791 13.8454 7.00269L10.85 9.99735L13.8454 12.9921C14.0802 13.2268 14.0802 13.6074 13.8454 13.8421C13.728 13.9594 13.5741 14.0182 13.4203 14.0182C13.2665 14.0182 13.1126 13.9594 12.9952 13.8421L9.99973 10.8474L7.00427 13.8421C6.88694 13.9594 6.73305 14.0182 6.57915 14.0182C6.42525 14.0182 6.27145 13.9594 6.15412 13.8421C5.91928 13.6074 5.91928 13.2268 6.15412 12.9921L9.14949 9.99735L6.15412 7.00269C5.91928 6.76791 5.91928 6.38734 6.15412 6.15265Z'
                  fill='#555555'
                />
              </svg>
            </button>
          )}
        </div>
        <div className={styles.group}>
          <div className={styles.select_container}>
            <span>Комнатность</span>
            <Select
              suffixIcon={<DropdownIcon />}
              onChange={onTypeChange}
              style={{marginBottom: '20px', height: '40px'}}
              options={options}
              className={`${styles.select} custom-select`}
              value={selectedType}
            />
          </div>

          <RangeFilter
            minValue={minPriceValue}
            maxValue={maxPriceValue}
            onMinChange={onPriceMinChange}
            onMaxChange={onPriceMaxChange}
            sliderRange={[
              Math.floor(filters_data.flats_price.min / 1000000),
              Math.ceil(filters_data.flats_price.max / 1000000)
            ]}
            title={
              <p>
                Стоимость, <span>млн руб</span>
              </p>
            }
            isPrice
          />
          <RangeFilter
            minValue={minSquareValue}
            maxValue={maxSquareValue}
            onMinChange={onSquareMinChange}
            onMaxChange={onSquareMaxChange}
            sliderRange={[Math.floor(filters_data.flats_square.min), Math.ceil(filters_data.flats_square.max)]}
            title={
              <p>
                Площадь,{' '}
                <span>
                  м<sup>2</sup>
                </span>
              </p>
            }
          />
        </div>
        <div className={styles.hr} />
        <div className={styles.group}>
          <div style={{display: 'none'}}>
            <RangeFilter
              minValue={minFrameValue}
              maxValue={maxFrameValue}
              onMinChange={onFrameMinChange}
              onMaxChange={onFrameMaxChange}
              sliderRange={[1, 5]}
              title={<p>Корпус</p>}
            />
          </div>
          <RangeFilter
            minValue={minFloorValue}
            maxValue={maxFloorValue}
            onMinChange={onFloorMinChange}
            onMaxChange={onFloorMaxChange}
            sliderRange={[1, 4]}
            title={<p>Этаж</p>}
          />
          <div className={styles.select_container}>
            <span>Срок сдачи</span>
            <Select
              suffixIcon={<DropdownIcon />}
              defaultValue='Срок сдачи'
              onChange={onPlandateChange}
              style={{marginBottom: '20px', height: '40px'}}
              value={selectedPlandate || 'Любой'}
              options={[
                {value: '', label: 'Любой'},
                ...filters_data.flats_plandates.map((date) => ({value: date, label: date}))
              ]}
              className={styles.select}
            />
          </div>
        </div>
        <div className={styles.hr} />
        <div className={styles.extra}>
          <ExtraOptions
            parametrs={filters_data.parametrs}
            onParamChange={onParamChange}
            selectedParams={selectedParams}
          />
        </div>
      </aside>
    </ConfigProvider>
  )
}
export default CatalogPageWrapper
