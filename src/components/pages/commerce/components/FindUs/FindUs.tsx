"use client"
import styles from './FindUs.module.scss'
// import Icon_1 from '@icons/Find_Icon_1.svg'
// import Icon_2 from '@icons/Find_Icon_2.svg'
import ClockIcon from '@icons/commerce_clock.svg'
import Map from '@icons/map.svg'
import WhiteStar from '@icons/white_star.svg'
import LineBlue from '@icons/line_blue.svg'
import LineWhite from '@icons/line_white.svg'
import {useIsMinWidth} from '@utils/useIsMobile'

const FindUs = () => {

  const isXXl = useIsMinWidth(1600)

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <div className={styles.title}>Как нас найти</div>
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
          { isXXl && <LineBlue /> }
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
