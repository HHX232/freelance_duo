'use client'
import React, { Suspense, useEffect, useState } from 'react'
import styles from './Map.module.scss'
import { DirectionHint, PinType, Point } from './model'
import MouseMover from '@shared/mouse-mover/MouseMover'
import { useIsMobile } from '@utils/useIsMobile'
import clsx from 'clsx'
import Pin from '@pages/map/pin/pin'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import Head from 'next/head'
import ArrowUpSVG from '@icons/arrow_up.svg'
import CornerSVG from '@icons/corner.svg'
import Page from '@shared/page/Page'
import AreasPage from '@pages/areas/Areas'
import FortovPage from '@pages/fortov/Fortov'
import TransportPage from '@pages/transport/Transport'
import HomePage from '@pages/home/Home.page'
import ContactFormPage from '@pages/contact-form/ContactForm'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'

const Preloader = dynamic(() => import('./preloader/Preloader'), { ssr: false })
const Compass = dynamic(() => import('./card/Compass'), { ssr: false })
const Card = dynamic(() => import('./card/CompassCard'), { ssr: false })

const directionHints: DirectionHint[] = [
  {
    name: "ЖК «Набережная»",
    coords: {
      x: 49,
      y: 10
    },
    coords_mob: {
      x: 31,
      y: 10
    }
  },
  {
    name: "КАД (10 мин.)",
    coords: {
      x: 59,
      y: 10
    },
    coords_mob: {
      x: 56,
      y: 10
    },
    icon: <ArrowUpSVG />
  },
  {
    name: "Кронштадское шоссе (3 мин.)",
    coords: {
      x: 76,
      y: 10
    }
  },
  {
    name: "ЖК «Центральный»",
    coords: {
      x: 74,
      y: 28
    }
  },
]

const points: Point[] = [
  {
    name: 'Набережная',
    text: 'Органично встроенный в общий облик города квартал с многофункциональной инфраструктурой, отвечающей высоким стандартам жилой среды. Видовые квартиры, умиротворяющие прогулки по морскому побережью и бесконечная водная гладь, настраивающая на неспешный ритм жизни.',
    color: '#008D88',
    coords: {
      x: 49.5,
      y: 12
    },
    coords_mob: {
      x: 42.5,
      y: 12
    }
  },
  {
    name: 'Центральный',
    text: 'Малоэтажный квартал, формирующий образ жизни на морском побережье в окружении актуальной архитектуры и современных инфраструктурных решений для жизни и досуга. Квартал «Кронфорт. Центральный» прилегает непосредственно к парку рекреационного кластера «Остров фортов», предлагая его жителям дополнительные культурно-досуговые возможности.',
    color: '#FF7314',
    coords: {
      x: 67.5,
      y: 27.5
    },
    coords_mob: {
      x: 55,
      y: 24
    }
  }
]

const pins: PinType[] = [
  {
    name: 'Музей военно-морской славы',
    coords: {
      x: 38.5,
      y: 40.5
    }
  },
  {
    name: 'Тематический парк «Остров фортов»',
    coords: {
      x: 53.8,
      y: 53.5
    }
  },
  {
    name: 'Бизнес-отель 3*',
    coords: {
      x: 59,
      y: 32
    },
    coords_mob: {
      x: 59.8,
      y: 30
    }
  },
  // {
  //   name: 'Торговый променад',
  //   coords: {
  //     x: 63.9,
  //     y: 31.5
  //   },
  //
  //   coords_mob: {
  //     x: 63,
  //     y: 28.5
  //   }
  // },
  {
    name: 'Океанариум',
    coords: {
      x: 64.3,
      y: 49
    },
    coords_mob: {
      x: 63.8,
      y: 46.5
    }
  },
  {
    name: 'Спортивный центр',
    coords: {
      x: 59.8,
      y: 17
    },
    coords_mob: {
      x: 59.8,
      y: 15.2
    }
  },
  {
    name: 'Лицей',
    coords: {
      x: 80,
      y: 37.8
    },
    coords_mob: {
      x: 79.3,
      y: 35.4
    }
  }
]

const MapContent = ({ preloader }: { preloader: boolean }) => {
  const isMobile = useIsMobile()
  const [curPoint, setCurPoint] = useState(points[0])
  const [isMobileCardVisible, setIsMobileCardVisible] = useState(false)

  const [activePin, setActivePin] = useState('')

  const compassClickHandler = (point: Point) => () => {
    if (isMobile) {
      setCurPoint(point)
      setIsMobileCardVisible((visible) => !visible)
    }
  }

  const onClickCloseCard = () => {
    setIsMobileCardVisible(false)
  }

  const onPinClick = (pin: PinType) => {
    if (activePin === pin.name) {
      setActivePin('')
    } else {
      setActivePin(pin.name)
    }
  }

  const [isLoading, setLoading] = useState(true)
  const [isHide, setHide] = useState(true)

  useEffect(() => {
    setLoading(false)
    if (preloader) {
      setHide(true)
      setTimeout(() => setHide(false), 4000)
    } else {
      setHide(false)
    }
  }, [preloader])

  if (isLoading) {
    return <Preloader />
  }


  const mobileSlides: React.ReactNode[] = [
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={999}>
      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>3<span>мин</span></h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>до моря</p>
      </div>

      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>10<span>мин</span></h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>до Кронштадского шоссе и КАД</p>
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={888}>
      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>30<span>мин</span></h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>до «Лахта Центра»</p>
      </div>
    </div>
  ]


  return (
    <div >
      <Head>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/map/map.png' as='image' fetchPriority='high' />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/map/preloader.png' as='image' fetchPriority='high' />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/map/compass-loader.svg' as='image' fetchPriority='high' />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/map/wave-loader.svg' as='image' fetchPriority='high' />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/map/sail-loader.svg' as='image' fetchPriority='high' />
      </Head>

      {!isLoading && (
        <>
          {/*{preloader && <Preloader />}*/}
          <Page>
            <HomePage />
            <div style={{ position: 'relative', ...(isHide ? { opacity: 0 } : { opacity: 1 }) }}>
              <div className={styles.captions}>
                <h2 className={styles['captions-title']}>Локация</h2>
                <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
                  <div className={styles['caption']}>
                    <CornerSVG />
                    <h2 className={styles['caption__title']}>3<span>мин</span></h2>
                    <hr className={styles['caption__divider']} />
                    <p className={styles['caption__description']}>до моря</p>
                  </div>
                  <div className={styles['caption']}>
                    <CornerSVG />
                    <h2 className={styles['caption__title']}>10<span>мин</span></h2>
                    <hr className={styles['caption__divider']} />
                    <p className={styles['caption__description']}>до Кронштадского шоссе и КАД</p>
                  </div>
                  <div className={styles['caption']}>
                    <CornerSVG />
                    <h2 className={styles['caption__title']}>30<span>мин</span></h2>
                    <hr className={styles['caption__divider']} />
                    <p className={styles['caption__description']}>до «Лахта Центра»</p>
                  </div>
                </div>
                <div className={`${styles['caption-items']} ${styles['mobile_captions']}`}>
                  <PhoneSlider slides={mobileSlides} />
                </div>
              </div>


              {(isMobile && isMobileCardVisible) && (
                <Card
                  color={curPoint.color}
                  text={curPoint.text}
                  name={curPoint.name}
                  isVisible={isMobileCardVisible}
                  style={{ opacity: 1, zIndex: 9, top: '50%', left: '50%', maxWidth: 680}}
                  onClickCloseCard={onClickCloseCard}
                />
              )}
              <div style={{ overflow: 'hidden', width: '100%' }}>
                <MouseMover
                  className={clsx(styles.wrapper,)}
                  innerClassName={clsx(styles.inner, preloader ? styles.delay : '')}
                  isMobile={isMobile}
                  isMobileCardVisible={isMobileCardVisible}
                  disableMove={true}
                >
                   {/*--------------------------- */}

                  <div className={styles.pointsWrapper}>
                    {pins &&
                      pins.map((pin) => (
                        <Pin
                          key={pin.name}
                          name={pin.name}
                          coords={pin.coords}
                          coords_mob={pin.coords_mob || undefined}
                          onClick={() => onPinClick(pin)}
                          isActive={activePin === pin.name}
                        />
                      ))}
                    {points.map((point) => (
                      <Compass
                        key={point.name}
                        text={point.text || ''}
                        name={point.name}
                        color={point.color}
                        coords={point.coords}
                        coords_mob={point.coords_mob}
                        isMobile={isMobile}
                        onClickCompass={compassClickHandler(point)}
                      />
                    ))}
                    {directionHints.map((hint, i) => (
                      <div
                        key={i}
                        className={styles['direction-hint-wrapper']}
                        style={{
                          top: `${ isMobile ? hint?.coords_mob?.y : hint.coords.y}%`,
                          left: `${ isMobile ? hint?.coords_mob?.x : hint.coords.x}%`,
                        }}
                      >
                        {hint.icon}
                        <span
                          className={styles['direction-hint']}
                        >
                          {hint.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <NextImage
                    src='/map/map.png'
                    alt='map'
                    className={styles.mapImage}
                    layout='responsive'
                    width={1980}
                    height={1024}
                    priority
                  />
                </MouseMover>
              </div>
            </div>
            <TransportPage />

            <AreasPage />
            <FortovPage />
            <ContactFormPage />
          </Page>
        </>
      )}
    </div>
  )
}

const MapPage = ({ preloader }: { preloader: boolean }) => {
  return (
    <Suspense>
      <MapContent preloader={preloader} />
    </Suspense>
  )
}

export default MapPage
