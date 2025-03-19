import {useForm} from 'react-hook-form'
import styles from './form-auth.module.scss'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import {ButtonCheckboxAgree} from '@pages/dashboard/auth/form-auth/components/agree'
import {Modal} from 'antd'
import Link from 'next/link'

interface IAuthFormPhone {
  onClose: () => void
  onSuccess: (data: IFormValues, status: boolean) => void
}

interface IFormValues {
  phone: string
  agree: boolean
}

export const AuthFormPhone = (props: IAuthFormPhone) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm<IFormValues>()
  const onSubmit = handleSubmit((data: IFormValues) => {
    props.onSuccess(data, true)
  })

  return (
    <Modal onCancel={props.onClose} open={true} footer={null} width={584} centered>
      <div className={styles.form}>
        <h3>Вход в личный кабинет</h3>
        <form className={styles.form_phone} onSubmit={onSubmit}>
          <div className={styles.form_container}>
            <label>
              <span className={styles.title}>Телефон</span>
              <div className={styles.input_container}>
                <input
                  {...register('phone', {
                    required: 'Это поле обязательно для заполнения',
                    onChange: (e) => {
                      const formattedValue = formatPhoneNumber(e.target.value)
                      setValue('phone', formattedValue, {shouldValidate: true})
                    },
                    maxLength: 18,
                    pattern: {
                      value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                      message: 'Неверный формат номера телефона'
                    }
                  })}
                  placeholder='+7 (____) ___-__-__'
                  autoComplete='false'
                />

                {errors.phone && <span className={styles.error}>{errors.phone.message as string}</span>}
              </div>
            </label>
            <div className={styles.submit}>
              <FilledButton type='submit' variety='primary'>
                Получить СМС-код
              </FilledButton>
            </div>
          </div>
          <div className={styles.agree}>
            <ButtonCheckboxAgree {...register('agree', {required: 'Вы должны дать согласие'})}>
              <div className={errors.agree ? styles.error : ''}>
                Даю согласие на обработку моих{' '}
                <Link href={'/consent'}>
                  <span className={errors.agree ? styles.error : ''}>персональных данных</span>
                </Link>
              </div>
            </ButtonCheckboxAgree>
          </div>
        </form>
      </div>
    </Modal>
  )
}
