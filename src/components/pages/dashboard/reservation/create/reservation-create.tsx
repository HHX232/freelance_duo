// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'
import {useForm} from 'react-hook-form'
import {IProfile} from '@src/types/profile.interface'
import {useEffect, useState} from 'react'
import {formatDateString, formatInputValue, isValidDate, isValidDigit} from '@src/lib/utils/profile/format-input'
import styles from './create.module.scss'

import {Col, Modal, Row} from 'antd'
import {getInputStyle, setContainerStyle} from '@src/lib/utils/profile/input-style'
import {breadcrumbItems} from '@pages/dashboard/reservation/create/config/breadcrumbs'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import {Agree} from '@shared/agree/agree'
import {useStore} from '@src/lib/store/store'
import {ReservationInterface} from '@src/types/reservation.interface'
import {createReservation} from '@src/actions/reservation'
import {useRouter} from 'next/navigation'
import {InputField} from '@src/components/UI-kit/BaseControls/inputs/input-field/input-field'

export const ReservationCreate = ({id}: {id: string}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    watch
  } = useForm<IProfile>({mode: 'onChange', progressive: false})

  const {token} = useStore()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const [errorForm, setErrorForm] = useState('')
  const [isSuccess, setSuccess] = useState(false)

  const onSubmit = handleSubmit(async (data: ReservationInterface) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    console.log(data)

    const reservation = {
      object_guid: id,
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic || '',
      born: data.born,
      passport_ser: data.passport_series,
      passport_no: data.passport_number,
      token: token
    }

    const res = await createReservation(
      reservation.object_guid,
      reservation.name,
      reservation.surname,
      reservation.patronymic,
      reservation.born,
      reservation.passport_ser,
      reservation.passport_no,
      reservation.token
    )

    if (res.success === false) {
      setErrorForm(res.message + ' ' + res?.reason)

      setIsSubmitting(false)

      setTimeout(() => {
        setErrorForm('')
      }, 3000)
    } else {
      setSuccess(true)
    }

    console.log(res)
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target

    let formattedValue = value

    if (name === 'born') {
      formattedValue = formatDateString(value)
    }

    if (name === 'passport_series') {
      formattedValue = formatInputValue(value, 'XX XX')
    }

    if (name === 'passport_number') {
      formattedValue = formatInputValue(value, 'XXX XXX')
    }

    const validNames = ['passport_number', 'name', 'surname', 'born', 'passport_series']

    if (validNames.includes(name)) {
      setValue(name as keyof IProfile, formattedValue, {shouldValidate: true})
    } else {
      console.error(`Ошибка: некорректное имя '${name}'`)
    }
  }
  const watchedValues = watch()

  useEffect(() => {
    if (watchedValues.born) {
      const formattedValue = formatDateString(watchedValues.born)
      setValue('born', formattedValue, {shouldValidate: true})
    }
  }, [watchedValues.born, setValue])

  const closeSuccess = () => {
    setSuccess(false)
    router.push('/lk/reservation')
  }

  return (
    <MainContainer>
      <Title title='Данные для брони' breadcrumbs={breadcrumbItems} dashboard={true} />
      <div className={styles.create}>
        <Row justify='start' style={{width: '100%'}}>
          <Col className={styles.grid}>
            <form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.form_grid}>
                <InputField
                  {...register('name', {
                    required: 'Заполните это поле',
                    pattern: {
                      value: /^[а-яА-ЯёЁ\s]*$/,
                      message: 'Можно использовать только русские буквы'
                    },
                    onChange: (e) => handleInputChange(e)
                  })}
                  error={errors?.name?.message}
                  title='Имя'
                  className={styles.name}
                  style={getInputStyle(watchedValues.name)}
                  styleContainer={setContainerStyle(350)}
                  value={watch().name}
                />
                <InputField
                  {...register('surname', {
                    required: 'Заполните это поле',
                    pattern: {
                      value: /^[а-яА-ЯёЁ\s]*$/,
                      message: 'Можно использовать только русские буквы'
                    },
                    onChange: (e) => handleInputChange(e)
                  })}
                  error={errors?.surname?.message}
                  title='Фамилия'
                  className={styles.surname}
                  style={getInputStyle(watchedValues.surname)}
                  styleContainer={setContainerStyle(350)}
                />

                <InputField
                  {...register('patronymic', {
                    pattern: {
                      value: /^[а-яА-ЯёЁ\s]*$/,
                      message: 'Можно использовать только русские буквы'
                    },
                    onChange: (e) => handleInputChange(e)
                  })}
                  error={errors?.patronymic?.message}
                  title='Отчество'
                  className={styles.patronymic}
                  style={getInputStyle(watchedValues.patronymic)}
                  styleContainer={setContainerStyle(350)}
                />

                <InputField
                  {...register('born', {
                    required: 'Заполните это поле',
                    validate: {
                      isValidFormat: (value) =>
                        isValidDate(value.toString()) || 'Неверный формат даты или нереалистичная дата'
                    }
                  })}
                  placeholder='ДД-ММ-ГГГГ'
                  error={errors?.born?.message}
                  title='Дата рождения'
                  className={styles.born}
                  onChange={handleInputChange}
                  onBlur={() => setValue('born', formatDateString(watchedValues.born), {shouldValidate: true})}
                  style={getInputStyle(watchedValues.born ? watchedValues.born.toString() : '')}
                  styleContainer={setContainerStyle(132)}
                />

                <div className={styles.passport_series_number}>
                  <span className={styles.title}>Серия и номер паспорта</span>
                  <div className={styles.group_title}>
                    <InputField
                      {...register('passport_series', {
                        required: 'Заполните это поле',
                        validate: {
                          isValidFormat: (value) =>
                            value ? isValidDigit(value.toString(), 'XX XX') || 'Неверный формат' : true
                        },
                        onChange: (e) => handleInputChange(e)
                      })}
                      title=''
                      className={styles.passport_series}
                      style={getInputStyle(
                        watchedValues.passport_series ? watchedValues.passport_series.toString() : ''
                      )}
                      styleContainer={setContainerStyle(78)}
                    />
                    <InputField
                      {...register('passport_number', {
                        required: 'Заполните это поле',
                        validate: {
                          isValidFormat: (value) =>
                            value ? isValidDigit(value.toString(), 'XXX XXX') || 'Неверный формат' : true
                        },
                        onChange: (e) => handleInputChange(e)
                      })}
                      title=''
                      className={styles.passport_number}
                      style={getInputStyle(
                        watchedValues.passport_number ? watchedValues.passport_number.toString() : ''
                      )}
                      styleContainer={setContainerStyle(263)}
                    />
                  </div>
                  <div className={styles.error}>
                    {errors?.passport_series?.message || errors?.passport_number?.message}
                  </div>
                </div>
              </div>

              <div className={styles.submit}>
                <FilledButton type='submit' disabled={isSubmitting}>
                  Отправить
                </FilledButton>
              </div>
              <div className={styles.msg}>{errorForm && <span className={styles.error}>{errorForm}</span>}</div>
              <div className={styles.agree_text}>
                <Agree />
              </div>
            </form>
          </Col>
        </Row>
      </div>

      <Modal open={isSuccess} footer={null} onCancel={closeSuccess} width={718} centered>
        <div className={styles.success}>
          <div className={styles.text}>
            <p>Заявка на бронирование отправлена.</p>
            <p>В ближайшее время с вами свяжется персональный менеджер</p>
          </div>

          <FilledButton onClick={closeSuccess} style={{maxWidth: '271px'}}>
            Продолжить
          </FilledButton>
        </div>
      </Modal>
    </MainContainer>
  )
}
