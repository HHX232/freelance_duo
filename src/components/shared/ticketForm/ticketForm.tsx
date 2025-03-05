'use client'
import styles from './ticketForm.module.scss'
import FilledButton from '@shared/filledButton/FilledButton'
import {useState} from 'react'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {FC} from 'react'

interface ITicketFormProps {
  description?: string
  onSuccess?: () => void
}

const TicketForm: FC<ITicketFormProps> = ({description = 'Оставьте заявку и мы поможем вам с выбором кладовой'}) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className={styles['ticketForm']}>
      <div className='header'>
        <p className={styles['header__title']}>{description}</p>
      </div>
      <form className={styles['info']}>
        <div className={styles['input-wrapper']}>
          <span className={styles['input-label']}>Имя</span>
          <input className={styles.input} placeholder='Введите имя' />
        </div>
        <div className={styles['input-wrapper']}>
          <span className={styles['input-label']}>Телефон</span>
          <input
            className={styles.input}
            placeholder='+7 (___) ___-__-__'
            onChange={(e) => {
              const formattedValue = formatPhoneNumber(e.target.value)
              setPhoneNumber(formattedValue)
            }}
            maxLength={18}
            pattern={'/^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$/'}
            value={phoneNumber}
          />
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
