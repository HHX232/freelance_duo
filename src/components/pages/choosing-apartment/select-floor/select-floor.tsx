'use client'
import {FC, useEffect, useState} from 'react'
import s from './select-floor.module.scss'
import {ImageOverlay, MapContainer, SVGOverlay} from 'react-leaflet'
import {CRS, LatLngBoundsExpression} from 'leaflet'
import {ChangeZoom} from '@shared/leaflet-modules/leaflet-modules'
import clsx from 'clsx'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import SettingsIcon from '@icons/Menu point.svg'
import {usePathname, useRouter} from 'next/navigation'
import {useCreateQueryString} from '@src/lib/hooks/createQueryString'
import ArrowIcon from '@icons/toLeft.svg'
import Aside from '../aside/aside'
import { hoversData } from './hover-data'

interface ISelectFloorProps {}





const SelectFloor: FC<ISelectFloorProps> = () => {

  const router = useRouter()
  const createQueryString = useCreateQueryString()
  const pathname = usePathname()

  const IMAGE_SIZE = {width: 1920, height: 1000}
  const [activeFloorIndex, setActiveFloorIndex] = useState<null | number>(null)
  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [IMAGE_SIZE.height, IMAGE_SIZE.width]
  ]

  const [zoom, setZoom] = useState(0)

  useEffect(() => {
    if (!window) return

    const resizeHandler = () => {
      setZoom(window.innerWidth > IMAGE_SIZE.width || window.innerHeight > IMAGE_SIZE.height ? 0.2 : 0)
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  const renderHovers = hoversData.map((item, index) => {
    return (
      <SVGOverlay key={index} className={s.svgWrapper} bounds={item.bounds}>
        <svg
          className={clsx(s.svg_overlay, index === activeFloorIndex && s.active)}
          onClick={() => {
            setActiveFloorIndex(index)
          }}
        >
          {item.svg}
        </svg>
      </SVGOverlay>
    )
  })

  return (
    <div className={s.root}>
      <MapContainer
        zoomControl={false}
        className={s.map}
        center={[IMAGE_SIZE.height / 2, 0]}
        zoom={0}
        maxZoom={zoom}
        style={{height: '100vh', width: '100%'}}
        crs={CRS.Simple}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <ImageOverlay
          className={s.map_overlay}
          url='/content/choose-apartment-assets/select_floor.jpg'
          bounds={bounds}
          interactive={true}
        />
        <ChangeZoom zoomLevel={zoom} />
        {renderHovers}
      </MapContainer>
      <Aside activeFloorIndex={activeFloorIndex}/>

      <div className={s.controls}>
        <FullButton
          type={'Button'}
          extraClass={s.button}
          buttonBorderRadius={'6px'}
          buttonText={
            <div>
              <SettingsIcon />
              <span>параметры</span>
            </div>
          }
          activeButton={true}
          border={false}
          borderColor={''}
          buttonElementColor='white'
          buttonFill={'bronze-500'}
        />
        {activeFloorIndex !== null && (
          <FullButton
            type={'Button'}
            extraClass={s.arrow_button}
            buttonBorderRadius={'6px'}
            onClick={() => {
              router.push(pathname + '?' + createQueryString('floor', activeFloorIndex))
            }}
            buttonText={<ArrowIcon />}
            activeButton={true}
            border={false}
            borderColor={''}
            buttonElementColor='white'
            buttonFill={'white'}
          />
        )}
      </div>
    </div>
  )
}

export default SelectFloor
