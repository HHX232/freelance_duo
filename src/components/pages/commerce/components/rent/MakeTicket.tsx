'use client'
import styles from './MakeTicket.module.scss'
import {useIsMaxWidth, useIsMinWidth} from '@utils/useIsMobile'
import TicketForm from '@pages/commerce/components/rent/form/TicketForm'
import {FC} from 'react'

interface MakeTicketProps {
  openModal: () => void
}

const MakeTicket: FC<MakeTicketProps> = ({openModal}) => {
  const isMaxLg = useIsMaxWidth(1023)
  const isMinMD = useIsMinWidth(768)
  const isXXl = useIsMinWidth(1600)
  const isNotBr = (isMinMD && isMaxLg) || isXXl

  return (
    <div className={styles.rentWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.title}>
          Аренда {!isNotBr && <br />} коммерческих {!isNotBr && <br />}помещений
        </div>
        <TicketForm OpenModal={openModal} />
      </div>
    </div>
  )
}

export default MakeTicket
