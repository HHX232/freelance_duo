import styles from './card.module.scss'
import {formatPrice} from '@src/lib/utils/formatPrice'
import {IObj} from '@src/types/object.interface'
import {Col, Row} from 'antd'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ArrowLeft from '@icon/arrow_left.svg'
import ArrowRight from '@icon/arrow_right.svg'
import {useEffect, useRef, useState} from 'react'
import {CompareCheckBox} from '@pages/compare/components/checkbox-compare'
import {useStore} from '@src/lib/store/store'
import NextImage from 'next/image'
import Link from 'next/link'
import {sendTmrEvent} from '@utils/tmrTracker'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

interface IProps {
  items: IObj[]
  dashboard?: boolean
  handleDifferent?: (value: boolean) => void
  isAuth: boolean
  isReservation: boolean
  setVisibleReservation: (value: boolean) => void
  setInfoModal: (value: boolean, ext_guid: string) => void
  isDifferences?: boolean
}

export const CompareCard = (props: IProps) => {
  const carouselRef = useRef<Carousel | null>(null)
  const {removeFromCompare, removeAllCompare} = useStore()
  const [showPrevArrow, setShowPrevArrow] = useState(false)
  const [showNextArrow, setShowNextArrow] = useState(false)

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next(1)
    }
  }

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(1)
    }
  }

  const updateArrowsVisibility = (currentSlide: number) => {
    const itemsToShow = responsive[getResponsiveKey()]?.items || responsive['superLargeDesktop'].items
    setShowPrevArrow(currentSlide > 0)
    setShowNextArrow(currentSlide < props.items.length - itemsToShow)
  }

  const getResponsiveKey = (): keyof typeof responsive => {
    return (
      (Object.keys(responsive).find((key) => {
        const {min, max} = responsive[key as keyof typeof responsive].breakpoint
        return window.innerWidth >= min && window.innerWidth <= max
      }) as keyof typeof responsive) || 'superLargeDesktop'
    )
  }

  useEffect(() => {
    if (carouselRef.current) {
      const {state} = carouselRef.current
      updateArrowsVisibility(state.currentSlide)
    }
  }, [props.items.length])

  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 1674},
      items: 8
    },
    desktop: {
      breakpoint: {max: 1674, min: 1348},
      items: 6
    },
    desktop_mini: {
      breakpoint: {max: 1348, min: 990},
      items: 5
    },
    tablet: {
      breakpoint: {max: 1080, min: 890},
      items: 4
    },
    mobile_middle: {
      breakpoint: {max: 890, min: 718},
      items: 3
    },
    mobile: {
      breakpoint: {max: 718, min: 0},
      items: 2
    }
  }

  const hasDifferences = (key: keyof IObj) => {
    const values = props.items.map((item) => item[key])
    return new Set(values).size > 1
  }

  return (
    <>
      <Row gutter={[0, 0]} justify='start' className={styles.carousel_container}>
        <div className={styles.carousel}>
          <div className={styles.actions_filter}>
            <button type='button' onClick={() => removeAllCompare()}>
              <svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.92747 7.50271L0 5.0009H1.15817V5C1.15817 3.61936 1.70815 2.36936 2.59732 1.46452C3.48649 0.559678 4.71483 -3.6035e-07 6.07156 -3.6035e-07C7.42829 -3.6035e-07 8.65664 0.559678 9.5458 1.46452C9.56444 1.48348 9.5828 1.50253 9.60108 1.52176L8.6892 2.70549C8.6333 2.63949 8.57501 2.57566 8.51451 2.51408C7.88937 1.87793 7.02567 1.48447 6.07156 1.48447C5.11745 1.48447 4.25375 1.87793 3.62862 2.51408C3.00349 3.15023 2.61675 4.02916 2.61675 5.00009V5.00099H3.85486L1.92747 7.50271ZM6.07156 8.51562C5.11745 8.51562 4.25375 8.12216 3.62862 7.48601C3.56829 7.42461 3.51026 7.36105 3.45455 7.29532L2.54267 8.47896C2.56077 8.49792 2.57895 8.51688 2.59732 8.53557C3.48649 9.44032 4.71483 10 6.07156 10C7.42829 10 8.65664 9.44032 9.5458 8.53548C10.4345 7.63109 10.9843 6.382 10.985 5.00235H12.1429L10.2154 2.50054L8.28791 5.00235H9.52628C9.52566 5.97228 9.1391 6.85031 8.51451 7.48601C7.88937 8.12216 7.02567 8.51562 6.07156 8.51562Z'
                  fill='#A5B7BF'
                />
              </svg>
              <span>Очистить</span>
            </button>
            <CompareCheckBox
              onChoose={(value) => props.handleDifferent && props.handleDifferent(value)}
              dashboard={props.dashboard}
            />
          </div>

          <div className={styles.arrows}>
            {showPrevArrow && (
              <button type='button' onClick={handlePrev} className='custom-left-arrow'>
                <ArrowLeft className={props.dashboard ? styles.arrow : ''} />
              </button>
            )}
            {showNextArrow && (
              <button type='button' onClick={handleNext} className='custom-right-arrow'>
                <ArrowRight className={props.dashboard ? styles.arrow : ''} />
              </button>
            )}
          </div>

          <ul className={styles.list_title}>
            {(!props.isDifferences || hasDifferences('Building')) && <li>Корпус</li>}
            {(!props.isDifferences || hasDifferences('Floor')) && <li>Этаж</li>}
            {(!props.isDifferences || hasDifferences('Plandate')) && <li>Сдача</li>}
            {(!props.isDifferences || hasDifferences('Fvalue')) && <li>Стоимость</li>}
          </ul>

          <Carousel
            responsive={responsive}
            arrows={false}
            ref={carouselRef}
            afterChange={(_, {currentSlide}) => {
              updateArrowsVisibility(currentSlide)
            }}
          >
            {props.items.length > 0 &&
              props.items.map((data) => (
                <div key={data.id}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                    <article className={styles.card} key={data.id}>
                      <button className={styles.cardHeader} type='button' onClick={() => removeFromCompare(data.id)}>
                        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M2.92561 2.92492C6.82642 -0.974974 13.1736 -0.974974 17.0744 2.92492C20.9752 6.8249 20.9752 13.1705 17.0744 17.0704C15.1848 18.9596 12.6724 20 10 20C7.3276 20 4.81522 18.9596 2.92561 17.0704C-0.975203 13.1705 -0.975203 6.8249 2.92561 2.92492ZM3.77585 16.2203C5.43834 17.8825 7.64879 18.7979 10 18.7979C12.3512 18.7979 14.5617 17.8825 16.2242 16.2203C19.6562 12.7892 19.6562 7.20618 16.2242 3.77496C14.5081 2.05935 12.2541 1.20159 10 1.20159C7.74589 1.20159 5.49186 2.05935 3.77585 3.77496C0.343823 7.20618 0.343823 12.7892 3.77585 16.2203Z'
                            fill='#BABABA'
                          />
                          <path
                            d='M6.15607 6.15265C6.39082 5.91787 6.77148 5.91787 7.00622 6.15265L10.0017 9.14731L12.9971 6.15265C13.2319 5.91787 13.6125 5.91787 13.8474 6.15265C14.0821 6.38734 14.0821 6.76791 13.8474 7.00269L10.8519 9.99735L13.8474 12.9921C14.0821 13.2268 14.0821 13.6074 13.8474 13.8421C13.73 13.9594 13.5761 14.0182 13.4223 14.0182C13.2684 14.0182 13.1146 13.9594 12.9971 13.8421L10.0017 10.8474L7.00622 13.8421C6.88889 13.9594 6.735 14.0182 6.5811 14.0182C6.42721 14.0182 6.2734 13.9594 6.15607 13.8421C5.92123 13.6074 5.92123 13.2268 6.15607 12.9921L9.15144 9.99735L6.15607 7.00269C5.92123 6.76791 5.92123 6.38734 6.15607 6.15265Z'
                            fill='#BABABA'
                          />
                        </svg>
                      </button>
                      <Link href={`/apartment-card/${data.id}`}>
                        <NextImage
                          src={data.flat_plan}
                          fill
                          style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
                          className={styles.image}
                          alt='Image'
                        />
                        <h2 className={styles.title}>
                          {data.Type} - {data.Tsquare} м2
                        </h2>
                      </Link>

                      {props.isReservation && (
                        <FullButton
                          borderColor={'none'}
                          buttonFill={'bronze-500'}
                          buttonText={'Забронировать'}
                          buttonElementColor={'white'}
                          buttonBorderRadius={'6px'}
                          extraClass={styles.reservation}
                          activeButton={true}
                          onClick={() => {
                            !props.isAuth ? props.setVisibleReservation(true) : props.setInfoModal(true, data.ext_guid)
                            sendTmrEvent('book', data.id, data.Fvalue)
                          }}
                          border={false}
                        />
                      )}

                      <ul className={styles.list}>
                        {(!props.isDifferences || hasDifferences('Building')) && (
                          <li className={styles.listItem}>
                            <span>{data.Building}</span>
                          </li>
                        )}
                        {(!props.isDifferences || hasDifferences('Floor')) && (
                          <li className={styles.listItem}>
                            <span>{data.Floor}</span>
                          </li>
                        )}
                        {(!props.isDifferences || hasDifferences('Plandate')) && (
                          <li className={styles.listItem}>
                            <span>{data.Plandate}</span>
                          </li>
                        )}
                        {(!props.isDifferences || hasDifferences('Fvalue')) && (
                          <li className={styles.listItem}>
                            <span>{formatPrice(parseFloat(data.Fvalue.replace(/\s/g, '')))}</span>
                          </li>
                        )}
                      </ul>
                      <div className={styles.price_container}>
                        <span className={styles.price}></span>
                      </div>
                    </article>
                  </Col>
                </div>
              ))}
          </Carousel>
        </div>
      </Row>
    </>
  )
}
