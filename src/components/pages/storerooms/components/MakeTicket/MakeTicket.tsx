"use client"
import styles from './MakeTicket.module.scss'
import TicketForm from '@shared/ticketForm/ticketForm'
import {useIsMinWidth} from '@utils/useIsMobile'

const MakeTicket = () => {

  const isSm = useIsMinWidth(479);

  return (
    <div className={styles['content-wrapper']}>
      <div className={styles['innerWrapper']}>
        <div className={styles['title']}>
          <div>Нужна помощь {isSm && <br/>}с выбором?</div>
        </div>
        <TicketForm formContainerClassName={styles['ticketFormWrapper']}/>
      </div>
    </div>
  )
}

export default MakeTicket
