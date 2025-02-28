import FastForwardSVG from '@icons/fast_forward.svg'
import MonitorSVG from '@icons/monitor.svg'
import FilledButton from '@shared/filledButton/FilledButton'
import BorderedButton from '@shared/borderedButton/BorderedButton'
import styles from '../../payment-methods.module.scss'
import clsx from 'clsx'
import {FC} from 'react'

interface IIpotekaTabProps {
  setShownRequestCallBack: (flag: boolean) => void
}

export const IpotekaTab: FC<IIpotekaTabProps> = ({setShownRequestCallBack}) => {
  return (
    <>
      <section
        className={styles.poster}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 119.89%), url("/content/payment-methods/ipoteka.jpeg")`
        }}
      >
        <h2 className={styles.title}>Ипотека</h2>
        <p className={styles.subtitle}>Выгодные условия для вашего дома</p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles['icon-wrapper']}>
              <FastForwardSVG />
            </div>
            <h3 className={styles['card-title']}>Быстрое оформление и экономия средств</h3>
          </div>
          <div className={styles.card}>
            <div className={styles['icon-wrapper']}>
              <MonitorSVG />
            </div>
            <h3 className={styles['card-title']}>решение по ипотеке, не выходя из дома</h3>
          </div>
        </div>
      </section>
      <div className={styles['poster-meta']}>
        <p className={styles['poster-meta__title']}>Есть вопросы? Свяжитесь с нами!</p>
        <button className={clsx([styles['tab-button']])}>Получить консультацию</button>
      </div>

      <section className={styles.variants}>
        <div className={styles['variant-items']}>
          <div className={styles['variant-row']}>
            <div
              className={styles.cover}
              style={{backgroundImage: `url("/content/payment-methods/ipoteka_second.jpeg")`}}
            />
            <div className={styles.meta}>
              <div className={styles.meta__info}>
                <div className={styles['meta__info-inner']}>
                  <h3 className={styles['meta__title']}>
                    Одобрение ипотеки
                    <br />
                    <span>по 2 документам</span>
                    <br /> за 5 минут
                  </h3>
                  <p className={clsx(styles['meta__info-inner__caption'])} style={{color: '#747679'}}>
                    Бесплатная консультация с кредитным специалистом по номеру
                  </p>
                  <div>
                    <p className={clsx(styles['meta__info-inner__phone'])}>8 (812) 660–82–71</p>
                    <p className={clsx(styles['meta__info-inner__caption'])} style={{color: '#A0A3A8', marginTop: 8}}>
                      ежедневно с 9:00 до 18:00
                    </p>
                  </div>
                </div>
                <div className={styles['meta-buttons']}>
                  <FilledButton>Подать заявку онлайн</FilledButton>
                  <BorderedButton
                    className={styles['meta-buttons__bordered']}
                    onClick={() => setShownRequestCallBack(true)}
                  >
                    Связаться с нами
                  </BorderedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
