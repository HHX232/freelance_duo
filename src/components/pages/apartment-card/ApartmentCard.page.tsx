'use client'
import styles from './ApartmentCard.module.scss'
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react'
import {useEffect, useState} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {Modal, Skeleton, Tooltip} from 'antd'
import FilledButton from '@shared/filledButton/FilledButton'
import CompareSVG from '@icons/compare_icon.svg'
import FavoriteSVG from '@icons/bookmark_icon.svg'
import DownloadSVG from '@icons/dawnload.svg'
import ShareSVG from '@icons/share.svg'
import ZoomSVG from '@icons/zoom.svg'
import {useIsMobile, useIsTablet} from '@utils/useIsMobile'
import clsx from 'clsx'
import {ApartmentCardProps} from './model'
import {useStore} from '@src/lib/store/store'
import {GetProfile} from '@src/actions/profile'
import {AuthPopup} from '@pages/dashboard/auth/auth'
import {useRouter} from 'next/navigation'
import NextImage from 'next/image'
import Footer from '@shared/page/footer/footer'
import {Latest} from '@shared/latest/latest'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/TextKit/title/title'
import {Share} from '@shared/share-object/share'
import Link from 'next/link'
import {sendTmrEvent} from '@utils/tmrTracker'

interface Tabs {
  name: string
}

const tabs: Tabs[] = [
  {
    name: 'План'
  },
  {
    name: 'С мебелью'
  },
  {
    name: 'Секция'
  },
  {
    name: 'Этаж'
  }
]

const ApartmentCard = ({
  id,
  type,
  tsquare,
  floor,
  fvalue,
  mvalue,
  rvalue,
  building,
  attributes,
  images,
  ext_guid,
  num,
  ready,
  isAllow,
  pdf
}: ApartmentCardProps) => {
  const [swiper, setSwiper] = useState<SwiperClass>()
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
  const [visible, setVisible] = useState(false)
  const [visibleReservation, setVisibleReservation] = useState(false)
  const [additionalParamsVisible, setAdditionalParamsVisible] = useState(false)
  const [isInitialized, setIsInitialized] = useState(true)

  const {addToLatest} = useStore()

  useEffect(() => {
    addToLatest(id)
    sendTmrEvent('flatview', id, fvalue)
  }, [id])

  const isMobile = useIsMobile()
  const isTablet = useIsTablet(768)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const setActiveSlide = (index: number) => {
    setActiveSlideIndex(index)
    swiper?.slideTo(index)
  }

  const {addToFavorites, addToCompare, favorites, compare} = useStore()

  const isFavorite = favorites.includes(id)
  const isCompare = compare.includes(id)

  const {token} = useStore()

  const [isAuth, setAuthorized] = useState(false)
  const [isReservation, setReservation] = useState(false)
  const [modalAuth, setModalAuth] = useState(false)
  const [modalInfo, setInfoModal] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GetProfile(token)

        if (res.success) {
          setAuthorized(true)
        } else {
          setAuthorized(false)
        }
      } catch (error) {
        setAuthorized(false)
      }
    }
    setReservation(true)
    fetchProfile()
  }, [token])

  const handleNeedAuth = () => {
    setVisibleReservation(false)
    setModalAuth(true)
  }

  const router = useRouter()

  const [isShare, setShare] = useState(false)

  const handleShare = () => {
    setShare(!isShare)
  }

  const breadcrumbItems2 = [
    {title: 'Главная', href: '/'},
    {title: 'Выбрать квартиру', href: '/planirovki-i-ceny', back: true},
    {title: `№ ${num}`}
  ]

  const [isPromo, setPromo] = useState(false)
  const [isSkida, setSkidka] = useState(false)

  console.log('RVALUE: ', rvalue)
  console.log('MVALUE: ', mvalue)
  console.log('FVALUE: ', fvalue)

  return (
    <MainContainer style={{background: '#d8e7ee'}}>
      <Title breadcrumbs={breadcrumbItems2} />
      <>
        <div className={styles.wrapper}>
          {modalAuth && <AuthPopup onClose={() => setModalAuth(false)} router={true} />}

          <Modal open={modalInfo} footer={null} onCancel={() => setInfoModal(false)} width={746} centered>
            <div className={styles.start}>
              <div className={styles.text}>
                <p>
                  Обратите внимание,
                  <br />
                  что онлайн бронирование платное
                  <br />
                  <br />
                </p>
                <p>Забронировать квартиру и зафиксировать ее стоимость можно на 3 дня</p>
              </div>

              <FilledButton onClick={() => router.push(`/lk/reservation/${ext_guid}`)} style={{maxWidth: '271px'}}>
                Начать бронирование
              </FilledButton>
            </div>
          </Modal>

          <Modal
            open={visible}
            footer={null}
            onCancel={handleCancel}
            width={isMobile ? '100vw' : '50%'}
            height={isMobile ? '100vh' : 'auto'}
          >
            {/*<Image className={styles.modalImage} src={images[activeSlideIndex]} alt='plan' />*/}
            <NextImage
              src={images[activeSlideIndex]}
              height={470}
              width={470}
              style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
              className={styles.modalImage}
              alt='Image'
              quality={100}
              unoptimized={true}
            />
          </Modal>
          <Modal
            open={visibleReservation}
            footer={null}
            onCancel={() => setVisibleReservation(false)}
            width={776}
            centered
          >
            <div className={styles.reservation}>
              <p className={styles.reservationText}>
                Бронирование доступно только авторизованным пользователям, авторизуйтесь в личном кабинете и продолжите
                бронирование
              </p>
              <p className={styles.subtext}>Обратите внимание, что бронь платная, срок 3 дня после подтверждения.</p>
              <FilledButton className={styles.reservationButton} onClick={handleNeedAuth} variety='primary'>
                Продолжить
              </FilledButton>
            </div>
          </Modal>

          <div className={styles.contentWrapper}>
            <div className={styles.plan}>
              <Swiper
                slidesPerView={1}
                onSlideChange={({activeIndex}) => setActiveSlide(activeIndex)}
                onSwiper={(swiperInstance) => {
                  setSwiper(swiperInstance)

                  setTimeout(() => {
                    setIsInitialized(true)
                  }, 6000)
                }}
                autoplay={false}
                className={`${styles.swiperWrapper} swiper-object`}
              >
                {isInitialized && (
                  <>
                    {images.map((image, index) => (
                      <SwiperSlide onClick={showModal} key={image}>
                        <div className={styles.imageWrapper}>
                          {/*<Image src={image} alt='plan' />*/}
                          <NextImage
                            src={image}
                            fill
                            style={{objectFit: 'contain', objectPosition: 'center', width: '100%', height: '100%'}}
                            className={styles.image}
                            alt='Image'
                          />
                          {index == 3 && (
                            <div className={styles.zoom}>
                              <ZoomSVG />
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </>
                )}
              </Swiper>

              {!isInitialized && (
                <div style={{width: '100%', display: 'flex'}}>
                  <Skeleton.Image active className={styles.skeleton} />
                </div>
              )}
              {isInitialized ? (
                <div className={styles.tabs_container}>
                  <div className={styles.tabs}>
                    {tabs.map((tab, ind) => (
                      <span
                        className={activeSlideIndex === ind ? styles.active : ''}
                        onClick={() => setActiveSlide(ind)}
                        key={ind}
                      >
                        {tab.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{width: '100%', display: 'flex'}}>
                  <Skeleton.Input active block={true} className={styles.skeleton_tabs} />
                </div>
              )}
            </div>

            <div className={styles.info}>
              <div className={styles.info_container}>
                <div className={styles.topInfo}>
                  <h1 className={styles.topInfoTitle}>
                    {type} - {tsquare} м2
                  </h1>
                  <div className={styles.icons}>
                    <Tooltip title='Избранное' placement='bottom' color='#D38F6D'>
                      <button
                        type='button'
                        className={styles.icon}
                        onClick={() => {
                          addToFavorites(id)
                          sendTmrEvent('like', id, fvalue)
                        }}
                      >
                        <FavoriteSVG style={{fill: isFavorite ? '#D38F6D' : ''}} />
                      </button>
                    </Tooltip>
                    <Tooltip title='Сравнение' placement='bottom' color='#D38F6D'>
                      <button
                        type='button'
                        className={styles.icon}
                        onClick={() => {
                          addToCompare(id)
                          sendTmrEvent('compare', id, fvalue)
                        }}
                      >
                        <CompareSVG style={{fill: isCompare ? '#D38F6D' : ''}} />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                <div className={styles.tableInfo}>
                  <span className={styles.name}>Корпус</span>
                  <span className={styles.value}>{building}</span>
                  <span className={styles.name}>Этаж</span>
                  <span className={styles.value}>{floor}</span>
                  <span className={styles.name}>Сдача</span>
                  <span className={styles.value}>{ready}</span>
                </div>

                <div className={styles.additionalParams}>
                  <span
                    className={styles.additionalParamsTitle}
                    onClick={() => setAdditionalParamsVisible((vis) => !vis)}
                  >
                    Дополнительные параметры
                  </span>
                  {additionalParamsVisible && (
                    <ul className={styles.additionalParamsList}>
                      {attributes.map((attr, index) => (
                        <li key={index}>{attr}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={styles.priceWrapper}>
                  <div className={styles.promotion}>
                    {isTablet ? (
                      <>
                        <Tooltip
                          align={{
                            offset: [-24, -6] // Смещение по оси X (лево/право)
                          }}
                          rootClassName='promo_tooltip'
                          title={`Скидка 15%`}
                          placement='top'
                          zIndex={0}
                          color='#11627D'
                          onOpenChange={() => setSkidka(!isSkida)}
                          open={isSkida}
                        >
                          <div className={styles.promo}>
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M17.916 8.70829C19.1875 7.39234 18.2705 5.18578 16.4437 5.14809C16.9573 3.39105 15.1226 1.86356 13.4883 2.68103C13.1259 0.887428 10.7933 0.388954 9.72664 1.87425C8.57216 0.45703 6.27558 1.10122 6.02184 2.91283C4.34132 2.19831 2.60566 3.83776 3.22397 5.55935C1.40392 5.7107 0.626395 7.97071 1.97441 9.20564C0.431731 10.1885 0.790677 12.5521 2.5584 13.0151C1.64585 14.6039 3.05913 16.5314 4.84092 16.1168C4.76722 17.9497 6.91189 18.9945 8.29817 17.7973C9.0802 19.4564 11.464 19.3827 12.1386 17.6769C13.5985 18.7841 15.6746 17.6071 15.4838 15.782C17.2887 16.0847 18.5805 14.0745 17.5683 12.5459C19.3057 11.9731 19.5172 9.59215 17.9149 8.70829H17.916Z'
                                stroke='#1F6080'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M7.52648 9.55102C8.39651 9.55102 9.1018 8.84572 9.1018 7.9757C9.1018 7.10568 8.39651 6.40039 7.52648 6.40039C6.65646 6.40039 5.95117 7.10568 5.95117 7.9757C5.95117 8.84572 6.65646 9.55102 7.52648 9.55102Z'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M12.0275 13.602C11.1577 13.602 10.4521 12.8965 10.4521 12.0267C10.4521 11.1569 11.1577 10.4514 12.0275 10.4514C12.8973 10.4514 13.6028 11.1569 13.6028 12.0267C13.6028 12.8965 12.8973 13.602 12.0275 13.602Z'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M6.85156 13.6018L12.7027 6.40039'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                            </svg>
                            <span>Скидка 15%</span>
                          </div>
                        </Tooltip>
                        <Tooltip
                          align={{
                            offset: [-24, -6] // Смещение по оси X (лево/право)
                          }}
                          rootClassName='promo_tooltip'
                          title='Специальные условия в отделе продаж, только в ноябре'
                          placement='top'
                          zIndex={0}
                          color='#11627D'
                          onOpenChange={() => setPromo(!isPromo)}
                          open={isPromo}
                        >
                          <div className={styles.promo}>
                            <svg
                              width='24'
                              height='20'
                              viewBox='0 0 24 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M16.1035 1.46167H18.5394C18.8086 1.46167 19.0266 1.67968 19.0266 1.94885V9.7437'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M12.2051 15.5898H1.48718C1.21801 15.5898 1 15.3718 1 15.1027V1.94885C1 1.67968 1.21801 1.46167 1.48718 1.46167H3.92307'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeLinejoin='round'
                              />
                              <path d='M1 5.35889H19.0256' stroke='#1F6080' strokeWidth='1.2' strokeLinejoin='round' />
                              <path d='M15.1289 0V2.92307' stroke='#1F6080' strokeWidth='1.2' strokeLinejoin='round' />
                              <path
                                d='M5.87109 1.46167H14.1531'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeLinejoin='round'
                              />
                              <path d='M4.89844 0V2.92307' stroke='#1F6080' strokeWidth='1.2' strokeLinejoin='round' />
                              <path
                                d='M6.35938 7.79492H7.82091'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M8.79492 7.79492H10.2565'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M11.2305 7.79492H12.692'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M13.666 7.79492H15.1276'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M3.92188 10.2307H5.38341'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M6.35938 10.2307H7.82091'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M8.79492 10.2307H10.2565'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M11.2305 10.2307H12.692'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M3.92188 12.6665H5.38341'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M6.35938 12.6665H7.82091'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M8.79492 12.6665H10.2565'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M15.8575 14.6153C16.7992 14.6153 17.5626 13.8519 17.5626 12.9102C17.5626 11.9685 16.7992 11.2051 15.8575 11.2051C14.9158 11.2051 14.1523 11.9685 14.1523 12.9102C14.1523 13.8519 14.9158 14.6153 15.8575 14.6153Z'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M20.7305 18.9998C19.789 18.9998 19.0254 18.2362 19.0254 17.2947C19.0254 16.3533 19.789 15.5896 20.7305 15.5896C21.672 15.5896 22.4356 16.3533 22.4356 17.2947C22.4356 18.2362 21.672 18.9998 20.7305 18.9998Z'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                              <path
                                d='M15.1289 18.9999L21.4622 11.2051'
                                stroke='#1F6080'
                                strokeWidth='1.2'
                                strokeMiterlimit='10'
                              />
                            </svg>
                            <span>Специальные условия в отделе продаж, только в ноябре</span>
                          </div>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <div className={styles.promo}>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M17.916 8.70829C19.1875 7.39234 18.2705 5.18578 16.4437 5.14809C16.9573 3.39105 15.1226 1.86356 13.4883 2.68103C13.1259 0.887428 10.7933 0.388954 9.72664 1.87425C8.57216 0.45703 6.27558 1.10122 6.02184 2.91283C4.34132 2.19831 2.60566 3.83776 3.22397 5.55935C1.40392 5.7107 0.626395 7.97071 1.97441 9.20564C0.431731 10.1885 0.790677 12.5521 2.5584 13.0151C1.64585 14.6039 3.05913 16.5314 4.84092 16.1168C4.76722 17.9497 6.91189 18.9945 8.29817 17.7973C9.0802 19.4564 11.464 19.3827 12.1386 17.6769C13.5985 18.7841 15.6746 17.6071 15.4838 15.782C17.2887 16.0847 18.5805 14.0745 17.5683 12.5459C19.3057 11.9731 19.5172 9.59215 17.9149 8.70829H17.916Z'
                              stroke='#1F6080'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M7.52648 9.55102C8.39651 9.55102 9.1018 8.84572 9.1018 7.9757C9.1018 7.10568 8.39651 6.40039 7.52648 6.40039C6.65646 6.40039 5.95117 7.10568 5.95117 7.9757C5.95117 8.84572 6.65646 9.55102 7.52648 9.55102Z'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M12.0275 13.602C11.1577 13.602 10.4521 12.8965 10.4521 12.0267C10.4521 11.1569 11.1577 10.4514 12.0275 10.4514C12.8973 10.4514 13.6028 11.1569 13.6028 12.0267C13.6028 12.8965 12.8973 13.602 12.0275 13.602Z'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M6.85156 13.6018L12.7027 6.40039'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                          </svg>

                          <span>Скидка 15%</span>
                        </div>
                        <div className={styles.promo}>
                          <svg
                            width='24'
                            height='20'
                            viewBox='0 0 24 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16.1035 1.46167H18.5394C18.8086 1.46167 19.0266 1.67968 19.0266 1.94885V9.7437'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M12.2051 15.5898H1.48718C1.21801 15.5898 1 15.3718 1 15.1027V1.94885C1 1.67968 1.21801 1.46167 1.48718 1.46167H3.92307'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeLinejoin='round'
                            />
                            <path d='M1 5.35889H19.0256' stroke='#1F6080' strokeWidth='1.2' strokeLinejoin='round' />
                            <path d='M15.1289 0V2.92307' stroke='#1F6080' strokeWidth='1.2' strokeLinejoin='round' />
                            <path
                              d='M5.87109 1.46167H14.1531'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeLinejoin='round'
                            />
                            <path d='M4.89844 0V2.92307' stroke='#1F6080' strokeWidth='1.2' strokeLinejoin='round' />
                            <path
                              d='M6.35938 7.79492H7.82091'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M8.79492 7.79492H10.2565'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M11.2305 7.79492H12.692'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M13.666 7.79492H15.1276'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M3.92188 10.2307H5.38341'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M6.35938 10.2307H7.82091'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M8.79492 10.2307H10.2565'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M11.2305 10.2307H12.692'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M3.92188 12.6665H5.38341'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M6.35938 12.6665H7.82091'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M8.79492 12.6665H10.2565'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M15.8575 14.6153C16.7992 14.6153 17.5626 13.8519 17.5626 12.9102C17.5626 11.9685 16.7992 11.2051 15.8575 11.2051C14.9158 11.2051 14.1523 11.9685 14.1523 12.9102C14.1523 13.8519 14.9158 14.6153 15.8575 14.6153Z'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M20.7305 18.9998C19.789 18.9998 19.0254 18.2362 19.0254 17.2947C19.0254 16.3533 19.789 15.5896 20.7305 15.5896C21.672 15.5896 22.4356 16.3533 22.4356 17.2947C22.4356 18.2362 21.672 18.9998 20.7305 18.9998Z'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M15.1289 18.9999L21.4622 11.2051'
                              stroke='#1F6080'
                              strokeWidth='1.2'
                              strokeMiterlimit='10'
                            />
                          </svg>
                          <span>Специальные условия в отделе продаж, только в ноябре</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.prevAndCurPrice}>
                    <span className={styles.price}>{new Intl.NumberFormat('ru').format(+rvalue)} руб. </span>
                    {mvalue && (
                      <span className={styles.old_price}>{new Intl.NumberFormat('ru').format(+mvalue)} руб. </span>
                    )}
                  </div>
                </div>

                <div className={styles.buttons}>
                  {isAllow.data.allow ? (
                    <>
                      {isReservation && (
                        <>
                          <FilledButton
                            className={styles.reservationBtn}
                            variety='primary'
                            onClick={() => {
                              !isAuth ? setVisibleReservation(true) : setInfoModal(true)
                              sendTmrEvent('book', id, fvalue)
                            }}
                          >
                            Забронировать
                          </FilledButton>
                          <span>Бронь платная, срок 3 дня после подтверждения</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <FilledButton className={styles.reservationBtn} variety='primary'>
                        Забронировано
                      </FilledButton>
                    </>
                  )}
                </div>
                <div className={styles.line}></div>
                <div className={styles.utils}>
                  {pdf && (
                    <Link href={pdf} target='_blank'>
                      <button
                        type='button'
                        className={styles.util}
                        onClick={() => sendTmrEvent('download', id, fvalue)}
                      >
                        <DownloadSVG /> скачать
                      </button>
                    </Link>
                  )}

                  <div className={styles.share_btn}>
                    <button type='button' className={styles.util} onClick={handleShare}>
                      <ShareSVG /> поделиться
                    </button>
                    {isShare && <Share onClose={() => setShare(false)} type={type} tsquare={tsquare} price={fvalue} />}
                  </div>
                </div>
                <div className={clsx(styles.line, styles.lineMob)}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.latest_obj}>
          <Latest />
        </div>
      </>

      <Footer />
    </MainContainer>
  )
}

export default ApartmentCard
