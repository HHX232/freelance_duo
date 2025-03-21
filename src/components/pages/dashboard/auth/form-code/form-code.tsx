import {useRef, useState} from 'react'
import {useForm} from 'react-hook-form'

import styles from './form-code.module.scss'
import {ResendCode} from '@pages/dashboard/auth/form-code/components/resend-code'
import FilledButton from '@src/components/UI-kit/BaseControls/buttons/old/filledButton/FilledButton'
import {Modal, Skeleton} from 'antd'
import VerificationCode from '@pages/dashboard/auth/form-code/components/verification-code'

interface IAuthFormCode {
  onClose: () => void
  onSuccess: (data: IFormValues, status: boolean) => void
  onChangePhone: () => void
  phone: string
  agree: boolean
}

export interface IFormValues {
  code: string
}

export const AuthFormCode = (props: IAuthFormCode) => {
  const {register, handleSubmit, setValue} = useForm<IFormValues>()

  const resendCodeRef = useRef<{resetTimer: () => void}>()

  const onSubmit = handleSubmit((data: IFormValues) => {
    setConfirm(true)

    props.onSuccess(data, true)
    //resendCodeRef.current?.resetTimer()
  })

  const handleTimerEnd = () => {
    console.log('Таймер закончился')
  }

  const [isChangeCode, setChangeCode] = useState(true)

  const [isConfirm, setConfirm] = useState(false)

  return (
    <Modal
      open={true}
      footer={null}
      onCancel={props.onClose}
      style={{maxHeight: '360px'}}
      styles={{body: {maxHeight: '360px'}}}
      centered
    >
      <div className={styles.form}>
        {!isConfirm && (
          <h3>
            Введите код, <br /> отправленный в СМС
          </h3>
        )}
        <div className={styles.form_code_popup}>
          {!isConfirm ? (
            <form onSubmit={onSubmit} className={styles.form_code}>
              <div className={styles.phone_send}>
                Код отправлен на номер {props.phone}.{' '}
                <button type='button' className={styles.change} onClick={() => props.onChangePhone()}>
                  Изменить номер
                </button>
              </div>

              <div className={styles.code}>
                <VerificationCode
                  length={4}
                  autoFocus={true}
                  onCompleted={(data) => {
                    setValue('code', data, {shouldValidate: true})
                    setChangeCode(false)
                  }}
                  onChange={() => setChangeCode(true)}
                  type='number'
                />
              </div>

              <input
                type='hidden'
                {...register('code', {
                  required: 'Код обязателен для ввода',
                  validate: (value) => (value && !isChangeCode ? true : 'Код обязателен для ввода')
                })}
              />
              <div className={styles.submit}>
                <FilledButton type='submit' variety='primary'>
                  Войти
                </FilledButton>
              </div>
              <ResendCode ref={resendCodeRef} onTimerEnd={handleTimerEnd} />
            </form>
          ) : (
            <>
              <div
                style={{
                  height: '286px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gridGap: '5px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 40
                  }}
                >
                  <Skeleton.Input style={{width: 250, height: 30, marginBottom: 0}} active />
                  <Skeleton.Input style={{width: 170, height: 20, marginBottom: 0}} active />
                </div>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%', gridGap: '10px'}}>
                  <Skeleton.Button style={{width: '60', height: 60}} active />
                  <Skeleton.Button style={{width: '60', height: 60}} active />
                  <Skeleton.Button style={{width: '60', height: 60}} active />
                  <Skeleton.Button style={{width: '60', height: 60}} active />
                </div>
                <Skeleton.Button style={{width: 250, height: 40, marginTop: 40}} active />
                <Skeleton.Input style={{width: '100%', height: 10, marginBottom: 0}} active />
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
