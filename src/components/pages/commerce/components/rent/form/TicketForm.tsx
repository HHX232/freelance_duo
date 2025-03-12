'use client'
import styles from './TicketForm.module.scss'
import {FC, useState} from 'react'
import ProgressBar from '@src/components/UI-kit/ProgressBar/progressBar'
import {InputField} from '@src/components/UI-kit/inputs/input-field/input-field'
import FilledButton from '@shared/filledButton/FilledButton'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import ToRight from '@icons/toRight_2.svg'
import Link from 'next/link'

interface TicketFormProps {
  OpenModal: () => void
}

const TicketForm: FC<TicketFormProps> = ({OpenModal}) => {
  const [step, setStep] = useState(1)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Оставьте заявку и мы поможем вам с выбором помещения</div>
      <div className={styles.innerWrapper}>
        <div className={styles.steps}>
          <div className={styles.stepsTitles}>
            <div>{step === 1 ? 'Данные о бизнесе' : 'Данные для связи'}</div>
            <div>Шаг {step}/2</div>
          </div>
          <div className={styles.progressWrapper}>
            <ProgressBar progress={step === 1 ? '50%' : '100%'} />
          </div>
        </div>
        {step === 1 ? (
          <div className={styles.formWrapper}>
            <div className={styles.inputsWrapper}>
              <InputField
                title={'Бренд'}
                type={'text'}
                placeholder={'Введите бренд компании'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              />
              <InputField
                title={'Профиль'}
                type={'text'}
                placeholder={'Введите направление бизнеса'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              />
              <InputField
                title={'Существующие магазины'}
                type={'text'}
                placeholder={'Введите кол-во магазинов'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              />
              <InputField
                title={'Необходимый метраж помещения, м2'}
                type={'text'}
                placeholder={'Введите кол-во метров'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              />
            </div>
            <FilledButton className={styles.button} onClick={() => setStep(2)}>
              Далее <ToRight />
            </FilledButton>
          </div>
        ) : (
          <div className={styles.formWrapper}>
            <div className={styles.inputsWrapper}>
              <InputField
                title={'Имя'}
                type={'text'}
                placeholder={'Введите имя'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                maxLength={18}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                value={name}
                styleContainer={{gridGap: '4px'}}
              />
              <InputField
                title={'Телефон'}
                type={'text'}
                placeholder={'+7 (___) ___-__-__'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                maxLength={18}
                pattern={'/^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$/'}
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value)
                  setPhoneNumber(formattedValue)
                }}
                value={phoneNumber}
                styleContainer={{gridGap: '4px'}}
              />
              <InputField
                title={'E-mail'}
                type={'text'}
                placeholder={'Введите электронную почту'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                maxLength={18}
                onChange={(e) => {
                  setMail(e.target.value)
                }}
                value={mail}
                styleContainer={{gridGap: '4px'}}
              />
            </div>
            <FilledButton
              className={styles.button}
              onClick={() => {
                setStep(1)
                OpenModal();
              }}
            >
              отправить
            </FilledButton>
            <div className={styles.subtext}>
              Нажимая кнопку «Отправить», вы даёте согласие на
              <Link href={'/consent'} target='_blank'>
                <span> обработку своих персональных данных</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketForm
