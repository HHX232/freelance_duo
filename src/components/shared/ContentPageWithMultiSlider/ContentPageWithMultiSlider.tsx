'use client'
import {useState, useRef, useEffect} from 'react'
import Image from '@src/components/UI-kit/image/Image'
import styles from './index.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {A11y, EffectFade, Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {ISliderItem} from '@src/contentData/landscaping'
import clsx from 'clsx'
import 'swiper/css/effect-fade'
import SliderButtons from '@shared/sliderButtons/sliderButtons'
import SwiperCore from 'swiper'

interface ContentPageData {
  data: ISliderItem[]
  title: string
}

export const ContentPageWithMultiSlider = ({data, title}: ContentPageData) => {
  const firstSwiperRef = useRef<SwiperCore | null>(null)
  const secondSwiperRef = useRef<SwiperCore | null>(null)
  const [swiperState, setSwiperState] = useState({isBeginning: true, isEnd: false})
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
    console.log(currentImageIndex)
  }

  const allImages = data.flatMap((item) => item.imgs)

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
          modules={[A11y, EffectFade, Pagination]}
          effect='fade'
          onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
          style={{width: '100%'}}
          pagination={{clickable: true}}
          className='swwiper-dots'
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={index}>
              <Image src={img} alt={`slide-${index}`} className={styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.text}>
        <div className={styles.text_container}>
          <div className={styles.textBlock}>
            <h1 className={styles.active} dangerouslySetInnerHTML={{__html: title}} />
            <Swiper
              modules={[A11y]}
              onSwiper={(swiper) => {
                secondSwiperRef.current = swiper
                handleSlideChange(swiper) // Обновляем состояние при инициализации
              }}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
            >
              {data.map((item, index) =>
                item.texts.map((text, textIndex) => (
                  <SwiperSlide key={`${index}-${textIndex}`}>
                    {() => (
                      <>
                        <div className={styles.text_content}>
                          <p>{text}</p>
                        </div>
                        <div
                          className={clsx(styles.arrows)}
                          style={swiperState.isBeginning || swiperState.isEnd ? {display: 'none'} : {}}
                        >
                          <SliderButtons swiperState={swiperState} />
                        </div>
                      </>
                    )}
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPageWithMultiSlider
