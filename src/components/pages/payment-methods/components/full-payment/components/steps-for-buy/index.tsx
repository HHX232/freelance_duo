import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react'
import {useState} from 'react'
import {stepsForBuySlides} from '@pages/payment-methods/components/full-payment/components/steps-for-buy/content'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import styles from './steps-for-buy.module.scss'
import useRouterNext from '@src/lib/hooks/useRouter'
import {NextButton, PrevButton} from '@pages/storerooms/components/carousel/components/EmblaCarouselArrowButtons'
import {Pagination} from 'swiper/modules'
import clsx from 'clsx'

export const StepsForBuy = () => {
  const {push} = useRouterNext()

  const [swiper, setSwiper] = useState<SwiperClass>()

  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext()
    }
  }

  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev()
    }
  }

  const handleSelectApartmentClick = () => {
    push('/planirovki-i-ceny')
  }

  return (
    <div className={clsx(styles.stepsForBuy, styles.content_container)}>
      <div className={styles.stepsForBuyHead}>
        <h3 className={styles.stepsForBuyHeadTitle}>ШАГИ ДО ПОКУПКИ КВАРТИРЫ</h3>

        <div className={styles.stepsForBuyHeadArrowGroup}>
          <PrevButton onClick={handlePrevSlide} />
          <NextButton onClick={handleNextSlide} />
        </div>
      </div>

      <Swiper
        pagination={{
          horizontalClass: styles.stepsForBuySliderPagination,
          bulletClass: styles.stepsForBuySliderPaginationBullet,
          bulletActiveClass: styles.stepsForBuySliderPaginationActive
        }}
        modules={[Pagination]}
        slidesPerView={'auto'}
        className={styles.stepsForBuySlider}
        onSwiper={setSwiper}
        wrapperClass={styles.stepsForBuySliderWrapper}
      >
        {stepsForBuySlides.map((slide, idx) => (
          <SwiperSlide key={`stepForBuy_${idx}`} className={styles.stepsForBuySlide}>
            <div className={styles.stepsForBuySlideCount}>
              <span>
                {idx < 10 && 0}
                {idx + 1}
              </span>
            </div>
            <h4 className={styles.stepsForBuySlideTitle}>{slide.title}</h4>
            {slide.isSelectApartment && (
              <div className={styles.button_wrapper}>
                <FilledButton onClick={handleSelectApartmentClick} className={styles.stepsForBuySlideButton}>
                  <span>Выбрать квартиру</span>
                </FilledButton>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
