import FilledButton from '@shared/filledButton/FilledButton'
import styles from './index.module.scss'

export const NewsletterForm = () => {
  return (
    <div>
      <section className={styles['newsletter-form-wrapper']}>
        <div className={styles['info']}>
          <h3 className={styles.title}>Подпишитесь на рассылку</h3>
          <p className={styles.description}>
            Подпишитесь, чтобы получать информацию о самых свежих и актуальных акциях ЖК «Северная Долина»
          </p>
          <form>
            <div className={styles['input-wrapper']}>
              <span className={styles['input-label']}>Email</span>
              <input className={styles.input} placeholder='Введите email' />
            </div>
            <FilledButton>Отправить</FilledButton>
            <p className={styles.caption}>
              Нажимая кнопку «Отправить», вы даёте согласие на{' '}
              <a href='/consent'>обработку своих персональных данных</a>
            </p>
          </form>
        </div>
        <div className={styles.bg} />
      </section>
    </div>
  )
}
