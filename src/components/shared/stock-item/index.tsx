import Link from 'next/link'
import SlantedArrowIcon from '@icon/slanted-arrow.svg'
import {FC} from 'react'
import './index.scss'

interface IStockItemProps {
  href: string
  imageSrc: string
  tag: string
  title: string
}

export const StockItem: FC<IStockItemProps> = ({href, imageSrc, tag, title}) => {
  return (
    <Link href={href} className='stocks__item' style={{backgroundImage: `url(${imageSrc})`}}>
      <div className='stocks__item-tag'>{tag}</div>

      <div className='stocks__item-plate'>
        <div className='stocks__item-title'>{title}</div>
        <div className='stocks__item-more'>
          <span className='stocks__item-more__text'>ПОДРОБНЕЕ</span>
          <SlantedArrowIcon className='stocks__item-more__icon' />
        </div>
      </div>
    </Link>
  )
}
