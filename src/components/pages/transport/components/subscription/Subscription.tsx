'use client'
import FilledButton from '@shared/filledButton/FilledButton'
import styles from './Subscription.module.scss'

const Subscription = () => {
  return (
    <div>
      <section className={styles['contact-form-wrapper']}>
        <div className={styles['info']}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Узнайте больше</h3>
            <p className={styles.description}>
              Оставьте заявку на обратный звонок и  персональный менеджер свяжется с вами для уточнения деталей
            </p>
            <form>
              <div className={styles['input-wrapper']}>
                <span className={`${styles['input-label']} ${styles.zero_margin}`}>Имя</span>
                <input className={styles.input} placeholder='Введите имя' />
              </div>
              <div className={styles['input-wrapper']}>
                <span className={`${styles['input-label']} ${styles.zero_margin}`}>Телефон</span>
                <input className={styles.input} placeholder='+7 (___) ___-__-__' />
              </div>
              <FilledButton>Отправить</FilledButton>
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

export default Subscription