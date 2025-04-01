"use client"
import styles from './MakeTicket.module.scss'
import TicketForm from '@shared/ticketForm/ticketForm'
import {useIsMinWidth} from '@utils/useIsMobile'
import { useEffect, useRef, useState } from 'react'

const MakeTicket = () => {

  const isSm = useIsMinWidth(479);
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 } // Анимация сработает, когда 30% блока появится в зоне видимости
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
    <div className={styles['content-wrapper']} ref={sectionRef}>
      <div className={styles['innerWrapper']}>
        <div className={`${styles['title']} ${isVisible ? styles.visible : ''}`}>
          <div>Нужна помощь {isSm && <br/>}с выбором?</div>
        </div>
        <TicketForm formContainerClassName={styles['ticketFormWrapper']}/>
      </div>
    </div>
  )
}

export default MakeTicket
