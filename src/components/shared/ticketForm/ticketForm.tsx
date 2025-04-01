'use client'
import styles from './ticketForm.module.scss'
import {FC, useEffect, useRef, useState} from 'react'
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
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div
      className={clsx(formContainerClassName, styles['ticketForm'])}
      itemScope
      ref={sectionRef}
      itemType='http://schema.org/ContactPage'
    >
      <div className='header'>
        <p className={`${styles['header__title']} ${isVisible ? styles.visible : ''}`} itemProp='description'>
          {description}
        </p>
      </div>
      <form className={clsx(styles['info'], isVisible ? styles.visible : '')} itemScope itemType='http://schema.org/ContactPoint'>
        <div className={styles['input-wrapper']}>
          <InputTextUI
            theme={'dark'}
            labelText={'Имя'}
            onlyType='onlyText'
            icon={true}
            placeholder='Введите имя'
            itemProp='name'
          />
        </div>
        <div className={styles['input-wrapper']}>
          <InputPhoneUI theme={'dark'} labelText={'Телефон'} icon={<></>} itemProp='telephone' />
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
          itemProp='potentialAction'
          alternativeBorderOnActive
          alternativeBorderColor='bronze'
          alternativeBorderWidth='3px'
        />
        <p className={styles.caption}>
          Нажимая кнопку «Отправить», вы даёте согласие на{' '}
          <a href='/consent' itemProp='url'>
            обработку своих персональных данных
          </a>
        </p>
      </form>
    </div>
  )
}

export default TicketForm
