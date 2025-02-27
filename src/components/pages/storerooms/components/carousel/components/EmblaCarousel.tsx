import {EmblaCarouselType, EmblaOptionsType} from 'embla-carousel'
// import {
//   NextButton, PrevButton,
//   usePrevNextButtons
// } from '@pages/storerooms/components/carousel/components/EmblaCarouselArrowButtons'
import {EmblaViewportRefType} from 'embla-carousel-react'
import emblaStyle from './embla.module.scss'

interface PropType {
  slides: number[]
  options?: EmblaOptionsType
  emblaRef: EmblaViewportRefType
  emblaApi: EmblaCarouselType | undefined
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const {slides, emblaRef} = props
  const imgArr = [
    '/content/storerooms/carousel/st_1.jpeg',
    '/content/storerooms/carousel/st_2.jpeg',
    '/content/storerooms/carousel/st_3.jpeg',
    '/content/storerooms/carousel/st_4.jpeg'
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

export default EmblaCarousel
