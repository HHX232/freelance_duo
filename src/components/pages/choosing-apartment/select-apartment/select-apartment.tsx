'use client'
import {FC} from 'react'
import Aside from '../aside/aside'

import s from './select-apartment.module.scss'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import clsx from 'clsx'
import {useCreateQueryString} from '@src/lib/hooks/createQueryString'
import ArrowIconStroke from '@icons/arrow_up.svg'

import SettingsIcon from '@icons/Menu point.svg'
import Image from 'next/image'
import H4Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H4Title'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import ImageMapper from 'react-img-mapper'
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

const SelectApartment: FC<ISelectApartmentProps> = () => {
  const params = useSearchParams()
  const floor = params.get('floor')
  const router = useRouter()
  const pathname = usePathname()

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
      fillColor: '#eab54d4d',
      strokeColor: 'black',
      coords: [74, 326, 206, 326, 207, 461, 76, 457, 76, 389],
      prefillColor: 'red'
    },
    {
      id: '469f9800-c45a-483f-123-bd24f3fb79f4',
      title: 'Hardwood',
      shape: 'poly',
      name: '12',
      fillColor: '#eab54d4d',
      strokeColor: 'black',
      coords: [5, 162, 209, 162, 209, 288, 123, 287, 120, 322, 76, 323, 75, 460, 6, 460],
      prefillColor: 'red'
    }
  ]

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
        <div className={s.selector}>
          <ImageMapper width={636} height={497} ref={null} src={url} name={name} areas={areas} />
        </div>

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
    </div>
  )
}

export default SelectApartment
