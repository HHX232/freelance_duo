'use client'
import styles from './ticketForm.module.scss'
import {FC} from 'react'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import clsx from 'clsx'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'
import InputPhoneUI from '@src/components/UI-kit/BaseControls/inputs/InputPhoneUI/InputPhoneUI'

interface ITicketFormProps {
  description?: string
  onSuccess?: () => void

  formContainerClassName?: string
}

const TicketForm: FC<ITicketFormProps> = (props) => {
  const {description = 'Оставьте заявку и мы поможем вам с выбором кладовой', formContainerClassName} = props

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
          <InputPhoneUI theme={'dark'} labelText={'Телефон'} icon={<></>} />
        </div>
        <FullButton
          type={'Button'}
          buttonText={'ОТПРАВИТЬ'}
          activeButton={true}
          border={false}
          borderColor={'none'}
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
