'use client'
import styles from './FindUs.module.scss'
import ClockIcon from '@icons/commerce_clock.svg'
import Map from '@icons/map.svg'
import WhiteStar from '@icons/white_star.svg'
import LineBlue from '@icons/line_blue.svg'
import LineWhite from '@icons/line_white.svg'
import {useIsMinWidth} from '@utils/useIsMobile'
// import CommerceMap from '@pages/commerce/components/FindUs/map'
import {FC, useEffect, useRef, useState} from 'react'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import TransportMap from '@src/components/UI-kit/transportMap/transportMap'

interface Props {
  openMapModal: () => void
}

const FindUs: FC<Props> = ({openMapModal}) => {
  const isXXl = useIsMinWidth(1600)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const mapPoint = [{ coords: [59.99494649074784, 30.247901999999492], name: "офис Кронфорт", icon: 'Find_Icon_1.svg' }];

  return (
    <div className={`${styles.wrapper} ${isVisible ? styles.visible : ""}`} ref={sectionRef}>
      <div className={styles.mapWrapper}>
        <div className={styles.title}>Как нас найти</div>
        {/* <CommerceMap /> */}
        <TransportMap
          customPoi={mapPoint}
          customState={{center: [59.99494649074784, 30.247901999999492], zoom: 9}}
          wrapperClass={styles.commerce_map}
          withPoi
        />
        <div className={styles.mobileButtonWrapper}>
          <FullButton
            type={'Button'}
            buttonText={'СМОТРЕТЬ НА КАРТЕ'}
            onClick={() => {
              openMapModal()
            }}
            activeButton={true}
            border={false}
            borderColor={'none'}
            extraClass={styles.mobileButton}
            buttonFill={'white'}
          />
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={`${styles.commerceWrapper} ${styles.infoBlock}`}>
          {isXXl && <LineWhite />}
          <div className={styles.infoInnerWrapper}>
            <div className={`${styles.infoTitle}`}>Коммерческий отдел</div>
            <div className={`${styles.infoBody}`}>
              <div className={styles.textWrapper}>
                <Map />
                <div className={`${styles.text}`}>
                  Бизнес-центр «Лахта-2», ул. Оптиков, 4, корпус 3, лит.А, ст.м. «Старая деревня»
                </div>
              </div>
              <div className={styles.textWrapper}>
                <ClockIcon />
                <div className={`${styles.text}`}>
                  <div>По будням: с 9:30 до 18:00</div>
                  <div>Выходные: суббота – воскресенье</div>
                </div>
              </div>
            </div>
            <div className={`${styles.infoFooter}`}>
              <div className={styles.footerTitle}>+7 921 431 19 22</div>
              <div className={styles.footerSub}>телефон для связи</div>
            </div>
            <WhiteStar className={styles.starIcon} />
          </div>
        </div>
        <div className={`${styles.salesWrapper} ${styles.infoBlock}`}>
          {isXXl && <LineBlue />}
          <div className={styles.infoInnerWrapper}>
            <div className={`${styles.infoTitle}`}>Отдел продаж</div>
            <div className={`${styles.infoBody}`}>
              <div className={styles.textWrapper}>
                <Map />
                <div className={`${styles.text}`}>
                  ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»
                </div>
              </div>
              <div className={styles.textWrapper}>
                <ClockIcon />
                <div className={`${styles.text}`}>
                  <div>По будням: с 9:30 до 18:00</div>
                  <div>Выходные: суббота – воскресенье</div>
                </div>
              </div>
            </div>
            <div className={`${styles.infoFooter}`}>
              <div className={styles.footerTitle}>+7 812 602 20 10</div>
              <div className={styles.footerSub}>телефон для связи</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindUs
