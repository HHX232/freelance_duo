import styles from './MakeTicket.module.scss'
import TicketForm from '@shared/ticketForm/ticketForm'

const MakeTicket = () => {
  return (
    <div className={styles['content-wrapper']}>
      <div className={styles['innerWrapper']}>
        <div className={styles['title']}>
          <div>Нужна помощь с выбором?</div>
        </div>
        <TicketForm description={"Оставьте заявку и мы поможем вам с выбором парковки"}/>
      </div>
    </div>
  )
}

export default MakeTicket
