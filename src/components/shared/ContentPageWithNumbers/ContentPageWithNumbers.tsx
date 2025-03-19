'use client'
import CountUp from 'react-countup'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {A11y, Autoplay, Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Col, Row, Statistic, StatisticProps} from 'antd'
import clsx from 'clsx'
import styles from './index.module.scss'
import {PageWithNumberTypes} from '@src/contentData/about_central-2_data'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'

interface ContentPageData {
  data: PageWithNumberTypes
  title?: string
}
// TODO: ПОФИКСИТЬ ТИПЫ
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const formatter: StatisticProps['formatter'] = (value: string) => <CountUp end={+value} separator=',' />

export const ContentPageWi1thNumbers = ({data, title}: ContentPageData) => {
  return (
    <MainContainer style={{background: '#11627d'}}>
      {title && <Title title={title as string} darkTheme={true} style={{zIndex: '1'}} dashboard={true} />}
      <section className={styles.numbersSection}>
        {/*<h1 className={styles.title}>{!!title && title}</h1>*/}
        <Row>
          <Col span={24}>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              modules={[A11y, Pagination, Autoplay]}
              pagination
              loop
              autoplay={{delay: 3000, disableOnInteraction: false}}
              className='slider-infr'
            >
              {data.map((item, index) => (
                <SwiperSlide key={index} className={`slide slider-infrastructure`}>
                  {({isActive}) => (
                    <Row className={styles.slideWrap} gutter={[20, 20]}>
                      {item.map((slide, i) => (
                        <Col
                          span={16}
                          md={8}
                          key={slide.number + slide.text}
                          className={clsx(styles.slideItem, {[styles.active]: isActive})}
                          style={{animationDuration: `${i}s`}}
                        >
                          {isActive && (
                            <>
                              <div className={styles.number}>
                                <Statistic value={slide.number} formatter={formatter} className={styles.number} />
                                {!!slide.currency && <span>{slide.currency}</span>}
                              </div>
                              <span className={styles.text}>{slide.text}</span>
                            </>
                          )}
                        </Col>
                      ))}
                    </Row>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </section>
    </MainContainer>
  )
}
