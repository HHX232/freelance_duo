'use client'
import styles from './index.module.scss'
import InputTextUI from '@src/components/UI-kit/BaseControls/inputs/InputTextUI/InputTextUI'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

export const NewsletterForm = () => {
  return (
    <div>
      <section className={styles['contact-form-wrapper']}>
        <div className={styles['info']}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Подпишитесь на рассылку</h3>
            <p className={styles.description}>
              Подпишитесь, чтобы получать информацию о самых свежих и актуальных акциях ЖК «Северная Долина»
            </p>
            <form>
              <div className={styles['input-wrapper']}>
                <InputTextUI theme={'white'} icon={<></>} labelText={'Email'} placeholder={'Введите email'} />
              </div>
              <FullButton
                activeButton={true}
                border={false}
                buttonText={'Подписаться'}
                borderColor={''}
                buttonFill={'bronze-500'}
                buttonElementColor={'white'}
                extraClass={styles['subscribe-button']}
              />
              <p className={styles.caption}>
                Нажимая кнопку «Подписаться», вы даёте согласие на{' '}
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
