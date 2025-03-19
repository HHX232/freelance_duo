'use client'
import {IProgressItem} from '@src/types/progress.interface'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import styles from './item.module.scss'
import {Carousel, ConfigProvider, Select} from 'antd'
import {useEffect, useRef, useState} from 'react'
import DropdownIcon from '@icon/dropdown_arrow.svg'
import NextImage from 'next/image'
import {NoObjects} from '@shared/no-objects/no-objects'
import {CarouselRef} from 'antd/lib/carousel'
import clsx from 'clsx'

export const ProgressObj = ({progress}: {progress: IProgressItem}) => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/'},
    {title: 'Ход строительства', href: '/gallery'},
    {title: `${progress.name}`}
  ]

  const options = progress.months.map((item) => ({
    value: item.name,
    label: item.name
  }))

  const [selectedMonth, setSelectedMonth] = useState(options.length > 0 ? options[options.length - 1].value : '')
  const [currentSlide, setCurrentSlide] = useState(0)

  const [carouselKey, setCarouselKey] = useState(0)

  const handleCategoryChange = (value: string) => {
    setSelectedMonth(value)
    setCurrentSlide(0)
    setCarouselKey((prevKey) => prevKey + 1)
  }

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next)
      console.log(current)
    }
  }

  const currentMonth = progress.months.find((month) => month.name === selectedMonth) ?? {name: '', images: []}

  const handlePrevMonth = () => {
    const currentIndex = options.findIndex((option) => option.value === selectedMonth)
    if (currentIndex > 0) {
      setSelectedMonth(options[currentIndex - 1].value)
      setCurrentSlide(0)
      setCarouselKey((prevKey) => prevKey + 1)
    }
  }

  const handleNextMonth = () => {
    const currentIndex = options.findIndex((option) => option.value === selectedMonth)
    if (currentIndex < options.length - 1) {
      setSelectedMonth(options[currentIndex + 1].value)
      setCurrentSlide(0)
      setCarouselKey((prevKey) => prevKey + 1)
    }
  }

  const CustomPrevArrow = () => (
    <button
      className={`${styles.prevArrow} ${currentSlide === 0 ? styles.disabled : ''}`}
      onClick={prevSlide}
      disabled={currentSlide === 0}
    >
      <svg width='51' height='51' viewBox='0 0 51 51' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='25.5' cy='25.5' r='25.5' fill='white' />
        <path
          d='M21.9789 25.3395C21.9789 25.219 21.9981 25.1068 22.0366 25.003C22.075 24.8991 22.1411 24.8004 22.2347 24.7068L26.7289 20.2126C26.8673 20.0741 27.0414 20.0033 27.251 20.0001C27.4606 19.9969 27.6378 20.0677 27.7827 20.2126C27.9276 20.3575 28 20.5331 28 20.7395C28 20.9459 27.9276 21.1215 27.7827 21.2664L23.7096 25.3395L27.7827 29.4126C27.9212 29.5511 27.992 29.7251 27.9952 29.9347C27.9984 30.1443 27.9276 30.3215 27.7827 30.4664C27.6378 30.6113 27.4622 30.6837 27.2558 30.6837C27.0494 30.6837 26.8737 30.6113 26.7289 30.4664L22.2347 25.9722C22.1411 25.8786 22.075 25.7799 22.0366 25.676C21.9981 25.5722 21.9789 25.46 21.9789 25.3395Z'
          fill={currentSlide === 0 ? '#ccc' : '#555555'}
        />
      </svg>
    </button>
  )

  const CustomNextArrow = () => (
    <button
      className={`${styles.nextArrow} ${currentSlide >= (currentMonth?.images.length ?? 0) - 1 ? styles.disabled : ''}`}
      onClick={nextSlide}
      disabled={currentSlide >= (currentMonth?.images.length ?? 0) - 1}
      // style={{ visibility: currentSlide >= (currentMonth?.images.length ?? 0) - 1 ? 'hidden' : 'visible' }}
    >
      <svg width='51' height='51' viewBox='0 0 51 51' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='25.5' cy='25.5' r='25.5' transform='rotate(-180 25.5 25.5)' fill='white' />
        <path
          d='M29.0211 25.6605C29.0211 25.781 29.0019 25.8932 28.9634 25.997C28.925 26.1009 28.8589 26.1996 28.7653 26.2932L24.2711 30.7874C24.1327 30.9259 23.9586 30.9967 23.749 30.9999C23.5394 31.0031 23.3622 30.9323 23.2173 30.7874C23.0724 30.6425 23 30.4669 23 30.2605C23 30.0541 23.0724 29.8785 23.2173 29.7336L27.2904 25.6605L23.2173 21.5874C23.0788 21.4489 23.008 21.2749 23.0048 21.0653C23.0016 20.8557 23.0724 20.6785 23.2173 20.5336C23.3622 20.3887 23.5378 20.3163 23.7442 20.3163C23.9506 20.3163 24.1263 20.3887 24.2711 20.5336L28.7653 25.0278C28.8589 25.1214 28.925 25.2201 28.9634 25.324C29.0019 25.4278 29.0211 25.54 29.0211 25.6605Z'
          fill={currentSlide >= (currentMonth?.images.length ?? 0) - 1 ? '#ccc' : '#555555'}
        />
      </svg>
    </button>
  )

  const MonthPrevArrow = () => {
    const currentIndex = options.findIndex((option) => option.value === selectedMonth)
    return (
      <button
        onClick={handlePrevMonth}
        disabled={currentIndex === 0}
        style={{visibility: currentIndex === 0 ? 'hidden' : 'visible', alignItems: 'flex-start'}}
        className={styles.month_arrow}
      >
        <span>{currentIndex > 0 && options[currentIndex - 1].label}</span>
        <svg width='81' height='16' viewBox='0 0 81 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0.292892 7.29289C-0.0976334 7.68342 -0.0976334 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM81 7L1 7V9L81 9V7Z'
            fill='#555555'
          />
        </svg>
      </button>
    )
  }

  const MonthNextArrow = () => {
    const currentIndex = options.findIndex((option) => option.value === selectedMonth)
    return (
      <button
        onClick={handleNextMonth}
        disabled={currentIndex === options.length - 1}
        style={{display: currentIndex === options.length - 1 ? 'none' : 'flex', alignItems: 'flex-end'}}
        className={styles.month_arrow}
      >
        <span>{currentIndex < options.length - 1 && options[currentIndex + 1].label}</span>
        <svg width='81' height='16' viewBox='0 0 81 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M80.7071 8.70712C81.0976 8.3166 81.0976 7.68343 80.7071 7.29291L74.3431 0.928945C73.9526 0.538421 73.3195 0.538421 72.9289 0.928945C72.5384 1.31947 72.5384 1.95263 72.9289 2.34316L78.5858 8.00001L72.9289 13.6569C72.5384 14.0474 72.5384 14.6806 72.9289 15.0711C73.3195 15.4616 73.9526 15.4616 74.3431 15.0711L80.7071 8.70712ZM-1.74846e-07 9L80 9.00001L80 7.00001L1.74846e-07 7L-1.74846e-07 9Z'
            fill='#555555'
          />
        </svg>
      </button>
    )
  }

  const carouselRef = useRef<CarouselRef | null>(null)

  const prevSlide = () => {
    carouselRef.current?.prev()
  }

  const nextSlide = () => {
    carouselRef.current?.next()
  }

  useEffect(() => {
    setCurrentSlide(0)
  }, [selectedMonth])

  return (
    <MainContainer>
      <div className={styles.title}>
        <Title title={progress.name} breadcrumbs={breadcrumbItems} />
        {currentMonth?.images.length > 0 && (
          <div className={styles.month}>
            <span>Выберите период</span>
            <ConfigProvider theme={{token: {colorPrimary: '#F47422'}}}>
              <Select
                suffixIcon={<DropdownIcon />}
                onChange={handleCategoryChange}
                style={{marginBottom: '20px', height: '40px', width: '100%', maxWidth: '456px'}}
                options={options}
                className={styles.select}
                value={selectedMonth}
              />
            </ConfigProvider>
          </div>
        )}
      </div>

      <div className={clsx(styles.progress_item, currentMonth?.images.length === 0 && styles.no_images)}>
        <div className={styles.img}>
          {currentMonth?.images.length > 0 ? (
            <>
              <Carousel
                key={carouselKey}
                {...settings}
                className={styles.carousel}
                rootClassName='carousel-progress'
                arrows={false}
                ref={carouselRef}
              >
                {currentMonth?.images.map((image, index) => (
                  <div key={index} className={styles.imageContainer}>
                    <NextImage
                      src={image}
                      alt={`image-${index}`}
                      width={2560}
                      height={720}
                      style={{objectFit: 'cover', objectPosition: 'bottom'}}
                      quality={100}
                      unoptimized={true}
                    />
                  </div>
                ))}
              </Carousel>
              <div className={styles.arrowsContainer}>
                <CustomPrevArrow />
                <CustomNextArrow />
              </div>
              <div className={styles.slideIndicator}>
                {currentSlide + 1} / {currentMonth?.images.length}
              </div>
            </>
          ) : (
            <NoObjects>
              <p>Фотографии отсутствуют</p>
            </NoObjects>
          )}
        </div>

        {currentMonth?.images.length > 0 && (
          <div className={styles.navigation}>
            <MonthPrevArrow />
            <MonthNextArrow />
          </div>
        )}
      </div>
    </MainContainer>
  )
}
