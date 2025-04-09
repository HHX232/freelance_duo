'use client'
import {FC, useCallback, useRef, useState} from 'react'
import Aside from '../aside/aside'

import s from './select-apartment.module.scss'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import clsx from 'clsx'
import {useCreateQueryString} from '@src/lib/hooks/createQueryString'
import ArrowIconStroke from '@icons/arrow_up.svg'

import SettingsIcon from '@icons/Menu point.svg'
import H4Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H4Title'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import ImageMapper, {Area} from 'react-img-mapper'
import BookmarkIcon from '@icons/bookmark_icon.svg'
import CompareIcon from '@icons/compare_icon.svg'
import {Select} from 'antd'
import useResponsiveStyles from '@src/lib/hooks/useResponsiveStylesю'

import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch'

interface ISelectApartmentProps {}

const floorsItems: {isDisable: boolean}[] = [
  {
    isDisable: false
  },
  {
    isDisable: false
  },
  {
    isDisable: false
  },
  {
    isDisable: false
  }
]
interface ApartmentArea extends Area {
  price: number
  description: string
}

const SelectApartment: FC<ISelectApartmentProps> = () => {
  const params = useSearchParams()
  const floor = params.get('floor')
  const router = useRouter()
  const pathname = usePathname()

  const selectedAreaRef = useRef<ApartmentArea | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0})
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Обработчик входа на область
  const handleAreaEnter = useCallback((area: ApartmentArea, event: React.MouseEvent) => {
    console.log('area')
    console.log(area)

    selectedAreaRef.current = area
    updateTooltipPosition(event, area)
  }, [])

  // Обработчик выхода с области
  const handleAreaLeave = useCallback(() => {}, [])

  // Обновление позиции аннотации
  const updateTooltipPosition = (event?: React.MouseEvent, area?: ApartmentArea) => {
    if (!area || !event) return

    setTooltipPosition({
      x: event.clientX - 125,
      y: event.clientY - 175
    })
  }
  console.log(selectedAreaRef.current)

  // Стили для аннотации
  const tooltipStyle: React.CSSProperties = {
    left: tooltipPosition.x + 15,
    top: tooltipPosition.y + 15
  }

  const createQueryString = useCreateQueryString()
  const url = '/content/choose-apartment-assets/apartment_drawing.png'
  const name = 'my-map'
  // GET JSON FROM BELOW URL AS AN EXAMPLE AND PUT IT HERE
  const areas = [
    {
      id: '469f9800-c45a-483f-b13e-bd24f3fb79f4',
      title: 'Hardwood',
      shape: 'poly',
      name: '1',
      fillColor: '#C9D9F0B3',
      strokeColor: 'black',
      coords: [74, 326, 206, 326, 207, 461, 76, 457, 76, 389],
      prefillColor: 'red'
    },
    {
      id: '469f9800-c45a-483f-123-bd24f3fb79f4',
      title: 'Hardwood',
      shape: 'poly',
      name: '12',
      fillColor: '#C9D9F0B3',
      strokeColor: 'black',
      coords: [5, 162, 209, 162, 209, 288, 123, 287, 120, 322, 76, 323, 75, 460, 6, 460],
      prefillColor: 'red'
    },
    {
      id: '469f9800-c45a-483f-123-bd24f3fb79f4',
      title: 'Hardwood',
      shape: 'poly',
      name: '12',
      fillColor: '#C9D9F0B3',
      strokeColor: 'black',
      coords: [454, 114, 411, 113, 410, 152, 338, 153, 337, 4, 614, 4, 614, 68, 455, 66],
      prefillColor: 'red'
    }
  ]

  // Стили для каждого брейкпоинта
  const styles = {
    md: {parentWidth: 320},
    lg: {parentWidth: 406},
    xl: {parentWidth: 439.757},
    xxl: {parentWidth: 503},
    xxxl: {parentWidth: 636}
  }

  const currentStyles = useResponsiveStyles(styles)

  return (
    <div className={s.root}>
      <Aside isLeft />

      <div className={s.content}>
        <H4Title className={s.title}>
          <span>Выберите квартиру</span>
        </H4Title>

        <div className={s.select_floor}>
          <span className={s.select_floor_title}>Этаж</span>

          {floorsItems.map((_, index) => (
            <button
              onClick={() => {
                router.push(pathname + '?' + createQueryString('floor', index))
              }}
              className={clsx(floor && +floor === index && s.active)}
              key={index}
            >
              {floorsItems.length - index}
            </button>
          ))}
        </div>
        <TransformWrapper initialScale={1}>
          <TransformComponent wrapperClass={s.transform_wrapper}>
            <div
              className={s.selector}
              onMouseLeave={() => {
                selectedAreaRef.current = null
              }}
            >
              <ImageMapper
                onClick={(area, _, evt) => handleAreaEnter(area as ApartmentArea, evt)}
                onMouseLeave={handleAreaLeave}
                onMouseMove={() => updateTooltipPosition()}
                parentWidth={currentStyles?.parentWidth}
                responsive
                ref={null}
                src={url}
                name={name}
                areas={areas}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>

        <div className={s.controls}>
          <button className={s.controls_back}>
            <div className={s.controls_back_box}>
              <ArrowIconStroke />
            </div>
            <div className={s.controls_back_text}>
              <ParagraphUI size='md'>
                <span>ВЕРНУТЬСЯ</span>
              </ParagraphUI>
              <ParagraphUI extraClass={s.sub_text} weight='regular' size='md'>
                к генплану
              </ParagraphUI>
            </div>
          </button>
          <div className={s.params}>
            <Select
              defaultValue='1'
              size='large'
              options={[
                {value: '1', label: '1 секция'},
                {value: '2', label: '2 секция'},
                {value: '3', label: '3 секция'},
                {value: '4', label: '4 секция'},
                {value: '5', label: '5 секция'}
              ]}
              className={s.select}
            />

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
              borderColor={'none'}
              buttonElementColor='white'
              buttonFill={'bronze-500'}
            />
            {/* {typeof activeSection === 'number' && (
              <button
                onClick={() => {
                  router.push(pathname + '?' + createQueryString('section', activeSection))
                }}
                className={s.controls_back}
              >
                <div className={s.controls_back_text}>
                  <ParagraphUI size='md'>
                    <span>ПРОДОЛЖИТЬ</span>
                  </ParagraphUI>
                  <ParagraphUI extraClass={s.sub_text} weight='regular' size='md'>
                    к планеровке
                  </ParagraphUI>
                </div>
                <div className={s.controls_back_box}>
                  <ArrowIconStroke />
                </div>
              </button>
            )} */}
          </div>
        </div>
      </div>
      {selectedAreaRef.current && (
        <div className={s.annotation} ref={tooltipRef} style={tooltipStyle}>
          <span className={s.description}>1-комнатная - 43.9 м2</span>
          <span className={s.price}>7 726 497 ₽</span>
          <ul className={s.params}>
            <li>4 этаж</li>
            <li>4 секция</li>
            <li>№ 104</li>
          </ul>

          <div className={s.annotation_controls}>
            <FullButton
              type={'Button'}
              extraClass={s.button}
              buttonBorderRadius={'6px'}
              buttonText={
                <div>
                  <span>параметры</span>
                </div>
              }
              activeButton={true}
              border={false}
              borderColor={'none'}
              buttonElementColor='white'
              buttonFill={'bronze-500'}
            />
            <BookmarkIcon />
            <CompareIcon />
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectApartment
