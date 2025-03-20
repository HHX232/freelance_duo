'use client'
import styles from './ticketForm.module.scss'
import {useState} from 'react'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {FC} from 'react'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import clsx from 'clsx'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'

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
          <InputTextUI theme={'dark'} labelText={'Имя'} onlyType='onlyText' icon={true} placeholder='Введите имя' />
        </div>
        <div className={styles['input-wrapper']}>
          <InputTextUI
            theme={'dark'}
            labelText={'Телефон'}
            icon={true}
            placeholder='+7 (___) ___-__-__'
            onChange={(e) => {
              const formattedValue = formatPhoneNumber(e.target.value)
              setPhoneNumber(formattedValue)
            }}
            maxLength={18}
            // customPattern={/^\+7(\s\(\d{0,3}\))?(\s\d{0,3})?(-\d{0,2})?(-\d{0,2})?$/}
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
