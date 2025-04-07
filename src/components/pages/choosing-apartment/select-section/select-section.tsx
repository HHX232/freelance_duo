'use client'
import {FC, ReactElement, useState} from 'react'
import Aside from '../aside/aside'

import s from './select-section.module.scss'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import clsx from 'clsx'
import {useCreateQueryString} from '@src/lib/hooks/createQueryString'
import ArrowIconStroke from '@icons/arrow_up.svg'

import SettingsIcon from '@icons/Menu point.svg'
import H4Title from '@src/components/UI-kit/Text-Elements/Typography/Headers/H4Title'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

interface ISelectSectionProps {}

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

interface ISectionItem {
  svg: ReactElement
  x: number
  y: number
  sectionKey: {
    key: number
    y: number
    x: number
  }
}
const sectionsData: ISectionItem[] = [
  {
    y: 0,
    x: -10,
    sectionKey: {
      key: 2,
      x: 33,
      y: 19
    },
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='172' height='131' viewBox='0 0 172 131' fill='none'>
        <path
          d='M113.709 85.6093L170.237 85.6093L170.237 2.08298L2.678 2.08299L2.67801 128.469L79.9609 128.469L79.9609 71.9413L113.709 71.9413L113.709 85.6093Z'
          fill='#11627D'
          fillOpacity='0.24'
          stroke='#11627D'
          strokeWidth='3.51943'
        />
      </svg>
    )
  },
  {
    y: -7,
    x: 162,
    sectionKey: {
      key: 8,
      x: 70,
      y: 25
    },
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='151' height='95' viewBox='0 0 151 95' fill='none'>
        <path
          d='M2.29955 92.938L148.766 92.938L148.766 9.24294L111.306 9.24295L103.712 3.67453L95.9502 9.24295L56.4651 9.24295L48.703 2.99957L40.0973 9.07421L2.29954 9.07422L2.29955 92.938Z'
          fill='#11627D'
          fillOpacity='0.08'
          stroke='#91BBCC'
          strokeWidth='3.51943'
        />
      </svg>
    )
  },
  {
    y: 0,
    x: 312,
    sectionKey: {
      key: 7,
      x: 83,
      y: 19
    },
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='138' height='128' viewBox='0 0 112 103' fill='none'>
        <path
          d='M110.351 24.4344L110.351 100.664L46.003 100.263L46.003 85.044L53.2121 85.044L53.2121 58.6107L32.2524 58.6107L32.2524 68.2228L1.54716 68.2228L1.54716 1.87277L88.9904 1.87277L88.9904 4.94329L101.54 4.94329L108.482 11.8853L108.482 24.4344L110.351 24.4344Z'
          fill='#11627D'
          fillOpacity='0.24'
          stroke='#11627D'
          strokeWidth='2.78445'
        />
      </svg>
    )
  },
  {
    y: 124,
    x: 342,
    sectionKey: {
      key: 6,
      x: 54,
      y: 70
    },
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='108' height='201' viewBox='0 0 108 201' fill='none'>
        <path
          d='M89.6837 151.328L89.6837 195.2L89.6837 198.575L2.44512 198.575L2.44512 158.415L12.907 158.415L12.907 17.0105L24.2126 17.0105L24.2126 2.3301L106.22 2.33009L106.22 151.328L89.6837 151.328Z'
          fill='#11627D'
          fillOpacity='0.24'
          stroke='#11627D'
          strokeWidth='3.51943'
        />
      </svg>
    )
  },
  {
    y: 323,
    x: 135,
    sectionKey: {
      key: 5,
      x: 254,
      y: 80
    },
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='301' height='169' viewBox='0 0 301 169' fill='none'>
        <path
          d='M298.685 2.07561L298.685 166.935L2.37762 140.949L9.29598 70.0778L10.9834 56.7474L174.155 72.9464L174.155 84.4207L220.727 87.9643L220.727 56.7474L212.121 56.7474L212.121 2.07561L298.685 2.07561Z'
          fill='#11627D'
          fillOpacity='0.08'
          stroke='#91BBCC'
          strokeWidth='3.51943'
        />
      </svg>
    )
  },
  {
    y: 295,
    x: -11,
    sectionKey: {
      key: 4,
      x: 44,
      y: 80
    },
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='154' height='170' viewBox='0 0 154 170' fill='none'>
        <path
          d='M1.79669 156.099L144.12 167.742L151.376 95.3527L77.7297 89.6156L77.7297 60.4236L93.9287 60.4236L93.9287 2.377L1.79668 2.37701L1.79669 156.099Z'
          fill='#11627D'
          fillOpacity='0.24'
          stroke='#11627D'
          strokeWidth='3.51943'
        />
      </svg>
    )
  },
  {
    y: 128,
    x: -11,
    sectionKey: {
      key: 4,
      x: 44,
      y: 80
    },
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='96' height='170' viewBox='0 0 96 170' fill='none'>
        <path
          d='M1.96644 167.926L93.761 167.926L93.761 38.5027L78.7431 38.5027L78.7431 1.88612L1.96642 1.88613L1.96644 167.926Z'
          fill='#11627D'
          fillOpacity='0.24'
          stroke='#11627D'
          strokeWidth='3.51943'
        />
      </svg>
    )
  }
]

const SelectSection: FC<ISelectSectionProps> = () => {
  const params = useSearchParams()
  const floor = params.get('floor')
  const router = useRouter()
  const pathname = usePathname()

  const [activeSection, setActiveSEction] = useState<null | number>()

  const createQueryString = useCreateQueryString()

  return (
    <div className={s.root}>
      <Aside isLeft />

      <div className={s.content}>
        <H4Title className={s.title}>
          <span>Выберите секцию</span>
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
          {sectionsData.map((item, index) => (
            <button
              onClick={() => {
                setActiveSEction(index)
              }}
              className={clsx(typeof activeSection === 'number' && activeSection === index && s.active)}
              style={{
                left: item.x,
                top: item.y
              }}
              key={index}
            >
              {item.svg}
              <span
                style={{
                  top: item.sectionKey.y,
                  left: item.sectionKey.x
                }}
              >
                {item.sectionKey.key}
              </span>
            </button>
          ))}
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
            {typeof activeSection === 'number' && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectSection
