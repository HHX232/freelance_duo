import {FC} from 'react'
import {EmblaOptionsType} from 'embla-carousel'
import {EmblaViewportRefType} from 'embla-carousel-react'
import emblaStyle from './embla.module.scss'
interface PhoneSliderProps {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  emblaRef: EmblaViewportRefType
  viewportIsShow?: boolean
  slideGap?: number
  embalaContainerClassName?: string
}

const Gallery: FC<PhoneSliderProps> = (props) => {
  const {slides, emblaRef, viewportIsShow, slideGap = 10, embalaContainerClassName} = props

  return (
    <div className={emblaStyle['embla']}>
      <div
        className={`${emblaStyle['embla__viewport']} ${viewportIsShow ? emblaStyle.show_viewport : ''}`}
        ref={emblaRef}
      >
        <div style={{gap: slideGap + 'px'}} className={`${emblaStyle['embla__container']} ${embalaContainerClassName}`}>
          {slides.map((slide) => slide)}
        </div>
      </div>
    </div>
  )
}

export default Gallery
