'use client'
import {ChangeEvent, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {IProfile} from '@src/types/profile.interface'
import {breadcrumbItems} from './config/breadcrumbs'
import styles from './profile.module.scss'
import {Col, Row} from 'antd'
import {useStore} from '@src/lib/store/store'
import {GetProfile, UpdateProfile} from '@src/actions/profile'
import {IUser} from '@src/types/auth.interface'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {getInputStyle, setContainerStyle} from '@src/lib/utils/profile/input-style'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import {InputField} from '@src/components/UI-kit/BaseControls/inputs/input-field/input-field'

export const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    watch
  } = useForm<IProfile>({mode: 'onChange', progressive: false})

  const {token} = useStore()

  const onSubmit = handleSubmit(async (data: IProfile) => {
    console.log(data)

    const updatedProfile = {
      name: data.name,
      surname: data.surname,
      email: data.email || '',
      phone: data.phone
    }

    const res = await UpdateProfile(token, updatedProfile)
    console.log(res)
  })

  const [profile, setProfile] = useState<IUser>()
  const [isLoading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const res = await GetProfile(token)
      setProfile(res.user)
      setLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unauthorized') {
          console.log('Unauthorized:', error.message)
          // Действия по обработке ошибки "Unauthorized"
          //router.push('/')
        } else {
          console.error('Error profile:', error.message)
          // Действия по обработке других ошибок
        }
      } else {
        console.error('Unknown error:', error)
        // Действия по обработке неожиданных типов ошибок
      }
    }
  }

  useEffect(() => {
    console.log(token)
    checkAuth()
  }, [])

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('surname', profile.surname)
      setValue('email', profile.email)
      setValue('phone', profile.phone)
    }
  }, [profile, setValue])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    const formattedValue = value

    const validNames = ['name', 'surname', 'email']

    if (validNames.includes(name)) {
      setValue(name as keyof IProfile, formattedValue, {shouldValidate: true})
    } else {
      console.error(`Ошибка: некорректное имя '${name}'`)
    }
  }

  const watchedValues = watch()

  return (
    <MainContainer>
      <Title title='Профиль' breadcrumbs={breadcrumbItems} />
      <div className={styles.profile}>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <Row justify='start' style={{width: '100%'}}>
            <Col className={styles.grid}>
              <form onSubmit={onSubmit} className={styles.form_profile}>
                <div className={styles.group}>
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
                    style={getInputStyle(watchedValues.name)}
                    styleContainer={setContainerStyle(350)}
                    value={watch().name}
                  />

                  <InputField
                    {...register('surname' as keyof IProfile, {
                      required: 'Заполните это поле',
                      pattern: {
                        value: /^[а-яА-ЯёЁ\s]*$/,
                        message: 'Можно использовать только русские буквы'
                      },
                      onChange: (e) => {
                        handleInputChange(e)
                      }
                    })}
                    error={errors?.surname?.message}
                    title='Фамилия'
                    style={getInputStyle(watchedValues.surname)}
                    styleContainer={setContainerStyle(350)}
                  />
                </div>
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
                    error={errors?.phone?.message}
                    title='Телефон'
                    style={getInputStyle(watchedValues.phone)}
                    styleContainer={setContainerStyle(232)}
                    placeholder='+7 (___) ___-__-__'
                  />

                  <InputField
                    {...register('email' as keyof IProfile, {
                      onChange: (e) => {
                        handleInputChange(e)
                      }
                    })}
                    error={errors?.email?.message}
                    title='E-mail'
                    style={getInputStyle(watchedValues.email)}
                    styleContainer={setContainerStyle(193)}
                  />
                </div>
                <div className={styles.submit}>
                  <FilledButton type='submit'>Сохранить</FilledButton>
                </div>
              </form>
            </Col>
          </Row>
        )}
      </div>
    </MainContainer>
  )
}
