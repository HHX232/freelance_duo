'use client'

import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import {HeadTitle} from '@src/components/UI-kit/Text-Elements/TextKit/head-title'

import './index.scss'
import {StockItem} from '@shared/stock-item'
import {useState} from 'react'
import RefreshIcon from '@icons/refresh-cw.svg'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

const breadcrumbItems = [
  {title: 'Главная', href: '/'},
  {
    title: 'Наши акции',
    href: '/stocks'
  }
]

interface IMockItem {
  tag: string
  imageSrc: string
  title: string
}

const MOCK_ITEMS: IMockItem[] = [
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image.webp',
    title: 'Рассрочка на все готовое!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-1.webp',
    title: 'Готовые квартиры со скидкой!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-2.webp',
    title: 'Семейная ипотека: сейчас или никогда!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-3.webp',
    title: 'покупай паркинг в рассрочку!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-4.webp',
    title: '10,83% - главная скидка этого года на квартиры в «Кронфорт»'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-5.webp',
    title: 'Лучше, чем ипотека: гибкая рассрочка с ежемесячным платежом от 30 тысяч рублей!'
  }
]

const maxMockItemsLength = 12

export const StocksList = () => {
  const [itemsForRender, setItemsForRender] = useState<IMockItem[]>([...MOCK_ITEMS])

  return (
    <div className={'promotion-page-container'}>
      <Title breadcrumbs={breadcrumbItems} style={{position: 'relative', margin: 0}} />
      <HeadTitle className={'promotion-page_title'}>наши Акции</HeadTitle>

      <div className='stocks'>
        <div className='stocks__list'>
          {itemsForRender.map((item, idx) => (
            <StockItem key={`stock-item-${idx}`} href={'/stocks/1'} {...item} />
          ))}
        </div>

        <div className='stocks__more'>
          {itemsForRender.length >= maxMockItemsLength ? null : (
            <FullButton
              activeButton={true}
              border={false}
              borderColor={'none'}
              buttonFill={'bronze-500'}
              buttonElementColor={'white'}
              onClick={() => setItemsForRender((items) => [...items, ...MOCK_ITEMS])}
              extraClass='stocks__more-button'
              buttonText={
                <>
                  <RefreshIcon />
                  <span>Показать еще (6)</span>
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
