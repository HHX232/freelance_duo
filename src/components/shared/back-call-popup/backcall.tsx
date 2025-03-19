'use client'
import styles from './backcall.module.scss'
import {ConfigProvider, Modal, TimePicker} from 'antd'
import {ChangeEvent, useEffect, useState} from 'react'
import FilledButton from '@shared/filledButton/FilledButton'
import dayjs from 'dayjs'
import {Agree} from '@shared/agree/agree'
import {IProfile} from '@src/types/profile.interface'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {useForm} from 'react-hook-form'
import {sendCallTouch} from '@src/actions/contacts'
import {SuccessContactPopup} from '@shared/success-contact-popup/success-contact-popup'
import {InputField} from '@src/components/UI-kit/BaseControls/inputs/input-field/input-field'

export const Backcall = ({onClose}: {onClose: () => void}) => {
  const [openSuccess, setOpenSuccess] = useState(false)

  const format = 'HH:mm'
  const currentTime = dayjs()

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    watch,
    reset
  } = useForm<IProfile>({mode: 'onChange', progressive: false})

  const onSubmit = handleSubmit(async (data: IProfile) => {
    if (!sessionID) {
      console.error('Session ID is not available. Please wait until it is loaded.')
      return // Прерываем выполнение, если sessionID еще не получен
    }

    const reqForm = {
      phone: data.phone,
      name: data.name,
      time: selectedTime.format(format),
      sessionID: sessionID as string
    }

    const res = await sendCallTouch(reqForm.phone, reqForm.name, reqForm.time, reqForm.sessionID)

    if (res.success) {
      setOpenSuccess(true)
    }

    console.log(res)
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

  const [selectedTime, setSelectedTime] = useState(dayjs())

  const handleCloseSuccess = () => {
    setOpenSuccess(false)
    onClose()
    reset()
  }

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

  return (
    <>
      <Modal
        open={true}
        footer={null}
        onCancel={onClose}
        width={584}
        centered
        wrapClassName={styles.modal}
        bodyStyle={{padding: 0}}
      >
        <div className={styles.backcall}>
          <h3>Заказать обратный звонок</h3>

          <form className={styles.form} onSubmit={onSubmit}>
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
              title='Имя'
              value={watch().name}
              variety='secondary'
              style={{maxWidth: '340px', width: '100%'}}
              styleContainer={{maxWidth: '350px', width: '100%', gridGap: '8px'}}
            />

            <div className={styles.group}>
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
                variety='secondary'
                error={errors?.phone?.message}
                title='Телефон'
                styleContainer={{gridGap: '8px'}}
                placeholder='+7 (___) ___-__-__'
                className={styles.phone}
              />

              <div className={styles.select}>
                <ConfigProvider theme={{token: {colorPrimary: '#d38f6d', fontFamily: 'Gotham Pro'}}}>
                  <span className={styles.select_time}>Время</span>
                  <TimePicker
                    placeholder='Время'
                    defaultValue={currentTime}
                    format={format}
                    showNow={false}
                    onChange={(time) => setSelectedTime(time)}
                    suffixIcon={
                      <svg width='14' height='18' viewBox='0 0 14 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M6.34535 0.566947C6.72112 0.241519 7.27888 0.241519 7.65465 0.566947L11.0346 3.49407C11.7345 4.1002 11.3058 5.25 10.38 5.25H3.62005C2.69416 5.25 2.26549 4.10021 2.96539 3.49407L6.34535 0.566947Z'
                          fill='#D9D9D9'
                        />
                        <path
                          d='M7.65465 17.4331C7.27888 17.7585 6.72112 17.7585 6.34535 17.4331L2.9654 14.5059C2.26549 13.8998 2.69416 12.75 3.62005 12.75L10.38 12.75C11.3058 12.75 11.7345 13.8998 11.0346 14.5059L7.65465 17.4331Z'
                          fill='#D9D9D9'
                        />
                      </svg>
                    }
                    rootClassName={styles.time}
                    width={108}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className={styles.submit}>
              <FilledButton variety='primary' type='submit'>
                Заказать
              </FilledButton>
            </div>
          </form>
          <Agree className={styles.agree_custom} />
        </div>
      </Modal>
      {openSuccess && <SuccessContactPopup onClose={handleCloseSuccess} />}
    </>
  )
}
