'use client'
import {Title} from '@src/components/UI-kit/TextKit/title/title'
import styles from './payment-methods.module.scss'
import clsx from 'clsx'

import MakeTicket from './components/MakeTicket/MakeTicket'
import {useState} from 'react'
import {ZeroPercentTab} from './components/zero-percent/zero-percent'
import {FullPaymentTab} from './components/full-payment/full-payment'
import {IpotekaTab} from './components/ipoteka/ipoteka'
import {StepsForBuy} from '@pages/payment-methods/components/full-payment/components/steps-for-buy'
import {InstallmentPlanDrawer} from '@pages/payment-methods/popup/installment-plan'
import {RequestBackCallDrawer} from '@shared/request-back-call-drawer'
import {HeadTitle} from '@src/components/UI-kit/TextKit/head-title'

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

  return (
    <main className={styles['payment-methods']}>
      <Title breadcrumbs={breadcrumbItems} style={{position: 'relative', margin: 0}} />

      <HeadTitle>Способы покупки</HeadTitle>
      <div className={styles.tabs}>
        <button className={clsx([styles['tab-button']], {[styles.active]: active === 0})} onClick={() => setActive(0)}>
          Рассрочка
        </button>
        <button className={clsx([styles['tab-button']], {[styles.active]: active === 1})} onClick={() => setActive(1)}>
          Ипотека
        </button>
        <button className={clsx([styles['tab-button']], {[styles.active]: active === 2})} onClick={() => setActive(2)}>
          100% оплата
        </button>
        <button className={clsx([styles['tab-button']], {[styles.active]: active === 3})} onClick={() => setActive(3)}>
          trade-in
        </button>
      </div>

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
      <MakeTicket />

      <InstallmentPlanDrawer shown={shownInstallmentPlan} onClose={handleInstallmentPlanDrawerClose} />
      <RequestBackCallDrawer shown={shownRequestCallBack} onClose={handleRequestCallBackDrawerClose} />
    </main>
  )
}

export default PaymentMethodsPage
