'use client'

import styles from './carousel.module.scss'
import {EmblaOptionsType} from 'embla-carousel'
import EmblaCarousel from '@pages/storerooms/components/carousel/components/EmblaCarousel'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from '@pages/storerooms/components/carousel/components/EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import {DotButton, useDotButton} from '@pages/storerooms/components/carousel/components/EmblaCarouselDotButton'

const Carousel = () => {
  const OPTIONS: EmblaOptionsType = {loop: true}
  const SLIDE_COUNT = 4
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [ClassNames()])

  const {prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick} = usePrevNextButtons(emblaApi)
  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi)

  return (
    <div className={styles['block-wrapper']}>
      <div className={styles['gallery-wrapper']}>
        <div className={styles['title']}>
          Типовые решения кладовых{' '}
          <div className={styles['button_wrapper']}>
            <div className={styles['embla__buttons']}>
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
          </div>
        </div>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} emblaRef={emblaRef} emblaApi={emblaApi} />
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
    </div>
  )
}

export default Carousel
