'use client'
import {Title} from '@src/components/UI-kit/Text-Elements/TextKit/title/title'
import styles from './payment-methods.module.scss'
import clsx from 'clsx'

import MakeTicket from './components/MakeTicket/MakeTicket'
import {useEffect, useRef, useState} from 'react'
import {ZeroPercentTab} from './components/zero-percent/zero-percent'
import {FullPaymentTab} from './components/full-payment/full-payment'
import {IpotekaTab} from './components/ipoteka/ipoteka'
import {StepsForBuy} from '@pages/payment-methods/components/full-payment/components/steps-for-buy'
import {InstallmentPlanDrawer} from '@pages/payment-methods/popup/installment-plan'
import {RequestBackCallDrawer} from '@shared/Popups/request-back-call-drawer'
import {HeadTitle} from '@src/components/UI-kit/Text-Elements/TextKit/head-title'
import useEmblaCarousel from 'embla-carousel-react'
import {useWindowWidth} from '@shared/pageDefault/header/components/HeaderMenu/hooks/useWindowWidth'
import {TabsUIItem} from '@src/components/UI-kit/BaseControls/TabsUI/TabsUI'
// import TabsUI from '@src/components/UI-kit/BaseControls/TabsUI/TabsUI'

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

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className={clsx(styles['payment-methods'], 'no-scroll')}>
      <div className={styles.header_content} ref={sectionRef}>
        <div className={styles.header_main_content}>
          <Title breadcrumbs={breadcrumbItems} style={{position: 'relative', margin: 0}} />

          <HeadTitle className={styles.head_title}>Способы покупки</HeadTitle>
        </div>
        <section className={`embla ${styles.unVisible} ${isVisible ? styles.visible : "" }`}>
          <div className={`embla__viewport`} ref={emblaRef}>
            <div className={clsx('embla__container', styles.tabs_container)}>
              {/* <TabsUI
                fill={'white'}
                tabsNames={['Рассрочка', 'Ипотека', '100% оплата', 'trade-in']}
                setActiveTabIndex={setActive}
                activeIndex={active}
                extraClass={styles.tabs_extra}
              /> */}
              {/* <button
                className={clsx([styles['tab-button']], {[styles.active]: active === 0}, 'embla__slide')}
                onClick={() => setActive(0)}
              >
                Рассрочка
              </button> */}
              <TabsUIItem
                extraClass={styles.tabs_extra_item}
                size='md'
                tabName='Рассрочка'
                index={0}
                setActiveTabIndex={setActive}
                activeIndex={active}
                fill='white'
              />
              <TabsUIItem
                extraClass={styles.tabs_extra_item}
                size='md'
                tabName='Ипотека'
                index={1}
                setActiveTabIndex={setActive}
                activeIndex={active}
                fill='white'
              />
              <TabsUIItem
                extraClass={styles.tabs_extra_item}
                size='md'
                tabName='100% оплата'
                index={2}
                setActiveTabIndex={setActive}
                activeIndex={active}
                fill='white'
              />
              <TabsUIItem
                extraClass={styles.tabs_extra_item}
                size='md'
                tabName='trade-in'
                index={3}
                setActiveTabIndex={setActive}
                activeIndex={active}
                fill='white'
              />
              {/* <button
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
              </button> */}
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
