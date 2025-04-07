'use client'
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react'
import {useEffect, useRef, useState} from 'react'
import {stepsForBuySlides} from '@pages/payment-methods/components/full-payment/components/steps-for-buy/content'
import styles from './steps-for-buy.module.scss'
import useRouterNext from '@src/lib/hooks/useRouter'
import {NextButton, PrevButton} from '@pages/storerooms/components/carousel/components/EmblaCarouselArrowButtons'
import {Pagination} from 'swiper/modules'
import clsx from 'clsx'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

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
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className={clsx(styles.stepsForBuy, styles.content_container, styles.unVisible, `${isVisible ? styles.visible : ""}`)} ref={sectionRef}>
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
              // <div className={styles.button_wrapper}>
              //   <FilledButton onClick={handleSelectApartmentClick} className={styles.stepsForBuySlideButton}>
              //     <span>Выбрать квартиру</span>
              //   </FilledButton>
              // </div>
              <span className={styles.button_wrapper} style={{width: '100%', zIndex: '7'}}>
                <FullButton
                  extraClass={styles.button_extra}
                  onClick={handleSelectApartmentClick}
                  buttonElementColor='white'
                  buttonText={'Узнать подробнее'}
                  activeButton
                  buttonBorderRadius='6px'
                  buttonFill='bronze-500'
                  border={false}
                  borderColor='none'
                />
              </span>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
