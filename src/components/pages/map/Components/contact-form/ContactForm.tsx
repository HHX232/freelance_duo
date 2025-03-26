import styles from './ContactForm.module.scss'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'
import Link from 'next/link'
import InputPhoneUI from '@src/components/UI-kit/BaseControls/inputs/InputPhoneUI/InputPhoneUI'
import clsx from 'clsx'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'

const ContactFormPage = () => {
  return (
    <div>
      <section className={styles['contact-form-wrapper']}>
        <div className={styles['info']}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Узнайте больше</h3>
            <ParagraphUI extraClass={styles.extra_subtitle} size={'md'} weight={'light'}>
              Оставьте заявку на обратный звонок и персональный менеджер свяжется с вами, для уточнения деталей
            </ParagraphUI>
            {/* <p className={styles.description}>
            </p> */}
            <form className={styles.form_width}>
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
                borderColor={'none'}
                buttonFill={'bronze-500'}
                buttonText={'Отправить'}
                buttonElementColor={'white'}
                buttonBorderRadius={'6px'}
                extraClass={styles['button-send']}
              />
              {/* <ParagraphUI extraClass={styles.extra_caption} size={'sm'} weight='light'>
                Нажимая кнопку «Отправить», вы даёте согласие на{' '}
                <Link href='/consent'>обработку своих персональных данных</Link>
              </ParagraphUI> */}
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
