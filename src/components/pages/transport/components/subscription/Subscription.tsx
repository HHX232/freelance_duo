'use client'
import FilledButton from '@shared/filledButton/FilledButton'
import { InputField } from '@src/components/UI-kit/inputs/input-field/input-field'
import styles from './Subscription.module.scss'
import {IProfile} from '@src/types/profile.interface'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {useForm} from 'react-hook-form'
import { useState, useEffect, ChangeEvent } from 'react'

const Subscription = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    watch
  } = useForm<IProfile>({mode: 'onChange', progressive: false})
  const [sessionID, setSessionID] = useState('')
  const modId = 'bh8by9g8' // Ваш modId

  useEffect(() => {
      const checkCT = () => {
        if (typeof window !== 'undefined' && window.ct) {
          // Если window.ct доступен, получить sessionId
          const sessionId = window.ct('calltracking_params', modId)?.sessionId
          console.log('Session ID:', sessionId)
          setSessionID(sessionId)
        } else {
          // Попробуем еще раз через небольшую задержку
          setTimeout(checkCT, 1000) // Повторяем проверку через 1 секунду
        }
      }
  
      // Запускаем первоначальную проверку
      checkCT()
    }, [modId])

  const onSubmit = handleSubmit(async (data: IProfile) => {
      console.log(data)
      if (!sessionID) {
        console.error('Session ID is not available. Please wait until it is loaded.')
        return // Прерываем выполнение, если sessionID еще не получен
      }
      const reqForm = {
        phone: data.phone,
        name: data.name,
        sessionID: sessionID as string
      }
  
      const res = {success: 'todo'}; //await sendCallBack(reqForm.phone, reqForm.name, reqForm.sessionID, reqForm.comment)
  
      if (res.success) {
        console.log('FORM SENT', reqForm)
      }
    })
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target
  
      const formattedValue = value
  
      const validNames = ['name']
  
      if (validNames.includes(name)) {
        setValue(name as keyof IProfile, formattedValue, {shouldValidate: true})
      } else {
        console.error(`Ошибка: некорректное имя '${name}'`)
      }
    }

  return (
    <div>
      <section className={styles['contact-form-wrapper']}>
        <div className={styles['info']}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Узнайте больше</h3>
            <p className={styles.description}>
              Оставьте заявку на обратный звонок и  персональный менеджер свяжется с вами для уточнения деталей
            </p>
            <form onSubmit={onSubmit}>
              {/* <div className={styles['input-wrapper']}>
                <span className={`${styles['input-label']} ${styles.zero_margin}`}>Имя</span>
                <input className={styles.input} placeholder='Введите имя' />
              </div> */}
              {/* <div className={styles['input-wrapper']}>
                <span className={`${styles['input-label']} ${styles.zero_margin}`}>Телефон</span>
                <input className={styles.input} placeholder='+7 (___) ___-__-__' />
              </div> */}
              <InputField
                {...register('name' as keyof IProfile, {
                  required: 'Заполните это поле',
                  pattern: {
                    value: /^[а-яА-ЯёЁ\s]*$/,
                    message: 'Можно использовать только русские буквы'
                  },
                  onChange: (e) => {
                    handleInputChange(e)
                  }
                })}
                error={errors?.name?.message}
                stylesLabel={'subscription_input_label'}
                title='Имя'
                value={watch().name}
                className={styles.subscription_input}
              />
              <InputField
                {...register('phone' as keyof IProfile, {
                  required: 'Это поле обязательно для заполнения',
                  onChange: (e) => {
                    const formattedValue = formatPhoneNumber(e.target.value)
                    setValue('phone', formattedValue, {shouldValidate: true})
                  },
                  pattern: {
                    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Неверный формат номера телефона'
                  }
                })}
                error={errors?.phone?.message}
                stylesLabel={'subscription_input_label'}
                title='Телефон'
                styleContainer={{gridGap: '8px'}}
                placeholder='+7 (___) ___-__-__'
                className={styles.subscription_input}
              />
              <FilledButton>Отправить</FilledButton>
              <p className={styles.caption}>
                Нажимая кнопку «Отправить», вы даёте согласие на{' '}
                <a href='/consent'>обработку своих персональных данных</a>
              </p>
            </form>
          </div>
        </div>
        <div className={styles.bg} />
      </section>
    </div>
  )
}

export default Subscription