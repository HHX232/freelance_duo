import { ReactElement } from "react"
import s from './select-floor.module.scss'

interface IFloorDataItem {
  bounds: [[number, number], [number, number]]
  svg: ReactElement
  key: number
}
export const hoversData: IFloorDataItem[] = [
  {
    key: 4,
    bounds: [
      [595, 121],
      [595 + 266, 121 + 1920]
    ],
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1920 266' fill='none'>
        <path
          className={s.hover}
          d='M1799.5 265.5H0V243H8V209.5H24V110L8 101V72L0 67V0L763.5 7L770.5 34H1056.5L1067.5 7H1610L1613 4.5H1799.5V265.5Z'
          fill='white'
          fillOpacity='0.5'
        />
      </svg>
    )
  },
  {
    key: 3,
    bounds: [
      [430, 59],
      [430 + 156, 59 + 1920]
    ],
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1803 156' fill='none'>
        <path
          className={s.hover}
          d='M1802.5 0H4L26 11.5V112L11.5 111.5L10 112L11 113L10 145.5H0V147H2.5V156H4H1802.5V0Z'
          fill='white'
          fillOpacity='0.5'
        />
      </svg>
    )
  },
  {
    key: 2,

    bounds: [
      [260, 60],
      [260 + 167, 60 + 1920]
    ],
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1802 167' fill='none'>
        <path
          className={s.hover}
          d='M1801.5 0H0.5V22L23 28.5L21.5 131H4V133H6.5V165L0.5 167H1801.5V0Z'
          fill='white'
          fillOpacity='0.5'
        />
      </svg>
    )
  },
  {
    key: 1,
    bounds: [
      [48, 70],
      [48 + 215, 70 + 1920]
    ],
    svg: (
      <svg
        className={s.hover}
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        viewBox='0 0 1800 212'
        fill='none'
      >
        <path d='M0 0.5H2.5L1799.5 3V212L30.5 202.5V52L0 49V0.5Z' fill='white' fillOpacity='0.5' />
      </svg>
    )
  }
]
