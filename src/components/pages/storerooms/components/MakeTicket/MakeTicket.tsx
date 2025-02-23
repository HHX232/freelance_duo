import styles from './MakeTicket.module.scss'
import TicketForm from '@shared/ticketForm/ticketForm'

const MakeTicket = () => {
  return (
      <div className={styles['content-wrapper']}>
        <div className={styles['innerWrapper']}>
          <div className={styles['title']}>
            <h3>Нужна помощь с выбором?</h3>
          </div>
          <TicketForm/>
        </div>
      </div>
  )
}

export default MakeTicket
