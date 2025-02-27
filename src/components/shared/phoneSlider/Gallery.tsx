import React, {FC} from 'react'
import {EmblaOptionsType} from 'embla-carousel'
import {EmblaViewportRefType} from 'embla-carousel-react'
import emblaStyle from './embla.module.scss'
interface PhoneSliderProps {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  emblaRef: EmblaViewportRefType
}

const Gallery: FC<PhoneSliderProps> = (props) => {
  const {slides, emblaRef} = props


  return (
    <div className={emblaStyle['embla']}>
      <div className={emblaStyle['embla__viewport']} ref={emblaRef}>
        <div className={emblaStyle['embla__container']}>
          {slides.map((slide) => slide)}
        </div>
      </div>
    </div>
  )
}

export default Gallery
