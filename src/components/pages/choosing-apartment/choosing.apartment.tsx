'use client'
import {FC, useEffect} from 'react'

import s from './choosing.apartment.module.scss'
import Image from 'next/image'
import Compass from '@pages/map/Components/card/Compass'
import ClearStar from '@icons/clear_star.svg'
import clsx from 'clsx'
import {SubmitHandler, useForm} from 'react-hook-form'

interface IChoosingApartmentPageViewProps {}

const apartmentsData: IApartmentItem[] = [
  {
    'w-320': {
      x: 204,
      y: 428
    }
  },
  {
    'w-320': {
      x: 11,
      y: 11
    }
  },
  {
    'w-320': {
      x: 22,
      y: 22
    }
  }
]

interface IApartmentItem {
  'w-320': {
    x: number
    y: number
  }
}

interface Inputs {
  activeApartmentItemIndex?: number
}

const ChoosingApartmentPageView: FC<IChoosingApartmentPageViewProps> = () => {
  const {handleSubmit, setValue, watch} = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  //Подгоняем ширину карты под высоту так чтобы она не ломалась
  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = window.document.getElementById('map')

    if (!element) return

    const setMinWidthForMap = () => {

      const innerWidth = window.innerWidth
      const aspectRatio = 1.5 //соотношение сторон 970 / 640 = ~1.5
      const innerHeight = window.innerHeight < 640 ? 640 : window.innerHeight

      element.style.width =  innerWidth < 1024 ? aspectRatio * innerHeight + 'px' : innerWidth + 'px'
    }
    setMinWidthForMap()
    window.addEventListener('resize', setMinWidthForMap)
    return () => {
      window.removeEventListener('resize', setMinWidthForMap)
    }
  }, [])

  return (
    <div className={s.root}>
      <div className={s.map_container}>
        <div className={s.background} id='map'>
          <div className={s.overlay} />
          <Image width={1920} height={1000} src='/content/choose-apartment-assets/background1.jpg' alt='bg' />
        </div>
        {apartmentsData.map((item, index) => (
          <Star
            key={index}
            index={index}
            item={item}
            setActiveItemIndex={(index) => setValue('activeApartmentItemIndex', index)}
            activeItemIndex={watch('activeApartmentItemIndex')}
          />
        ))}
      </div>

      <button onClick={handleSubmit(onSubmit)}>send</button>
    </div>
  )
}

interface IStarProps {
  item: IApartmentItem
  index: number
  activeItemIndex?: number
  setActiveItemIndex?: (index: number) => void
}

const Star: FC<IStarProps> = (props) => {
  const {index, item, activeItemIndex, setActiveItemIndex} = props

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = window.document.getElementById(`star_${index}`)

    console.log(element)

    if (!element) return

    const setMinWidthForMap = () => {
      const innerHeight = window.innerHeight < 640 ? 640 : window.innerHeight
      const innerWidth = window.innerWidth
      const aspectRatio = 1.5 //соотношение сторон 970 / 640 = ~1.5
      const mapWidth = aspectRatio * innerHeight

      const relativeY =  item['w-320'].y / 640
      const relativeX =  item['w-320'].x / 970

      element.style.top = innerWidth < 1024 ? relativeY * innerHeight + 'px': relativeY * innerHeight + 'px'
      element.style.left = innerWidth < 1024 ? relativeX * mapWidth + 'px': relativeX * innerWidth + 'px'
    }
    setMinWidthForMap()
    window.addEventListener('resize', setMinWidthForMap)
    return () => {
      window.removeEventListener('resize', setMinWidthForMap)
    }
  }, [])

  return (
    <Compass
      id={`star_${index}`}
      key={index}
      text={''}
      name={''}
      className={s.star_wrapper}
      color={'#FF7314'}
      coords={{x: item['w-320'].x, y: item['w-320'].y}}
      coords_mob={{x: 33, y: 33}}
      onClickCompass={() => setActiveItemIndex?.(index)}
      CustomStar={(className) =>
        activeItemIndex == index ? null : (
          <div onClick={() => setActiveItemIndex?.(index)} className={clsx(className, s.star)}>
            <ClearStar />
            <span>{index + 1}</span>
          </div>
        )
      }
      // onClickCompass={compassClickHandler(point)}
      disablePopup
    />
  )
}

export default ChoosingApartmentPageView
