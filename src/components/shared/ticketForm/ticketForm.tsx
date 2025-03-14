'use client'
import styles from './ticketForm.module.scss'
import {useState} from 'react'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {FC} from 'react'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import clsx from 'clsx'

interface ITicketFormProps {
  description?: string
  onSuccess?: () => void

  formContainerClassName?: string
}

const TicketForm: FC<ITicketFormProps> = (props) => {
  const {description = 'Оставьте заявку и мы поможем вам с выбором кладовой', formContainerClassName} = props

  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className={clsx(formContainerClassName, styles['ticketForm'])}>
      <div className='header'>
        <p className={styles['header__title']}>{description}</p>
      </div>
      <form className={clsx(styles['info'])}>
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
        <FullButton
          type={'Button'}
          buttonText={'ОТПРАВИТЬ'}
          activeButton={true}
          border={false}
          borderColor={''}
          extraClass={styles.button}
          buttonFill='bronze-500'
          buttonElementColor='white'
          buttonBorderRadius={'6px'}
        />
        <p className={styles.caption}>
          Нажимая кнопку «Отправить», вы даёте согласие на <a href='/consent'>обработку своих персональных данных</a>
        </p>
      </form>
    </div>
  )
}

export default TicketForm
