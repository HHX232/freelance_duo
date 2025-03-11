'use client'
import {Suspense, useState} from 'react'
import styles from './Map.module.scss'
import {DirectionHint, PinType, Point} from './Components/pin/model'
import MouseMover from '@shared/mouse-mover/MouseMover'
import {useIsMobile} from '@utils/useIsMobile'
import clsx from 'clsx'
import Pin from './Components/pin/pin'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import Head from 'next/head'
import ArrowUpSVG from '@icons/arrow_up.svg'
import CornerSVG from '@icons/corner.svg'
import Page from '@shared/page/Page'
import AreasPage from './Components/areas/Areas'
import FortovPage from './Components/fortov/Fortov'
// import TransportPage from './Components/transport/Transport'
import HomePage from './Components/home/Home.page'
import ContactFormPage from './Components/contact-form/ContactForm'
import emblaStyle from '@shared/phoneSlider/embla.module.scss'
import PhoneSlider from '@shared/phoneSlider/PhoneSlider'
const Compass = dynamic(() => import('./Components/card/Compass'), {ssr: false})

const directionHints: DirectionHint[] = [
  {
    name: 'ЖК «Набережная»',
    coords: {
      x: 49,
      y: 9.5
    },
    coords_mob: {
      x: 47,
      y: 5
    }
  },
  {
    name: 'КАД (10 мин.)',
    coords: {
      x: 30,
      y: 10
    },
    coords_mob: {
      x: 63,
      y: 5
    },
    icon: <ArrowUpSVG />
  },
  {
    name: 'Кронштадское шоссе (3 мин.)',
    coords: {
      x: 76,
      y: 10
    },
    coords_mob: {
      x: 76,
      y: 5
    }
  },
  {
    name: 'ЖК «Центральный»',
    coords: {
      x: 74,
      y: 28
    },
    coords_mob: {
      x: 74,
      y: 22
    }
  }
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
      x: 49.5,
      y: 12
    }
  },
  {
    name: 'Центральный',
    link: {
      href: '/planirovki-i-ceny',
      title: 'Подобрать квартиру'
    },
    text: 'Малоэтажный квартал, формирующий образ жизни на морском побережье в окружении актуальной архитектуры и современных инфраструктурных решений для жизни и досуга. Квартал «Кронфорт. Центральный» прилегает непосредственно к парку рекреационного кластера «Остров фортов», предлагая его жителям дополнительные культурно-досуговые возможности.',
    color: '#FF7314',
    coords: {
      x: 67.5,
      y: 27.5
    },
    coords_mob: {
      x: 67.5,
      y: 27.5
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
      x: 59,
      y: 32
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
      x: 64.3,
      y: 49
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
      y: 17
    }
  },
  {
    name: 'Лицей',
    coords: {
      x: 80,
      y: 37.8
    },
    coords_mob: {
      x: 80,
      y: 37.8
    }
  }
]

const MapContent = () => {
  const isMobile = useIsMobile()
  const [activePin, setActivePin] = useState('')

  const onPinClick = (pin: PinType) => {
    if (activePin === pin.name) {
      setActivePin('')
    } else {
      setActivePin(pin.name)
    }
  }

  const mobileSlides: React.ReactNode[] = [
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={999}>
      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>
          3<span>мин</span>
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>до моря</p>
      </div>

      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>
          10<span>мин</span>
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>
          до Кронштадского <br /> шоссе и КАД
        </p>
      </div>
    </div>,
    <div className={`${emblaStyle['embla__slide']} ${styles['caption-items']}`} key={888}>
      <div className={styles['caption']}>
        <h2 className={styles['caption__title']}>
          30<span>мин</span>
        </h2>
        <hr className={styles['caption__divider']} />
        <p className={styles['caption__description']}>до «Лахта Центра»</p>
      </div>
    </div>
  ]

  return (
    <div>
      <Head>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/map/map.png' as='image' fetchPriority='high' />
      </Head>

      {
        <>
          {/*{preloader && <Preloader />}*/}
          <Page className={styles.page}>
            <HomePage />
            <div style={{position: 'relative'}}>
              <div>
                <div className={styles.captions}>
                  <h2 className={styles['captions-title']}>Локация</h2>
                  <div className={`${styles['caption-items']} ${styles['desktop_captions']}`}>
                    <div className={styles['caption']}>
                      <CornerSVG />
                      <h2 className={styles['caption__title']}>
                        3<span>мин</span>
                      </h2>
                      <hr className={styles['caption__divider']} />
                      <p className={styles['caption__description']}>до моря</p>
                    </div>
                    <div className={styles['caption']}>
                      <CornerSVG />
                      <h2 className={styles['caption__title']}>
                        10<span>мин</span>
                      </h2>
                      <hr className={styles['caption__divider']} />
                      <p className={styles['caption__description']}>до Кронштадского шоссе и КАД</p>
                    </div>
                    <div className={styles['caption']}>
                      <CornerSVG />
                      <h2 className={styles['caption__title']}>
                        30<span>мин</span>
                      </h2>
                      <hr className={styles['caption__divider']} />
                      <p className={styles['caption__description']}>до «Лахта Центра»</p>
                    </div>
                  </div>
                  <div className={`${styles['caption-items']} ${styles['mobile_captions']}`}>
                    <PhoneSlider slides={mobileSlides} />
                  </div>
                </div>
                <MouseMover
                  className={clsx(styles.wrapper)}
                  isMobile={isMobile}
                  isMobileCardVisible={false}
                  disableMove={false}
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
                        link={point.link}
                        // onClickCompass={compassClickHandler(point)}
                      />
                    ))}
                    {directionHints.map((hint, i) => (
                      <div
                        key={i}
                        className={styles['direction-hint-wrapper']}
                        style={{
                          top: `${isMobile ? hint?.coords_mob?.y : hint.coords.y}%`,
                          left: `${isMobile ? hint?.coords_mob?.x : hint.coords.x}%`
                        }}
                      >
                        {hint.icon}
                        <span className={styles['direction-hint']}>{hint.name}</span>
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
                    loading='lazy'
                    quality={100}
                  />
                </MouseMover>
              </div>
            </div>
            {/* <TransportPage /> */}

            <AreasPage />
            <FortovPage />
            <ContactFormPage />
          </Page>
        </>
      }
    </div>
  )
}

const MapPage = () => {
  return (
    <Suspense>
      <MapContent />
    </Suspense>
  )
}

export default MapPage
