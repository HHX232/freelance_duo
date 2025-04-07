'use client'
import {FC, ReactElement, useEffect, useState} from 'react'

import s from './aside.module.scss'
import Image from 'next/image'
import clsx from 'clsx'
import {useSearchParams} from 'next/navigation'

import ArrowIconStroke from '@icons/arrow_up.svg'
import {hoversData} from '../select-floor/hover-data'
import Breadcrumbs from '@src/components/UI-kit/Navigation/Breadcrumbs/Breadcrumbs'
import H3Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H3Title'

interface IAsideProps {
  activeFloorIndex?: number | null
  isLeft?: boolean
}
interface IMiniMapItem {
  image: ReactElement
  x: number
  y: number
}
const miniMapData: IMiniMapItem[] = [
  {
    image: (
      <svg xmlns='http://www.w3.org/2000/svg' width='77' height='81' viewBox='0 0 77 81' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M20.5881 0.964223L20.187 0.818359L20.0474 1.22239L1.12646 55.9818L1 56.3478L1.35347 56.5047L53.0706 79.4615L53.5043 79.654L53.643 79.1996L61.3202 54.0475L64.9699 54.4323L65.3161 54.4689L65.4165 54.1349L75.2974 21.2793L75.4121 20.8978L75.0383 20.7618L20.5881 0.964223ZM14.6609 51.4689L27.0112 15.5881L60.2701 27.3115L46.4814 65.6599L14.6609 51.4689Z'
          stroke='#FDF1CD'
        />
      </svg>
    ),
    x: 48,
    y: 90
  },
  {
    image: (
      <svg xmlns='http://www.w3.org/2000/svg' width='78' height='83' viewBox='0 0 78 83' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M21.5 1.5L1 61L59 82L66.5 60L63 59L76.5 20L21.5 1.5ZM15.5 55L29.5 15.5L60.5 26L47.5 66L15.5 55Z'
          stroke='#FDF1CD'
        />
      </svg>
    ),
    x: 72,
    y: 17
  },
  {
    image: (
      <svg xmlns='http://www.w3.org/2000/svg' width='105' height='49' viewBox='0 0 105 49' fill='none'>
        <path d='M1.08398 12.6094L5.28863 1.02563L104.098 35.3556L99.2624 47.9923L1.08398 12.6094Z' stroke='#FDF1CD' />
      </svg>
    ),
    x: 175,
    y: 45
  },
  {
    image: (
      <svg xmlns='http://www.w3.org/2000/svg' width='151' height='125' viewBox='0 0 151 125' fill='none'>
        <path
          d='M57 13.5L56.9333 13.6488M56.9333 13.6488L50.5 28L32 23L13 78L45 88.5L59.5 48L96.5 61.5L82.5 101.5L114 112L137.5 40.5L57 13L56.9333 13.6488ZM43.5 17L50 1L150 36.5L119.5 124L69.5 107L83.5 65.5L65.5 59L49.5 101.5L1 84.5L26.5 12.5L43.5 17Z'
          stroke='#FDF1CD'
        />
      </svg>
    ),
    x: 121,
    y: 69
  },
  {
    image: (
      <svg xmlns='http://www.w3.org/2000/svg' width='84' height='85' viewBox='0 0 84 85' fill='none'>
        <path
          d='M22.0259 1.51636L1.21289 62.8048L19.7133 69.1231L23.7077 57.75L15.2984 55.2227L28.3328 15.6274L57.7653 25.9475L70.3793 69.1231L66.3849 79.6538L77.9476 83.6554L82.783 70.5974L66.3849 17.9442L22.0259 1.51636Z'
          stroke='#FDF1CD'
        />
      </svg>
    ),
    x: 272,
    y: 86
  },
  {
    image: (
      <svg xmlns='http://www.w3.org/2000/svg' width='72' height='98' viewBox='0 0 72 98' fill='none'>
        <path
          d='M45.6669 7.18086L41.252 18.3433L32.6325 15.3948L13.2911 67.2056L49.0306 83.0015L61.2241 48.461L71.3152 52.4627L55.1273 97.1126L1.09766 72.2603L26.3255 1.28369L45.6669 7.18086Z'
          stroke='#FDF1CD'
        />
      </svg>
    ),
    x: 241,
    y: 161
  }
]

const Aside: FC<IAsideProps> = (props) => {
  const {activeFloorIndex, isLeft} = props

  const params = useSearchParams()
  const activeHouseIndex = params.get('house')

  const [activeFloor, setActiveFloor] = useState(activeFloorIndex)

  useEffect(() => {
    const newFloor = params.get('floor')

    if (!newFloor) {
      setActiveFloor(activeFloorIndex)
      return
    }
    setActiveFloor(+newFloor)
  }, [params, activeFloorIndex])

  return (
    <div className={clsx(s.aside, activeFloor !== null && s.active, isLeft && s.left)}>
      <Breadcrumbs
        className={s.breadcrumbs}
        items={[
          {title: 'Генплан', href: '/'},
          {title: 'Кронфорт. Центральный', href: '/'},
          {title: '2 корпус', href: '/'}
        ]}
      />

      <H3Title className={s.title}>{typeof activeFloor === 'number' && hoversData[activeFloor].key} этаж</H3Title>

      <div className={s.prams}>
        <ul className={s.list}>
          <li>В продаже</li>
          <li>Площадь</li>
          <li>Срок сдачи</li>
        </ul>
        <ul className={s.list}>
          <li>3 квартиры</li>
          <li>24-65 м2</li>
          <li>4 кв 2026 г</li>
        </ul>
      </div>

      <div className={s.mini_map}>
        <span className={s.mini_map_title}>
          <ArrowIconStroke />
          Набережная и парк Остров Фортов
        </span>

        <div className={s.mini_map_content}>
          {miniMapData.map((item, index) => (
            <div
              style={{
                left: item.x,
                top: item.y
              }}
              className={clsx(s.mini_map_item, activeHouseIndex && +activeHouseIndex === index && s.active)}
              key={index}
            >
              {item.image}
            </div>
          ))}
          <Image
            width={80}
            height={80}
            className={s.mini_map_compass}
            alt='compass'
            src={'/content/choose-apartment-assets/compass.png'}
          />
        </div>
      </div>
    </div>
  )
}

export default Aside
