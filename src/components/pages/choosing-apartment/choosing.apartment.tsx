'use client'
import {FC} from 'react'

import s from './choosing.apartment.module.scss'
import MapWithPins from './map/map'

interface IChoosingApartmentPageViewProps {}

const ChoosingApartmentPageView: FC<IChoosingApartmentPageViewProps> = () => {
  return (
    <div className={s.root}>
      <MapWithPins />
    </div>
  )
}


export default ChoosingApartmentPageView
