import {FC} from 'react'
import {EmblaOptionsType} from 'embla-carousel'
import {EmblaViewportRefType} from 'embla-carousel-react'
import emblaStyle from './slider.module.scss'
interface PhoneSliderProps {
  slides: number[]
  options?: EmblaOptionsType
  emblaRef: EmblaViewportRefType
}

const Gallery: FC<PhoneSliderProps> = (props) => {
  const {slides, emblaRef} = props
  const imgArr = [
    '/content/banner.png',
    '/content/banner.png',
  ]

  return (
    <div className={emblaStyle['embla']}>
      <div className={emblaStyle['embla__viewport']} ref={emblaRef}>
        <div className={emblaStyle['embla__container']}>
          {slides?.map((index) => (
            <div className={emblaStyle['embla__slide']} key={index}>
              <img className={emblaStyle['embla__slide__img']} src={imgArr[index]} alt='Your alt text' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery
