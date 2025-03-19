'use client'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import styles from './payment-methods.module.scss'
import clsx from 'clsx'

import MakeTicket from './components/MakeTicket/MakeTicket'
import {useState} from 'react'
import {ZeroPercentTab} from './components/zero-percent/zero-percent'
import {FullPaymentTab} from './components/full-payment/full-payment'
import {IpotekaTab} from './components/ipoteka/ipoteka'
import {StepsForBuy} from '@pages/payment-methods/components/full-payment/components/steps-for-buy'
import {InstallmentPlanDrawer} from '@pages/payment-methods/popup/installment-plan'
import {RequestBackCallDrawer} from '@shared/Popups/request-back-call-drawer'
import {HeadTitle} from '@src/components/UI-kit/Text-Elements/TextKit/head-title'
import useEmblaCarousel from 'embla-carousel-react'
import {useWindowWidth} from '@shared/pageDefault/header/components/HeaderMenu/hooks/useWindowWidth'

const PaymentMethodsPage = () => {
  const [active, setActive] = useState(0)
  const breadcrumbItems = [
    {title: 'Главная', href: '/'},
    {
      title: 'Способы покупки',
      href: '/payment-methods'
    }
  ]

  const [shownInstallmentPlan, setShownInstallmentPlan] = useState(false)
  const handleInstallmentPlanDrawerClose = () => {
    setShownInstallmentPlan(false)
  }

  const [shownRequestCallBack, setShownRequestCallBack] = useState(false)
  const handleRequestCallBackDrawerClose = () => {
    setShownRequestCallBack(false)
  }
  const width = useWindowWidth()
  const [emblaRef] = useEmblaCarousel({dragFree: true, active: !!width && width < 768})

  return (
    <div className={clsx(styles['payment-methods'])}>
      <div className={styles.header_content}>
        <div className={styles.header_main_content}>
          <Title breadcrumbs={breadcrumbItems} style={{position: 'relative', margin: 0}} />

          <HeadTitle className={styles.head_title}>Способы покупки</HeadTitle>
        </div>
        <section className={clsx('embla', styles.tabs_section)}>
          <div className='embla__viewport' ref={emblaRef}>
            <div className={clsx('embla__container', styles.tabs_container)}>
              <button
                className={clsx([styles['tab-button']], {[styles.active]: active === 0}, 'embla__slide')}
                onClick={() => setActive(0)}
              >
                Рассрочка
              </button>
              <button
                className={clsx([styles['tab-button']], {[styles.active]: active === 1}, 'embla__slide')}
                onClick={() => setActive(1)}
              >
                Ипотека
              </button>
              <button
                className={clsx([styles['tab-button']], {[styles.active]: active === 2}, 'embla__slide')}
                onClick={() => setActive(2)}
              >
                100% оплата
              </button>
              <button
                className={clsx([styles['tab-button']], {[styles.active]: active === 3}, 'embla__slide')}
                onClick={() => setActive(3)}
              >
                trade-in
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.tabs}></div>

      {active === 0 && (
        <ZeroPercentTab
          setShownInstallmentPlan={setShownInstallmentPlan}
          setShownRequestCallBack={setShownRequestCallBack}
        />
      )}
      {active === 1 && <IpotekaTab setShownRequestCallBack={setShownRequestCallBack} />}
      {active === 2 && <FullPaymentTab />}
      {active === 2 && <StepsForBuy />}
      {active === 3 && <StepsForBuy />}
      <div className={styles.make_ticket_wrapper}>
        <MakeTicket style={{margin: 0}} />
      </div>

      <InstallmentPlanDrawer shown={shownInstallmentPlan} onClose={handleInstallmentPlanDrawerClose} />
      <RequestBackCallDrawer shown={shownRequestCallBack} onClose={handleRequestCallBackDrawerClose} />
    </div>
  )
}

export default PaymentMethodsPage
