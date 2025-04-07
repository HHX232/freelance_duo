'use client'
import {FC} from 'react'
import Aside from '../aside/aside'

import s from './select-apartment.module.scss'
import H4Title from '@src/components/UI-kit/Typography/Headers/H4Title'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import clsx from 'clsx'
import {useCreateQueryString} from '@src/lib/hooks/createQueryString'
import ArrowIconStroke from '@icons/arrow_up.svg'
import ParagraphUI from '@src/components/UI-kit/Typography/Paragraph/Paragraph'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import SettingsIcon from '@icons/Menu point.svg'
import Image from 'next/image'

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
          <Image
            width={636}
            height={497}
            src={'/content/choose-apartment-assets/apartment_drawing.png'}
            alt='apartment_drawing'
          />
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
              borderColor={''}
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
