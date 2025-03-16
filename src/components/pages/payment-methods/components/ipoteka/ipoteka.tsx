import FastForwardSVG from '@icons/fast_forward.svg'
import MonitorSVG from '@icons/monitor.svg'
import FilledButton from '@shared/filledButton/FilledButton'
import BorderedButton from '@shared/borderedButton/BorderedButton'
import ipotekaStyles from './ipoteka.module.scss'
import styles from '../../payment-methods.module.scss'
import clsx from 'clsx'
import {FC} from 'react'
import Image from 'next/image'

interface IIpotekaTabProps {
  setShownRequestCallBack: (flag: boolean) => void
}

export const IpotekaTab: FC<IIpotekaTabProps> = ({setShownRequestCallBack}) => {
  return (
    <>
      <div className={ipotekaStyles.container}>
        <section className={clsx(styles.poster, ipotekaStyles.wrapper)}>
          <Image
            className={ipotekaStyles.bg}
            alt='ipoteka'
            quality={90}
            fill
            src={'/content/payment-methods/ipoteka.jpeg'}
          />
          <div className={ipotekaStyles.overflow} />
          <h2 className={styles.posterTitle}>Ипотека</h2>
          <p className={styles.subtitle}>Выгодные условия для вашего дома</p>

          <div className={ipotekaStyles.cards_wrapper}>
            <div className={clsx(styles.cards, ipotekaStyles.cards_list)}>
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
          </div>
        </section>
        <div className={styles['poster-meta']}>
          <p className={styles['poster-meta__title']}>Есть вопросы? Свяжитесь с нами!</p>
          <button className={clsx([styles['tab-button']])}>Получить консультацию</button>
        </div>
      </div>

      <section className={clsx(styles.variants, ipotekaStyles.variants)}>
        <div className={styles['variant-items']}>
          <div className={styles['variant-row']}>
            <div
              className={clsx(ipotekaStyles.cover, styles.cover)}
              style={{backgroundImage: `url("/content/payment-methods/ipoteka_second.jpeg")`}}
            />
            <div className={clsx(ipotekaStyles.meta, styles.meta)}>
              <div className={clsx(ipotekaStyles.meta__info, styles.meta__info)}>
                <div className={clsx(styles['meta__info-inner'], ipotekaStyles.info_content)}>
                  <h3 className={clsx(styles['meta__title'], ipotekaStyles.meta_title)}>
                    Одобрение ипотеки
                    <br />
                    <span>по 2 документам</span>
                    <br /> за 5 минут
                  </h3>
                  <p className={clsx(styles['meta__info-inner__caption'])} style={{color: '#555'}}>
                    Бесплатная консультация с кредитным специалистом по номеру
                  </p>
                  <div>
                    <p className={clsx(ipotekaStyles.contacts, styles['meta__info-inner__phone'])}>8 (812) 660–82–71</p>
                    <p className={clsx(styles['meta__info-inner__caption'])} style={{color: '#A0A3A8', marginTop: 10}}>
                      ежедневно с 9:00 до 18:00
                    </p>
                  </div>
                </div>
                <div className={clsx(styles['meta-buttons'], ipotekaStyles.controls)}>
                  <FilledButton>
                    <span>Подать заявку онлайн</span>
                  </FilledButton>
                  <BorderedButton
                    className={styles['meta-buttons__bordered']}
                    onClick={() => setShownRequestCallBack(true)}
                  >
                    <span style={{color: '#555'}}>Связаться с нами</span>
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
