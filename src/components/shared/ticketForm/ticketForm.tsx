'use client'
import styles from './ticketForm.module.scss'
import FilledButton from '@shared/filledButton/FilledButton'

const TicketForm = () => {
  return (
    <div className={styles['ticketForm']}>
      <div className='header'>
        <p>Оставьте заявку и мы поможем вам с выбором кладовой</p>
      </div>
      <form className={styles['info']}>
        <div className={styles['input-wrapper']}>
          <span className={styles['input-label']}>Имя</span>
          <input className={styles.input} placeholder='Введите имя' />
        </div>
        <div className={styles['input-wrapper']}>
          <span className={styles['input-label']}>Телефон</span>
          <input className={styles.input} placeholder='+7 (___) ___-__-__' />
        </div>
        <FilledButton>Отправить</FilledButton>
        <p className={styles.caption}>
          Нажимая кнопку «Отправить», вы даёте согласие на <a href='/consent'>обработку своих персональных данных</a>
        </p>
      </form>
    </div>
  )
}

export default TicketForm
