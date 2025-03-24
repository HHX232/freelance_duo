'use client'
import styles from './TicketForm.module.scss'
import {FC, useState} from 'react'
import ProgressBar from '@src/components/UI-kit/Indicators/ProgressBar/progressBar'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import ToRight from '@icons/toRight_2.svg'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
// import {InputField} from '@src/components/UI-kit/BaseControls/inputs/input-field/input-field'
import LinkUI from '@src/components/UI-kit/Text-Elements/Typography/Link/LinkUI'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'
import InputPhoneUI from '@src/components/UI-kit/BaseControls/inputs/InputPhoneUI/InputPhoneUI'

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
              <InputTextUI
                placeholder='Введите бренд компании'
                icon={<></>}
                labelText='Бренд'
                theme='dark'
                extraStyle={{lineHeight: '18px'}}
              />
              {/* <InputField
                title={'Бренд'}
                type={'text'}
                placeholder={'Введите бренд компании'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              /> */}
              <InputTextUI
                placeholder='Введите направление компании'
                icon={<></>}
                labelText='Профиль'
                theme='dark'
                extraStyle={{lineHeight: '18px'}}
              />

              {/* <InputField
                title={'Профиль'}
                type={'text'}
                placeholder={'Введите направление бизнеса'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              /> */}

              <InputTextUI
                placeholder='Введите кол-во магазинов'
                icon={<></>}
                labelText='Существующие магазины'
                theme='dark'
                extraStyle={{lineHeight: '18px'}}
              />

              {/* <InputField
                title={'Существующие магазины'}
                type={'text'}
                placeholder={'Введите кол-во магазинов'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              /> */}

              <InputTextUI
                placeholder='Введите кол-во метров'
                icon={<></>}
                labelText='Необходимый метраж помещения, м2'
                theme='dark'
                extraStyle={{lineHeight: '18px'}}
              />
              {/* <InputField
                title={'Необходимый метраж помещения, м2'}
                type={'text'}
                placeholder={'Введите кол-во метров'}
                variety={'secondary'}
                inputStyles={styles.inputStyles}
                stylesLabel={styles.labelStyles}
                styleContainer={{gridGap: '4px'}}
              /> */}
            </div>
            <FullButton
              type={'Button'}
              buttonText={'ДАЛЕЕ'}
              onClick={() => {
                setStep(2)
              }}
              activeButton={true}
              border={false}
              borderColor={''}
              extraClass={styles.button}
              buttonFill='bronze-500'
              buttonElementColor='white'
              buttonBorderRadius={'6px'}
            >
              <ToRight />
            </FullButton>
          </div>
        ) : (
          <div className={styles.formWrapper}>
            <div className={styles.inputsWrapper}>
              {/* <InputField
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
              /> */}
              <InputTextUI
                extraStyle={{lineHeight: '18px'}}
                placeholder='Введите имя'
                icon={<></>}
                labelText='Имя'
                theme='dark'
                maxLength={18}
                onlyType='onlyText'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
              {/* <InputField
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
              /> */}
              <InputPhoneUI
                extraStyle={{lineHeight: '18px'}}
                placeholder={'+7 (___) ___-__-__'}
                icon={<></>}
                labelText='Телефон'
                theme='dark'
                maxLength={18}
                onlyType='onlyNumbers'
                value={phoneNumber}
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value)
                  setPhoneNumber(formattedValue)
                }}
              />
              <InputTextUI
                extraStyle={{lineHeight: '18px'}}
                placeholder={'Введите электронную почту'}
                icon={<></>}
                labelText='E-mail'
                theme='dark'
                maxLength={18}
                onChange={(e) => {
                  setMail(e.target.value)
                }}
                value={mail}
              />
            </div>
            <FullButton
              type={'Button'}
              buttonText={'ОТПРАВИТЬ'}
              onClick={() => {
                setStep(1)
                OpenModal()
              }}
              activeButton={true}
              border={false}
              borderColor={''}
              extraClass={styles.button}
              buttonFill='bronze-500'
              buttonElementColor='white'
              buttonBorderRadius={'6px'}
            />
            <div className={styles.subtext}>
              Нажимая кнопку «Отправить», вы даёте согласие на
              <LinkUI
                size={'xs'}
                weight={'regular'}
                extraStyle={{color: 'rgb(116, 118, 121)'}}
                href={'/consent'}
                target='_blank'
              >
                <span> обработку своих персональных данных</span>
              </LinkUI>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketForm
