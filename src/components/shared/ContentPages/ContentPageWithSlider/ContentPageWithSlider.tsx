'use client'
import {useState, useRef, useEffect} from 'react'
import styles from './index.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {Controller, A11y, EffectFade} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {AboutItem} from '@src/contentData/about_data'
import 'swiper/css/effect-fade'
import SliderButtons from '@src/components/UI-kit/BaseControls/buttons/sliderButtons/sliderButtons'
import SwiperCore from 'swiper'
import NextImage from 'next/image'

interface ContentPageData {
  data: AboutItem[]
  title?: string
}

export const ContentPageWithSlider = ({data, title}: ContentPageData) => {
  const firstSwiperRef = useRef<SwiperCore | null>(null)
  const secondSwiperRef = useRef<SwiperCore | null>(null)
  const [swiperState, setSwiperState] = useState({isBeginning: true, isEnd: false})

  useEffect(() => {
    const firstSwiper = firstSwiperRef.current
    const secondSwiper = secondSwiperRef.current

    if (firstSwiper && secondSwiper) {
      if (firstSwiper.controller && secondSwiper.controller) {
        firstSwiper.controller.control = secondSwiper
        secondSwiper.controller.control = firstSwiper
      }
    }
  }, [firstSwiperRef.current, secondSwiperRef.current])

  const handleSlideChange = (swiper: SwiperCore) => {
    if (!swiper) return
    setSwiperState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.img}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => {
            firstSwiperRef.current = swiper
            handleSlideChange(swiper) // Обновляем состояние при инициализации
          }}
          modules={[A11y, Controller, EffectFade]}
          effect='fade'
          onSlideChange={() => handleSlideChange(firstSwiperRef.current!)}
          style={{width: '100%'}}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              {/*<Image src={item.img} alt={item.alt} className={styles.image} />*/}
              <NextImage
                src={item.img}
                fill
                style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
                className={styles.image}
                alt={item.alt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.text}>
        <div className={styles.text_content}>
          <div className={styles.textBlock}>
            <h1 className={styles.active}>{title}</h1>
            <Swiper
              modules={[A11y, Controller]}
              onSwiper={(swiper) => {
                secondSwiperRef.current = swiper
                handleSlideChange(swiper) // Обновляем состояние при инициализации
              }}
              onSlideChange={() => handleSlideChange(secondSwiperRef.current!)}
              style={{marginLeft: '0', marginRight: '0', width: '100%', height: 'max-content'}}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  {() => (
                    <>
                      {/*<h1 className={clsx({[styles.active]: isActive})}>{item.title}</h1>*/}
                      <div className={styles.content}>{item.text}</div>
                      <div className={styles.arrows}>
                        {data.length > 1 && <SliderButtons swiperState={swiperState} />}
                      </div>
                    </>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPageWithSlider
