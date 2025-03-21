import styles from './ContactForm.module.scss'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'
import Link from 'next/link'
import InputPhoneUI from '@src/components/UI-kit/BaseControls/inputs/InputPhoneUI/InputPhoneUI'
import clsx from 'clsx'

const ContactFormPage = () => {
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
                <InputTextUI icon={<></>} theme={'white'} labelText={'Имя'} placeholder='Введите имя' />
              </div>
              <div className={clsx(styles['input-wrapper'], styles.marginTop)}>
                <InputPhoneUI icon={<></>} theme={'white'} labelText={'Телефон'} />
              </div>

              <FullButton
                type={'Button'}
                onClick={() => {}}
                activeButton={true}
                border={false}
                borderColor={''}
                buttonFill={'bronze-500'}
                buttonText={'Отправить'}
                buttonElementColor={'white'}
                buttonBorderRadius={'6px'}
                extraClass={styles['button-send']}
              />
              <p className={styles.caption}>
                Нажимая кнопку «Отправить», вы даёте согласие на{' '}
                <Link href='/consent'>обработку своих персональных данных</Link>
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
