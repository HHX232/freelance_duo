'use client'
import styles from './dashboard.module.scss'
import {MainContainer} from '@shared/containers/main/main-container'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import Link from 'next/link'
import ReservSVG from '@icons/reserv.svg'

interface Square {
  id: number
  background: string
  opacity: number
  content?: React.ReactNode
}

const Reservation = () => {
  return (
    <Link href={`/lk/reservation`}>
      <div className={styles.reservation}>
        <ReservSVG />
        Бронь
      </div>
    </Link>
  )
}
export const Dashboard = () => {
  const squares = [
    {id: 1, background: '#fff', opacity: 0.75},
    {id: 2, background: '#fff', opacity: 0.5, content: <Reservation />},
    {id: 3, background: '#fff', opacity: 0.25},
    {id: 4, background: 'transparent', opacity: 1},
    {id: 5, background: 'transparent', opacity: 1},
    {id: 6, background: '#fff', opacity: 0.25},
    {id: 7, background: '#fff', opacity: 0.25, content: <NewCard />},
    {id: 8, background: 'transparent', opacity: 1},
    {id: 9, background: 'transparent', opacity: 1},
    {id: 10, background: '#fff', opacity: 0.25},
    {id: 11, background: '#fff', opacity: 0.5},
    {id: 12, background: 'transparent', opacity: 1}
  ]

  return (
    <MainContainer>
      <div className={styles.hero}>
        <div className={styles.text}>
          <h2>У вас нет объектов. Перейдите к выбору</h2>
          <Link href={'/planirovki-i-ceny'}>
            <FilledButton>Выбрать</FilledButton>
          </Link>
        </div>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.squares}>
          {squares.map((square: Square) => (
            <div
              key={square.id}
              className={`${styles.square} ${square.content ? styles.withContent : styles.withoutContent}`}
              style={{background: square.background, opacity: square.opacity}}
            >
              {square.content && <div className={styles.content}>{square.content}</div>}
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  )
}
const NewCard = () => {
  return (
    <div className={styles.new}>
      <div className={styles.date}>
        <div className={styles.day}>
          29 <br />
          октября
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.news_text}>
          Текст получил широкое распространение в учебных и демонстрационных материалах по полиграфии и дизайну печатных
          изданий и веб-страниц. Распространился в 1970-х годах из-за трафаретов компании Letraset, a затем — из-за
          того, что служил примером текста в программе PageMaker. Текст получил широкое распространение в учебных и
          демонстрационных материалах по полиграфии и дизайну печатных изданий и веб-страниц. Распространился в 1970-х
          годах из-за трафаретов компании Letraset, a затем — из-за того, что служил примером текста в программе
          PageMaker.
        </p>
      </div>
      <div className={styles.arrows}>
        <button type='button'>
          <svg width='46' height='8' viewBox='0 0 46 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1.00059 3.65766C0.813137 3.84511 0.813137 4.14903 1.00059 4.33648L4.05529 7.39118C4.24274 7.57863 4.54666 7.57863 4.73411 7.39118C4.92157 7.20373 4.92157 6.89981 4.73411 6.71236L2.01882 3.99707L4.73411 1.28178C4.92157 1.09433 4.92157 0.79041 4.73411 0.602958C4.54666 0.415506 4.24274 0.415506 4.05529 0.602958L1.00059 3.65766ZM45.5 3.51707L1.34 3.51707V4.47707L45.5 4.47707V3.51707Z'
              fill='white'
            />
          </svg>
        </button>
        <button type='button'>
          <svg width='45' height='8' viewBox='0 0 45 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M44.6793 4.33648C44.8667 4.14903 44.8667 3.84511 44.6793 3.65766L41.6246 0.602958C41.4371 0.415506 41.1332 0.415506 40.9457 0.602958C40.7583 0.79041 40.7583 1.09433 40.9457 1.28178L43.661 3.99707L40.9457 6.71236C40.7583 6.89981 40.7583 7.20373 40.9457 7.39118C41.1332 7.57863 41.4371 7.57863 41.6246 7.39118L44.6793 4.33648ZM44.3398 3.51707L0.179844 3.51707V4.47707L44.3398 4.47707V3.51707Z'
              fill='white'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
