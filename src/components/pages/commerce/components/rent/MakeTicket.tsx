'use client'
import styles from './MakeTicket.module.scss'
import {useIsMaxWidth, useIsMinWidth} from '@utils/useIsMobile'
import TicketForm from '@pages/commerce/components/rent/form/TicketForm'
import {FC, useEffect, useRef, useState} from 'react'

interface MakeTicketProps {
  openModal: () => void
}

const MakeTicket: FC<MakeTicketProps> = ({openModal}) => {
  const isMaxLg = useIsMaxWidth(1023)
  const isMinMD = useIsMinWidth(768)
  const isXXl = useIsMinWidth(1600)
  const isNotBr = (isMinMD && isMaxLg) || isXXl

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div className={styles.rentWrapper} ref={sectionRef}>
      <div className={styles.innerWrapper}>
        <div className={`${styles.title} ${isVisible ? styles.visible : ""}`}>
          Аренда {!isNotBr && <br />} коммерческих {!isNotBr && <br />}помещений
        </div>
        <TicketForm OpenModal={openModal} />
      </div>
    </div>
  )
}

export default MakeTicket
