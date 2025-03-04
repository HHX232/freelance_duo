'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Accordion as PrimeAccordeon, AccordionTab } from 'primereact/accordion'
import styles from './accordion.module.scss'
import { IAccordionItem } from './accordion.types'
import cn from 'clsx'

export interface AccordionProps {
  items: IAccordionItem[]
  extraClass?: string
  extraStyle?: React.CSSProperties
}
// export interface IAccordionItem {
//   header: string
//   children: React.ReactNode
//   disabled?: boolean
//   color?: accordionColors
//   font?: accordionFonts
//   size?: accordionSizes
// }
export interface AccordionArrowProps {
  arrowState: boolean
}
export const AccordionArrow = ({ arrowState }: AccordionArrowProps) => {
  return (
    <svg
      style={{
        transform: arrowState ? 'rotate(-180deg)' : 'rotate(0deg)'
      }}
      className={styles.arrow}
      width='18'
      height='10'
      viewBox='0 0 18 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.5 1.25L9 8.75L16.5 1.25'
        stroke='#FDF1CD'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default function Accordion({ items, extraClass, extraStyle }: AccordionProps) {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false)

  const onClickAccordion = () => {
    setAccordionIsOpen((prev) => !prev)
    console.log('accordionIsOpen', accordionIsOpen)
  }
  const createDynamicTabs = () => {
    return items.map((tab, i) => {
      return (
        <AccordionTab
          className={cn(
            styles.item,
            {
              [styles.white_text]: tab?.color === 'white',
              [styles.accent_text]: tab?.color !== 'white',
              [styles.romul_text]: tab?.font === 'romul',
              [styles.gotham_text]: tab?.font === 'gotham',
              [styles.gotham_text]: tab?.font !== 'romul',
              [styles.accentSmall_text]: tab?.size === 'accentSmall',
              [styles.accentMedium_text]: tab?.size === 'accentMedium',
              [styles.accentLarge_text]: tab?.size === 'accentLarge',
              [styles.defaultXXL]: tab?.size === 'defaultXXL',
              [styles.defaultXL]: tab?.size === 'defaultXL',
              [styles.defaultL]: tab?.size === 'defaultL',
              [styles.defaultM]: tab?.size === 'defaultM',
              [styles.defaultS]: tab?.size === 'defaultS',
              [styles.defaultXS]: tab?.size === 'defaultXS'
            },
            extraClass
          )}
          style={extraStyle}
          key={i}
          header={
            <span style={{ marginLeft: '12px' }}>
              {tab.header}
              <AccordionArrow arrowState={accordionIsOpen} />
            </span>
          }
        >
          {tab.children}
        </AccordionTab>
      )
    })
  }

  return (
    <div className='card'>
      <PrimeAccordeon onClick={onClickAccordion}>{createDynamicTabs()}</PrimeAccordeon>
    </div>
  )
}