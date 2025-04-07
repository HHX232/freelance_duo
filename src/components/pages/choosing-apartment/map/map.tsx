'use client'
import L, {divIcon, LatLngBoundsExpression} from 'leaflet'
import s from './map.module.scss'
import {FC, useEffect, useState} from 'react'
import {ImageOverlay, MapContainer, Marker, SVGOverlay} from 'react-leaflet'
import {renderToString} from 'react-dom/server'
import ReactDOMServer from 'react-dom/server'
import ClearStarIcon from '@icons/clear_star.svg'
import PlusIcon from '@icons/plus.svg'
import clsx from 'clsx'
import {pins} from './data'

import Image from 'next/image'
import ParagraphUI from '@src/components/UI-kit/Typography/Paragraph/Paragraph'
import {HeadTitle} from '@src/components/UI-kit/TextKit/head-title'
import Breadcrumbs from '@shared/Breadcrumbs/Breadcrumbs'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'

import SettingsIcon from '@icons/Menu point.svg'
import ArrowIcon from '@icons/toLeft.svg'

import ArrowUpIcon from '@icons/arrow_up.svg'
import {ChangeZoom} from '@shared/leaflet-modules/leaflet-modules'
import {useCreateQueryString} from '@src/lib/hooks/createQueryString'
import {usePathname, useRouter} from 'next/navigation'

interface CustomIconProps {
  isActive: boolean
  text: number | string
}

const CustomMarkerIcon: FC<CustomIconProps> = ({isActive, text}) => (
  <div className={clsx(s.star_pin, isActive && s.active)}>
    <ClearStarIcon />
    <span>{isActive ? <PlusIcon /> : text}</span>
  </div>
)

const TextMarker = () => {
  const textIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <ParagraphUI extraClass={clsx(s.paragraph, s.paragraph_embankment)} size='lg'>
        <ArrowUpIcon />
        <span>
          Набережная <br /> и парк «Остров фортов»
        </span>
      </ParagraphUI>
    ),
    className: '', // Убираем стандартные стили маркера
    iconSize: [361, 20] // Ширина/высота
  })

  return <Marker position={[850, 1700]} icon={textIcon}></Marker>
}

const MapWidthPins: FC = () => {
  const router = useRouter()
  const createQueryString = useCreateQueryString()
  const pathname = usePathname()

  const IMAGE_SIZE = {width: 1920, height: 1000}
  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [IMAGE_SIZE.height, IMAGE_SIZE.width]
  ]

  const [zoom, setZoom] = useState(0)

  useEffect(() => {
    if (!window) return

    const resizeHandler = () => {
      setZoom(window.innerWidth > IMAGE_SIZE.width || window.innerHeight > IMAGE_SIZE.height ? 1 : 0)
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  const [activePinIndex, setActivePineIndex] = useState<null | number>(null)

  const divIcons = pins.map((pin, index) => {
    return {
      icon: divIcon({
        html: renderToString(<CustomMarkerIcon isActive={activePinIndex === index} text={index + 1} />),
        className: 'custom-icon', // Очищаем стандартные классы
        iconSize: [134, 134] // Размер иконки
      }),
      coords: pin.coords,
      vector: {
        icon: pin.vector.content(clsx(s.vector, activePinIndex === index && s.vector_active)),
        bounds: pin.vector.bounds
      }
    }
  })

  return (
    <div className={s.root}>
      <div className={s.overlay} />

      <div className={s.header}>
        <Breadcrumbs
          className={s.breadcrumbs}
          items={[
            {title: 'Генплан', href: '/'},
            {title: 'Кронфорт. Центральный', href: '/choosing-apartment'}
          ]}
        />
        <HeadTitle className={s.header_title}>
          Выберите <br /> Корпус
        </HeadTitle>
      </div>

      <MapContainer
        zoomControl={false}
        className={s.container}
        center={[IMAGE_SIZE.height / 2, IMAGE_SIZE.width / 4]}
        zoom={0}
        maxZoom={5}
        style={{height: '100vh', width: '100%'}}
        crs={L.CRS.Simple}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <ImageOverlay
          className={s.map_overlay}
          url='/content/choose-apartment-assets/background1.jpg'
          bounds={bounds}
          interactive={true}
        />
        <ChangeZoom zoomLevel={zoom} />
        <TextMarker />

        {divIcons.map((divIcon, index) => (
          <>
            <Marker
              eventHandlers={{
                click: () => setActivePineIndex(index)
              }}
              key={index}
              icon={divIcon.icon}
              position={divIcon.coords}
            />
            <SVGOverlay bounds={divIcon.vector.bounds}>
              {/* className={clsx(s.vector, activePinIndex === index && s.vector_active)} */}
              {divIcon.vector.icon}
            </SVGOverlay>
          </>
        ))}
      </MapContainer>

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
        {activePinIndex !== null && (
          <FullButton
            type={'Button'}
            extraClass={s.arrow_button}
            buttonBorderRadius={'6px'}
            onClick={() => {
              router.push(pathname + '?' + createQueryString('house', activePinIndex))
            }}
            buttonText={
              <div>
                <ArrowIcon />
              </div>
            }
            activeButton={true}
            border={false}
            borderColor={''}
            buttonElementColor='white'
            buttonFill={'white'}
          />
        )}
      </div>
      <div className={s.compass}>
        <ParagraphUI extraClass={clsx(s.paragraph)} size='lg'>
          КАД (10 мин.) <ArrowUpIcon />
        </ParagraphUI>
        <Image width={150} height={150} src='/content/choose-apartment-assets/compass.png' alt='compass'></Image>
      </div>
    </div>
  )
}

export default MapWidthPins
