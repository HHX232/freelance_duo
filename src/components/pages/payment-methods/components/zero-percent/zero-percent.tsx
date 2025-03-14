import PieChartSVG from '@icons/pie_chart.svg'
import ClockSVG from '@icons/clock.svg'
import CalendarSVG from '@icons/calendar.svg'
import PercentSVG from '@icons/percent.svg'
import FilledButton from '@shared/filledButton/FilledButton'
import BorderedButton from '@shared/borderedButton/BorderedButton'
import styles from '../../payment-methods.module.scss'
import clsx from 'clsx'
import {FC} from 'react'

interface IZeroPercentTabProps {
  setShownInstallmentPlan: (flag: boolean) => void
  setShownRequestCallBack: (flag: boolean) => void
}

export const ZeroPercentTab: FC<IZeroPercentTabProps> = ({setShownInstallmentPlan, setShownRequestCallBack}) => {
  const handleInstallmentPlan = () => setShownInstallmentPlan(true)
  const handleRequestCallBack = () => setShownRequestCallBack(true)

  return (
    <>
      <div className={styles.poster_container}>
        <section className={styles.poster}>
          <h2 className={styles.posterTitle}>Рассрочка</h2>
          <p className={styles.subtitle}>Удобство и выгода в каждой покупке</p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles['icon-wrapper']}>
                <PieChartSVG />
              </div>
              <h3 className={styles['card-title']}>Без переплат</h3>
            </div>
            <div className={styles.card}>
              <div className={styles['icon-wrapper']}>
                <ClockSVG />
              </div>
              <h3 className={styles['card-title']}>Быстрое одобрение</h3>
            </div>
          </div>
        </section>
        <div className={styles['poster-meta']}>
          <p className={styles['poster-meta__title']}>Есть вопросы? Свяжитесь с нами!</p>
          <button className={clsx([styles['poster-meta__question_button']], styles['tab-button'])}>
            Получить консультацию
          </button>
        </div>
      </div>

      <section className={styles.variants}>
        <h2 className={styles.title}>Варианты рассрочки</h2>
        <div className={styles['variant-items']}>
          <div className={styles['variant-row']}>
            <div className={styles.cover} style={{backgroundImage: `url("/content/payment-methods/1.jpeg")`}} />
            <div className={styles.meta}>
              <div className={styles.head}>
                <div className={styles.head_icon}>
                  <div className={styles['icon-wrapper']}>
                    <PercentSVG />
                  </div>
                </div>
                <p className={styles.meta__pages}>
                  <span>1</span>/3
                </p>
              </div>
              <div className={styles.meta__info}>
                <h3 className={styles['meta__title']}>Рассрочка до ввода в эксплуатацию</h3>
                <div className={styles['meta__description-wrapper']}>
                  <div className={styles.icon_box}>
                    <div className={styles['icon-wrapper']}>
                      <PercentSVG />
                    </div>
                  </div>
                  <p className={styles['meta__description']}>Первый взнос не менее 20% от базовой стоимости</p>
                </div>
                <div className={styles['meta-buttons']}>
                  <FilledButton onClick={handleInstallmentPlan}>Узнать подробнее</FilledButton>
                  <BorderedButton className={styles['meta-buttons__bordered']} onClick={handleRequestCallBack}>
                    Связаться с нами
                  </BorderedButton>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['variant-row']}>
            <div className={styles.cover} style={{backgroundImage: `url("/content/payment-methods/2.jpeg")`}} />

            <div className={styles.meta}>
              <div className={styles.head}>
                <div className={styles.head_icon}>
                  <div className={styles['icon-wrapper']}>
                    <PercentSVG />
                  </div>
                </div>
                <p className={styles.meta__pages}>
                  <span>2</span>/3
                </p>
              </div>

              <div className={styles.meta__info}>
                <h3 className={styles['meta__title']}>Рассрочка без промежуточных платежей</h3>
                <div className={styles['meta__description-wrapper']}>
                  <div className={styles.icon_box}>
                    <div className={styles['icon-wrapper']}>
                      <CalendarSVG />
                    </div>
                  </div>
                  <p className={styles['meta__description']}>
                    Не менее 10% оплачивается на аккредитив в течение 5 рабочих дней при рассрочке на 3 и 6 месяцев
                  </p>
                </div>
                <div className={styles['meta-buttons']}>
                  <FilledButton onClick={handleInstallmentPlan}>Узнать подробнее</FilledButton>
                  <BorderedButton className={styles['meta-buttons__bordered']} onClick={handleRequestCallBack}>
                    Связаться с нами
                  </BorderedButton>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['variant-row']}>
            <div className={styles.cover} style={{backgroundImage: `url("/content/payment-methods/3.jpeg")`}} />
            <div className={styles.meta}>
              <div className={styles.head}>
                <div className={styles.head_icon}>
                  <div className={styles['icon-wrapper']}>
                    <PercentSVG />
                  </div>
                </div>
                <p className={styles.meta__pages}>
                  <span>3</span>/3
                </p>
              </div>
              <div className={styles.meta__info}>
                <h3 className={styles['meta__title']}>Рассрочка 20-12</h3>
                <div className={styles['meta__description-wrapper']}>
                  <div className={styles.icon_box}>
                    <div className={styles['icon-wrapper']}>
                      <PieChartSVG />
                    </div>
                  </div>

                  <p className={styles['meta__description']}>
                    Первоначальный взнос не менее 20% от базовой стоимости квартиры, оплачивается при заключении
                    договора (оплата на аккредитив в течение 5 рабочих дней).
                  </p>
                </div>
                <div className={styles['meta-buttons']}>
                  <FilledButton onClick={handleInstallmentPlan}>Узнать подробнее</FilledButton>
                  <BorderedButton className={styles['meta-buttons__bordered']} onClick={handleRequestCallBack}>
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
