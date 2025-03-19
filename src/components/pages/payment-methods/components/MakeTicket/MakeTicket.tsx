import {CSSProperties, FC} from 'react'
import styles from './MakeTicket.module.scss'
import TicketForm from '@shared/ticketForm/ticketForm'
import {HeadTitle} from '@src/components/UI-kit/Text-Elements/TextKit/head-title'

const MakeTicket: FC<{style?: CSSProperties}> = ({style}) => {
  return (
    <div style={style} className={styles['innerWrapper']}>
      <div className={styles['title']}>
        <HeadTitle style={{margin: 0}}>
          Нужна помощь <br /> с выбором?
        </HeadTitle>
      </div>
      <div className={styles.form}>
        <TicketForm />
      </div>
    </div>
  )
}

export default MakeTicket
