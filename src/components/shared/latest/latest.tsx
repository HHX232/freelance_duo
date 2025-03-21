import {Carousel, ConfigProvider, Drawer, DrawerProps, Tabs, TabsProps} from 'antd'
import {useEffect, useState} from 'react'
import styles from './latest.module.scss'
import {getFlatsById, getRecomended} from '@src/actions/flats'
import {useStore} from '@src/lib/store/store'
import {MiniCard} from '@shared/Cards/mini-card/mini-card'
import {IObj} from '@src/types/object.interface'
import {useIsTablet} from '@utils/useIsMobile'
import clsx from 'clsx'

export const Latest = () => {
  const {getLatest} = useStore()
  const [placement] = useState<DrawerProps['placement']>('bottom')

  const [carouselKey, setCarouselKey] = useState(0)

  const [isLatestVisible, setLatestVisible] = useState(false)
  const [isOverlay, setOverlay] = useState(false)

  const [isLoading, setLoading] = useState(true)
  const [isLatest, setLatest] = useState<IObj[]>([])
  const [isRecomended, setRecommended] = useState<IObj[]>([])
  const [activeTab, setActiveTab] = useState<string>('1')
  const [overlayVisible, setOverlayVisible] = useState(true)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)

  const handleClick = () => {
    console.log(isLoading)
    setOverlay(true)
    setOverlayVisible(true)
    setTimeout(() => {
      setLatestVisible(true)
    }, 500)
  }

  const onClose = () => {
    setLatestVisible(false)
    setOverlay(false)
    setOverlayVisible(false)
  }

  const fetchData = async (ids: string[]) => {
    const res = await getFlatsById(ids)
    if (res) {
      setLatest(res)

      const fetchRecomended = async () => {
        if (isLatest) {
          const recommended = await getRecomended([res[0]?.Type])
          console.log(recommended)
          if (recommended) {
            setRecommended(recommended)
          }
        }
      }
      fetchRecomended()
    }

    setLoading(false)
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      const latest = getLatest()
      await fetchData(latest)
    }

    fetchInitialData().catch(console.error)
  }, [getLatest])

  const tabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'просмотренные объекты'
    },
    {
      key: '2',
      label: 'рекомендованные'
    }
  ]

  const tabs_mob: TabsProps['items'] = [
    {
      key: '1',
      label: 'Просмотренные объекты'
    },
    {
      key: '2',
      label: 'Рекомендованные'
    }
  ]

  const handleAfterOpenChange = (open: boolean) => {
    console.log(open)
    if (open) {
      setOverlayVisible(false)
    } else {
      setOverlayVisible(true)
    }
  }

  const CustomPrevArrow = ({onClick}: {onClick?: () => void}) => (
    <button className={styles.prevArrow} onClick={onClick} style={{display: currentSlide === 0 ? 'none' : 'block'}}>
      <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='15' cy='15' r='14.5' transform='rotate(-180 15 15)' fill='#D38F6D' stroke='#D38F6D' />
        <path
          d='M16.2707 9.32877L16.2707 9.32877C16.477 9.3256 16.651 9.39518 16.7934 9.53761L16.7934 9.53761C16.9359 9.68011 17.007 9.85255 17.007 10.0557C17.007 10.2588 16.9359 10.4312 16.7934 10.5737L12.7203 14.6468L12.7115 14.6557L12.7203 14.6645L16.7934 18.7376C16.9294 18.8736 16.9991 19.0444 17.0022 19.2511C17.0054 19.4574 16.9358 19.6313 16.7934 19.7737C16.6509 19.9162 16.4784 19.9874 16.2753 19.9874C16.0722 19.9874 15.8997 19.9162 15.7572 19.7737L11.263 15.2795C11.1705 15.1869 11.1056 15.0897 11.0678 14.9878C11.0299 14.8855 11.0109 14.7748 11.0109 14.6557C11.0109 14.5365 11.0299 14.4258 11.0678 14.3235C11.1056 14.2216 11.1705 14.1244 11.263 14.0318L15.7572 9.53761L15.7484 9.52877L15.7572 9.53761C15.8932 9.40161 16.0641 9.33192 16.2707 9.32877Z'
          fill='white'
          stroke='#D38F6D'
          strokeWidth='0.025'
        />
      </svg>
    </button>
  )

  const CustomNextArrow = ({onClick}: {onClick?: () => void}) => (
    <button
      className={styles.nextArrow}
      onClick={onClick}
      style={{display: currentSlide >= totalSlides - 1 ? 'none' : 'block'}}
    >
      <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='15' cy='15' r='14.5' transform='rotate(-180 15 15)' fill='#D38F6D' stroke='#D38F6D' />
        <path
          d='M13.7488 19.9874L13.7488 19.9874C13.5425 19.9906 13.3686 19.921 13.2261 19.7786L13.2261 19.7786C13.0836 19.6361 13.0125 19.4636 13.0125 19.2605C13.0125 19.0574 13.0836 18.8849 13.2261 18.7424L17.2992 14.6693L17.3081 14.6605L17.2992 14.6517L13.2261 10.5786C13.0902 10.4426 13.0205 10.2717 13.0173 10.0651C13.0141 9.8588 13.0837 9.68485 13.2261 9.54243C13.3686 9.39992 13.5411 9.32877 13.7442 9.32877C13.9473 9.32877 14.1198 9.39991 14.2623 9.54243L18.7565 14.0367C18.8491 14.1292 18.914 14.2264 18.9517 14.3283C18.9896 14.4306 19.0086 14.5413 19.0086 14.6605C19.0086 14.7797 18.9896 14.8904 18.9517 14.9927C18.914 15.0945 18.8491 15.1918 18.7565 15.2843L14.2623 19.7786L14.2711 19.7874L14.2623 19.7786C14.1263 19.9146 13.9555 19.9842 13.7488 19.9874Z'
          fill='white'
          stroke='#D38F6D'
          strokeWidth='0.025'
        />
      </svg>
    </button>
  )

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next)
      console.log(current)
    },
    onInit: () => {
      const total = Math.ceil((activeTab === '1' ? isLatest.length : isRecomended.length) / 4)
      setTotalSlides(total)
    },
    onReInit: () => {
      const total = Math.ceil((activeTab === '1' ? isLatest.length : isRecomended.length) / 4)
      setTotalSlides(total)
    }
  }

  const settings_mob = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    centerMode: true,
    dots: false,
    swipeToSlide: true,
    centerPadding: '20px',
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next)
      console.log(current)
    },
    onInit: () => {
      const total = Math.ceil((activeTab === '1' ? isLatest.length : isRecomended.length) / 4)
      setTotalSlides(total)
    },
    onReInit: () => {
      const total = Math.ceil((activeTab === '1' ? isLatest.length : isRecomended.length) / 4)
      setTotalSlides(total)
    }
  }

  const isTablet = useIsTablet(1200)

  return (
    <>
      <div className={clsx(styles.latest_desk, isLatestVisible && 'no-scroll')}>
        {isOverlay && (
          <>
            <div className={styles.latest}>
              <Drawer
                mask={false}
                placement={placement}
                closable={false}
                onClose={onClose}
                open={isLatestVisible}
                key={placement}
                className='custom-drawer-latest'
                afterOpenChange={handleAfterOpenChange}
                style={{position: 'absolute', bottom: 0}}
                bodyStyle={{
                  padding: '30px 47px',
                  background: '#DCEBF1',
                  height: '100vh',
                  overflow: 'hidden'
                }}
              >
                <ConfigProvider theme={{token: {colorPrimary: '#D38F6D'}}}>
                  <Tabs
                    defaultActiveKey='1'
                    items={tabs}
                    onChange={(value: string) => {
                      setActiveTab(value)
                      setCarouselKey((prevKey) => prevKey + 1) // Изменяем ключ
                    }}
                    tabBarExtraContent={{
                      right: (
                        <div>
                          <button type='button' onClick={() => onClose()}>
                            <svg
                              width='30'
                              height='30'
                              viewBox='0 0 30 30'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M4.38841 4.38738C10.2396 -1.46246 19.7604 -1.46246 25.6116 4.38738C31.4628 10.2374 31.4628 19.7557 25.6116 25.6056C22.7772 28.4394 19.0086 30 15 30C10.9914 30 7.22283 28.4394 4.38841 25.6056C-1.4628 19.7557 -1.4628 10.2374 4.38841 4.38738ZM5.66377 24.3305C8.15752 26.8238 11.4732 28.1968 15 28.1968C18.5268 28.1968 21.8425 26.8238 24.3362 24.3305C29.4843 19.1838 29.4843 10.8093 24.3362 5.66244C21.7622 3.08903 18.3812 1.80239 15 1.80239C11.6188 1.80239 8.23779 3.08903 5.66377 5.66244C0.515736 10.8093 0.515736 19.1838 5.66377 24.3305Z'
                                fill='#555555'
                              />
                              <path
                                d='M9.2302 9.22897C9.58232 8.8768 10.1533 8.8768 10.5054 9.22897L14.9986 13.721L19.4918 9.22897C19.8439 8.8768 20.4149 8.8768 20.7672 9.22897C21.1193 9.58101 21.1193 10.1519 20.7672 10.504L16.274 14.996L20.7672 19.4882C21.1193 19.8402 21.1193 20.411 20.7672 20.7632C20.591 20.9392 20.3602 21.0273 20.1295 21.0273C19.8988 21.0273 19.6679 20.9392 19.4918 20.7632L14.9986 16.2711L10.5054 20.7632C10.3294 20.9392 10.0986 21.0273 9.86775 21.0273C9.6369 21.0273 9.40619 20.9392 9.2302 20.7632C8.87794 20.411 8.87794 19.8402 9.2302 19.4882L13.7233 14.996L9.2302 10.504C8.87794 10.1519 8.87794 9.58101 9.2302 9.22897Z'
                                fill='#555555'
                              />
                            </svg>
                          </button>
                        </div>
                      )
                    }}
                    rootClassName='tabs-latest'
                  />
                </ConfigProvider>

                <div className={styles.items}>
                  <Carousel
                    key={carouselKey}
                    {...settings}
                    className={styles.carousel}
                    rootClassName='carousel-latest'
                    arrows
                    prevArrow={<CustomPrevArrow />}
                    nextArrow={<CustomNextArrow />}
                    afterChange={() => setCurrentSlide(0)} // Сброс текущего слайда при смене вкладки
                  >
                    {activeTab === '1' &&
                      isLatest.length > 0 &&
                      isLatest.map((item) => (
                        <div key={item.id} className={styles.cardWrapper}>
                          <MiniCard
                            id={item.id}
                            name={`${item.Type} - ${item.Tsquare} м2`}
                            price={item.Fvalue}
                            image={item.flat_plan}
                            floor={item.Floor}
                            ready={item.Plandate}
                          />
                        </div>
                      ))}

                    {activeTab === '2' &&
                      isRecomended.length > 0 &&
                      isRecomended.map((item) => (
                        <div key={item.id} className={styles.cardWrapper}>
                          <MiniCard
                            id={item.id}
                            name={`${item.Type} - ${item.Tsquare} м2`}
                            price={item.Fvalue}
                            image={item.flat_plan}
                            floor={item.Floor}
                            ready={item.Plandate}
                          />
                        </div>
                      ))}
                  </Carousel>
                </div>
                {overlayVisible && <div className={styles.overlay}></div>}
              </Drawer>
            </div>
          </>
        )}

        {isLatest.length > 0 && (
          <button type='button' className={styles.latest_btn} onClick={handleClick}>
            просмотренные объекты
          </button>
        )}
      </div>
      {isTablet && isLatest.length > 0 && (
        <div className={styles.latest_mob}>
          <ConfigProvider theme={{token: {colorPrimary: '#D38F6D'}}}>
            <Tabs
              defaultActiveKey='1'
              items={tabs_mob}
              onChange={(value: string) => setActiveTab(value)}
              rootClassName='tabs-latest-mob'
            />
          </ConfigProvider>
          <div className={styles.items_mob}>
            <Carousel
              {...settings_mob}
              className={styles.carousel}
              rootClassName='carousel-latest-mob'
              arrows={false}
              prevArrow={<CustomPrevArrow />}
              nextArrow={<CustomNextArrow />}
              afterChange={() => setCurrentSlide(0)} // Сброс текущего слайда при смене вкладки
            >
              {activeTab === '1' &&
                isLatest.length > 0 &&
                isLatest.map((item) => (
                  <div key={item.id} className={styles.cardWrapper}>
                    <MiniCard
                      id={item.id}
                      name={`${item.Type} - ${item.Tsquare} м2`}
                      price={item.Fvalue}
                      image={item.flat_plan}
                      ready={item.Plandate}
                      floor={item.Floor}
                    />
                  </div>
                ))}

              {activeTab === '2' &&
                isRecomended.length > 0 &&
                isRecomended.map((item) => (
                  <div key={item.id} className={styles.cardWrapper}>
                    <MiniCard
                      id={item.id}
                      name={`${item.Type} - ${item.Tsquare} м2`}
                      price={item.Fvalue}
                      image={item.flat_plan}
                      ready={item.Plandate}
                      floor={item.Floor}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  )
}
