import {
  DotButton,
  useDotButton
} from '@shared/phoneSlider/EmblaCarouselDotButton'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import {EmblaOptionsType} from 'embla-carousel'
import styles from './embla.module.scss'
import Gallery from '@shared/phoneSlider/Gallery'

interface PhoneSliderProps {

  slides: React.ReactNode[]
  options?: EmblaOptionsType
}

const PhoneSlider: React.FC<PhoneSliderProps> = (props) => {

  const {slides} = props
  const OPTIONS: EmblaOptionsType = {}
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [ClassNames()])
  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi)


  return (
    <div className={styles['phone-slider-wrapper']}>
      <Gallery slides={slides} options={OPTIONS} emblaRef={emblaRef} />
      <div className={styles['embla__dots']}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`${styles['embla__dot']} ${index === selectedIndex && styles['embla__dot--selected']}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PhoneSlider
