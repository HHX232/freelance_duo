import {FC} from 'react'
import styles from './ScrollOnTopButton.module.scss'

const ScrollOnTopButton: FC = () => {
  return (
    <button className={styles.button}>
      <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0 6C0 2.68629 2.68629 0 6 0H42C45.3137 0 48 2.68629 48 6V42C48 45.3137 45.3137 48 42 48H6C2.68629 48 0 45.3137 0 42V6Z'
          fill='white'
        />
        <path d='M24 32V16' stroke='#555555' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M18 22L24 16L30 22' stroke='#555555' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </button>
  )
}

export default ScrollOnTopButton
