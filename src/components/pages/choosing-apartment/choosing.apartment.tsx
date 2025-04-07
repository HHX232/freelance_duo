'use client'
import {FC} from 'react'

import s from './choosing.apartment.module.scss'
import MapWithPins from './map/map'
import {useSearchParams} from 'next/navigation'
import SelectFloor from './select-floor/select-floor'
import SelectSection from './select-section/select-section'
import SelectApartment from './select-apartment/select-apartment'

interface IChoosingApartmentPageViewProps {}

const ChoosingApartmentPageView: FC<IChoosingApartmentPageViewProps> = () => {
  const params = useSearchParams()
  const house = params.get('house')
  const floor = params.get('floor')
  const section = params.get('section')

  return (
    <div className={s.root}>
      {!house && <MapWithPins />}
      {house && !floor && <SelectFloor />}
      {house && floor && !section && <SelectSection />}
      {house && floor && section && <SelectApartment />}
    </div>
  )
}

export default ChoosingApartmentPageView
