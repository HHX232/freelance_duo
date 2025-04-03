"use client"

import TrendingUpSVG from '@icons/trending_up.svg'
import BankCardSVG from '@icons/bank_card.svg'
import styles from '../../payment-methods.module.scss'
import clsx from 'clsx'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import {useEffect, useRef, useState} from 'react'

export const FullPaymentTab = () => {

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
    <div className={`${styles.container} ${styles.unVisible} ${ isVisible ? styles?.visible : ""}`} ref={sectionRef}>
      <section
        style={{
          backgroundImage:
            'linear-gradient(155deg, rgba(0, 0, 0, 0.40) 23.02%, rgba(0, 0, 0, 0.00) 104.22%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%),  url("/content/payment-methods/full-payment-poster.webp") lightgray -186.45px 0px / 257.781% 100% no-repeat'
        }}
        className={clsx(styles.poster, styles.poster_full_payment)}
      >
        <h2 className={styles.posterTitle}>100% оплата</h2>
        <p className={styles.subtitle}>Практичный способ приобрести жилье без дополнительных переплат</p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles['icon-wrapper']}>
              <TrendingUpSVG />
            </div>
            <h3 className={styles['card-title']}>Оптимальное решение</h3>
          </div>

          <div className={styles.card}>
            <div className={styles['icon-wrapper']}>
              <BankCardSVG />
            </div>
            <h3 className={styles['card-title']}>Без переплат</h3>
          </div>
        </div>
      </section>

      <div className={styles['poster-meta']}>
        <p className={styles['poster-meta__title']}>Есть вопросы? Свяжитесь с нами!</p>
        <FullButton
          extraClass={styles.button_extra_2}
          activeButton={false}
          buttonBorderRadius='6px'
          buttonFill='white'
          border={false}
          borderColor='none'
          buttonText={'Получить консультацию'}
        />
      </div>
    </div>
  )
}
