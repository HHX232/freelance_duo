import styles from './ContactForm.module.scss'
import {useState} from 'react'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'
import LinkUI from '@src/components/UI-kit/Text-Elements/Typography/Link/LinkUI'

const ContactFormPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div>
      <section className={styles['contact-form-wrapper']}>
        <div className={styles['info']}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Узнайте больше</h3>
            <p className={styles.description}>
              Оставьте заявку на обратный звонок и персональный менеджер свяжется с вами, для уточнения деталей
            </p>
            <form>
              <div className={styles['input-wrapper']}>
                <InputTextUI theme={'white'} labelText={'Имя'} placeholder='Введите имя' />
              </div>
              <div className={styles['input-wrapper']}>
                <InputTextUI
                  extraClass={styles.marginTop}
                  theme={'white'}
                  labelText={'Телефон'}
                  placeholder='+7 (___) ___-__-__'
                  onChange={(e) => {
                    const formattedValue = formatPhoneNumber(e.target.value)
                    setPhoneNumber(formattedValue)
                  }}
                  maxLength={18}
                  pattern={'/^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$/'}
                  value={phoneNumber}
                />
              </div>
              <FullButton
                type={'Button'}
                onClick={() => {}}
                activeButton={true}
                border={false}
                borderColor={''}
                buttonFill={'bronze-500'}
                buttonText={
                  <LinkUI size={'md'} weight={'regular'} extraStyle={{color: '#fff', textTransform: 'uppercase'}}>
                    Отправить
                  </LinkUI>
                }
                buttonElementColor={'white'}
                buttonBorderRadius={'6px'}
                extraClass={styles['button-send']}
              />
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

export default ContactFormPage
