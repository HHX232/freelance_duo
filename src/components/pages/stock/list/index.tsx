'use client'

import {Title} from '@src/components/UI-kit/TextKit/title/title'
import {HeadTitle} from '@src/components/UI-kit/TextKit/head-title'

import './index.scss'
import FilledButton from '@shared/filledButton/FilledButton'
import {StockItem} from '@shared/stock-item'

const breadcrumbItems = [
  {title: 'Главная', href: '/'},
  {
    title: 'Акции',
    href: '/stocks'
  }
]

const MOCK_ITEMS = [
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image.png',
    title: 'Рассрочка на все готовое!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-1.png',
    title: 'Готовые квартиры со скидкой!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-2.png',
    title: 'Семейная ипотека: сейчас или никогда!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-3.png',
    title: 'покупай паркинг в рассрочку!'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-4.png',
    title: '10,83% - главная скидка этого года на квартиры в «Кронфорт»'
  },
  {
    tag: 'Бессрочная акция',
    imageSrc: '/stocks-example/preview-image-5.png',
    title: 'Лучше, чем ипотека: гибкая рассрочка с ежемесячным платежом от 30 тысяч рублей!'
  }
]

export const StocksList = () => {
  return (
    <div className={'page-container'}>
      <Title breadcrumbs={breadcrumbItems} style={{position: 'relative', margin: 0}} />
      <HeadTitle>Акции</HeadTitle>

      <div className='stocks'>
        <div className='stocks__list'>
          {MOCK_ITEMS.map((item, idx) => (
            <StockItem key={`stock-item-${idx}`} href={'/stocks/1'} {...item} />
          ))}
        </div>

        <div className='stocks__more'>
          <FilledButton className='stocks__more-button'>Показать еще (6)</FilledButton>
        </div>
      </div>
    </div>
  )
}
