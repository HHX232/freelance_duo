import {Modal} from 'antd'
import styles from './cr.module.scss'
export const CancellationReservationPopup = ({onClose}: {onClose: (value: boolean) => void}) => {
  return (
    <Modal open={true} footer={null} onCancel={() => onClose(false)} centered width={718}>
      <div className={styles.cr}>
        <p>
          Для отмены бронирования
          <br />
          свяжитесь с вашим менеджером
        </p>
      </div>
    </Modal>
  )
}
