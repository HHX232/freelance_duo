import styles from './index.module.scss'
import {useSwiper} from 'swiper/react'
import PropTypes from 'prop-types'

const SliderButtons = ({swiperState}: {swiperState: {isBeginning: boolean; isEnd: boolean}}) => {
  const swiper = useSwiper()
  const {isBeginning, isEnd} = swiperState

  return (
    <>
      <button className={styles.nextButton} onClick={() => swiper.slidePrev()}>
        <svg width='47' height='16' viewBox='0 0 47 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            style={{fill: isBeginning ? 'rgba(255, 255, 255, 0.25)' : '#fff'}}
            d='M46.7071 8.70711C47.0976 8.31658 47.0976 7.68342 46.7071 7.29289L40.3431 0.928932C39.9526 0.538408 39.3195 0.538408 38.9289 0.928932C38.5384 1.31946 38.5384 1.95262 38.9289 2.34315L44.5858 8L38.9289 13.6569C38.5384 14.0474 38.5384 14.6805 38.9289 15.0711C39.3195 15.4616 39.9526 15.4616 40.3431 15.0711L46.7071 8.70711ZM46 7L0 7V9L46 9V7Z'
            fill='white'
          />
        </svg>
      </button>

      <button className={styles.prevButton} onClick={() => swiper.slideNext()}>
        <svg width='47' height='16' viewBox='0 0 47 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            style={{fill: isEnd ? 'rgba(255, 255, 255, 0.25)' : '#fff'}}
            d='M46.7071 8.70711C47.0976 8.31658 47.0976 7.68342 46.7071 7.29289L40.3431 0.928932C39.9526 0.538408 39.3195 0.538408 38.9289 0.928932C38.5384 1.31946 38.5384 1.95262 38.9289 2.34315L44.5858 8L38.9289 13.6569C38.5384 14.0474 38.5384 14.6805 38.9289 15.0711C39.3195 15.4616 39.9526 15.4616 40.3431 15.0711L46.7071 8.70711ZM46 7L0 7V9L46 9V7Z'
            fill='white'
          />
        </svg>
      </button>
    </>
  )
}

SliderButtons.propTypes = {
  swiperState: PropTypes.shape({
    isBeginning: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired
  }).isRequired
}

export default SliderButtons
