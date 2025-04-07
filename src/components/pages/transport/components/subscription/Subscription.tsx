'use client'
import styles from './Subscription.module.scss'
import {IProfile} from '@src/types/profile.interface'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {useForm} from 'react-hook-form'
import {useState, useEffect} from 'react'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import InputPhoneUI from '@src/components/UI-kit/BaseControls/inputs/InputPhoneUI/InputPhoneUI'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'

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

    const res = {success: 'todo'} //await sendCallBack(reqForm.phone, reqForm.name, reqForm.sessionID, reqForm.comment)

    if (res.success) {
      console.log('FORM SENT', reqForm)
    }
  })

  return (
    <div>
      <section className={styles['contact-form-wrapper']}>
        <div className={styles['info']}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Узнайте больше</h3>
            <p className={styles.description}>
              Оставьте заявку на обратный звонок и персональный менеджер свяжется с вами для уточнения деталей
            </p>
            <form onSubmit={onSubmit}>
              <InputTextUI
                labelText='Имя'
                placeholder='Введите имя'
                icon={<></>}
                onlyType='onlyText'
                error={errors?.name?.message}
                {...register('name', {
                  required: 'Заполните это поле',
                  pattern: {
                    value: /^[а-яА-ЯёЁ\s]*$/,
                    message: 'Можно использовать только русские буквы'
                  }
                })}
                value={watch('name')}
                theme='white'
                extraStyle={{marginBottom: '24px'}}
              />
              <InputPhoneUI
                labelText='Телефон'
                placeholder='+7 (___) ___-__-__'
                theme='white'
                icon={<></>}
                error={errors?.phone?.message}
                {...register('phone', {
                  required: 'Это поле обязательно для заполнения',
                  pattern: {
                    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Неверный формат номера телефона'
                  }
                })}
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value)
                  setValue('phone', formattedValue, {shouldValidate: true})
                }}
                value={watch('phone')}
              />

              <FullButton
                border={false}
                buttonElementColor='white'
                containArrow={false}
                buttonText='Отправить'
                buttonFill='bronze-500'
                borderColor='none'
                buttonBorderRadius='6px'
                activeButton={true}
                extraClass={styles.button_extra}
                alternativeBorderOnActive
                alternativeBorderWidth='3px'
                alternativeBorderColor='bronze'
              ></FullButton>

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
