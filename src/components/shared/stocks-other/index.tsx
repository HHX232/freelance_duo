'use client'

import {StockItem} from '@shared/stock-item'
import s from './stock.other.module.scss'
import {IStockItemProps} from '@shared/stock-item/types'
import {FC, useEffect, useState} from 'react'
import ArrowUpIcon from '@icons/arrow_up.svg'

import React from 'react'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import {useWindowWidth} from '@shared/page/header/components/HeaderMenu/hooks/useWindowWidth'

const MOCK_DATA: IStockItemProps[] = [
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image.png',
    title: 'Рассрочка на все готовое!',
    href: '/stocks/1'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-1.png',
    title: 'Готовые квартиры со скидкой!',
    href: '/stocks/1'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-2.png',
    title: 'Семейная ипотека: сейчас или никогда!',
    href: '/stocks/1'
  }
]

interface IStocksOtherProps {
  data?: IStockItemProps[]
  className?: string
}

const defaultRenderLength = 3
const md = 768
const xxl = 1600

export const StocksOther: FC<IStocksOtherProps> = ({data = MOCK_DATA, className}) => {
  const width = useWindowWidth()

  const [dataLength, setDataLength] = useState(defaultRenderLength)

  useEffect(() => {
    if (width && width >= md && width < xxl) {
      setDataLength(2)
    } else {
      setDataLength(defaultRenderLength)
    }
  }, [width])

  return (
    <section className={`${s.section} ${className}`}>
      <div className={s.header}>
        <h2 className={s.title}>Другие акции</h2>

        {width && width >= 768 && (
          <a className={`${s.more_link}`} href='/stocks/1'>
            <span>все акции</span>
            <ArrowUpIcon />
          </a>
        )}
      </div>

      <div className={s.list}>
        {data.map((item, index) => {
          if (index >= dataLength) return null

          return (
            <div className={s.card_wrapper}>
              <StockItem key={`stock-item-${index}`} {...item} />
            </div>
          )
        })}
      </div>

      {width && width < 768 && (
        <a className={`${s.more_link}`} href='/stocks/1'>
          <span>все акции</span>
          <ArrowUpIcon />
        </a>
      )}
    </section>
  )
}
