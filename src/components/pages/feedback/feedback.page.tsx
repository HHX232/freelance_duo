'use client'
import styles from './feedback.module.scss'
import {Metadata} from 'next'
import Link from 'next/link'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'

import {IProfile} from '@src/types/profile.interface'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {Agree} from '@shared/agree/agree'
import {useForm} from 'react-hook-form'
import {ChangeEvent, useEffect, useState} from 'react'
import {LightBorder} from '@shared/light-border/light-border'
import NextImage from 'next/image'
import {sendCallBack} from '@src/actions/contacts'
import {SuccessContactPopup} from '@src/components/UI-kit/Popups-Modals/success-contact-popup/success-contact-popup'
import {InputField} from '@src/components/UI-kit/BaseControls/inputs/input-field/input-field'
import {TextBox} from '@src/components/UI-kit/BaseControls/inputs/textbox/textbox'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

const breadcrumbItems = [{title: 'Главная', href: '/'}, {title: 'Служба доверия'}]

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Служба доверия – позвонить на горячую линию ЖК «Кронфорт»',
    description:
      'Контакты горячей линии службы доверия застройщика «Алькор», позвонить на горячую линию, если есть вопросы и пожелания. '
  }
}

const FeedbackPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    watch,
    reset
  } = useForm<IProfile>({mode: 'onChange', progressive: false})

  const [openSuccess, setOpenSuccess] = useState(false)

  const onSubmit = handleSubmit(async (data: IProfile) => {
    console.log(data)
    if (!sessionID) {
      console.error('Session ID is not available. Please wait until it is loaded.')
      return // Прерываем выполнение, если sessionID еще не получен
    }
    const reqForm = {
      phone: data.phone,
      name: data.name,
      comment: data.comment,
      sessionID: sessionID as string
    }

    const res = await sendCallBack(reqForm.phone, reqForm.name, reqForm.sessionID, reqForm.comment)

    if (res.success) {
      setOpenSuccess(true)
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

  const handleCloseSuccess = () => {
    setOpenSuccess(false)
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

  // Логирование sessionId после его обновления
  useEffect(() => {
    if (sessionID) {
      console.log('Session ID:', sessionID)
    }
  }, [sessionID])

  return (
    <MainContainer>
      <Title title='Служба доверия' breadcrumbs={breadcrumbItems} dashboard={true} />
      <div className={styles.feedback}>
        <section className={styles.feedbackContent}>
          <div className={styles.qr}>
            <p className={styles.feedbackTitle}>Позвонить на линию доверия</p>
            <NextImage src='/qr.svg' alt='map' width={242} height={242} className={styles.image} />
            <p className={styles.textBottom}>Отсканируйте QR-код, чтобы позвонить на номер линии доверия</p>
          </div>
          <div className={styles.forma}>
            <p className={styles.feedbackTitle}>Контакты горячей линии</p>
            <div className={styles.feedbackItem}>
              <span className={styles.centerText}>
                <span>Телефон</span>
                <a href='tel:+7-800-250-73-22'>+7 800 250-73-22</a>
              </span>
            </div>
            <div className={styles.feedbackItem}>
              <span className={styles.centerText}>
                <span>Электронная почта</span>
                <Link href='mailto:mail@doverie.msk.ru'>mail@doverie.msk.ru</Link>
              </span>
            </div>
            <div className={styles.feedbackItem}>
              <span className={styles.centerText}>
                <span> Почтовый адрес:</span>
                <br />
                123242, Москва, а/я No 71 «Служба доверия»
              </span>
            </div>
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
                title='Телефон'
                styleContainer={{gridGap: '8px'}}
                placeholder='+7 (___) ___-__-__'
                className={styles.phone}
              />
              <TextBox
                {...register('comment', {
                  onChange: (e) => {
                    setValue('comment', e.target.value, {shouldValidate: true})
                  }
                })}
                error={errors?.comment?.message}
                title='Комментарий'
                styleContainer={{gridGap: '8px'}}
                className={styles.phone}
              />
              <div className={styles.submit}>
                <FullButton
                  extraClass={styles.extra_button}
                  buttonBorderRadius='6px'
                  buttonElementColor='white'
                  activeButton
                  buttonText='Отправить'
                  buttonFill='bronze-500'
                  border={false}
                  borderColor='none'
                  onClick={onSubmit} // Add onClick handler to trigger form submission
                  alternativeBorderOnActive
                  alternativeBorderColor='bronze'
                  alternativeBorderWidth='3px'
                />
              </div>
            </form>
            <Agree className={styles.agree_custom} />
          </div>
          <div className={styles.services}>
            <div className={styles.light}>
              <LightBorder />
            </div>
            <p className={styles.feedbackTitle}>Служба доверия</p>
            <p className={styles.text}>
              Уважаемые клиенты! <br />
              Открытость, честность и доверие — ключевые ценности нашей компании. С целью повышения качества сервиса, а
              также дополнительного контроля работы нашей команды вы можете направить свои предложения и замечания о
              качестве предоставляемых услуг. Вы можете обратиться на Линию доверия, если при общении с представителями
              компании вы столкнулись с некорректным поведением или обнаружили несоблюдение условий и положений,
              закрепленных в договорах. Линия доверия конфиденциальна и создана для того, чтобы помогать в тех
              ситуациях, которые могут нанести вам материальный или моральный ущерб.
            </p>
          </div>
        </section>
      </div>

      {openSuccess && <SuccessContactPopup onClose={handleCloseSuccess} />}
    </MainContainer>
  )
}

export default FeedbackPage
