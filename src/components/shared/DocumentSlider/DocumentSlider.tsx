'use client'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {A11y, Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Col, Row} from 'antd'
import styles from './index.module.scss'
import {Document} from '@shared/DocumentSlider/data'
import Link from 'next/link'
import DocumentIcon from '@icon/docunemt-icon.svg'
import {useMedia} from '@src/lib/utils/useMedia'

interface ContentPageData {
  data: Document[]
  title?: string
}

export const DocumentSlider = ({data, title}: ContentPageData) => {
  const {isLessThan} = useMedia()

  const isMobile = isLessThan && isLessThan('768')

  return (
    <section className={styles.docsSection}>
      <h1 className={styles.title}>{!!title && title}</h1>

      {!isMobile ? (
        <Swiper
          modules={[A11y, Pagination]}
          pagination
          loop
          spaceBetween={8}
          breakpoints={{
            1220: {
              slidesPerView: 4
            },
            992: {
              slidesPerView: 3
            },
            768: {
              slidesPerView: 2
            }
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className='docsSlide'>
              <DocsItem title={item.title} link={item.link} subtitle={item.subtitle} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.mobileSection}>
          <Row gutter={[0, 40]}>
            {data.map((item, index) => (
              <Col key={index} span={13}>
                <DocsItem title={item.title} link={item.link} subtitle={item.subtitle} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </section>
  )
}

const DocsItem = ({link, title, subtitle}: Document) => (
  <Link href={link} className={styles.slide}>
    <DocumentIcon className={styles.docIcon} />
    <h2 className={styles.itemTitle}>{title}</h2>
    <p className={styles.itemSubtitle}>{subtitle}</p>
  </Link>
)
