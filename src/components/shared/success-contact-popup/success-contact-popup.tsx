import {Modal} from 'antd'
import styles from './success.module.scss'
import FilledButton from '@shared/filledButton/FilledButton'
export const SuccessContactPopup = ({onClose}: {onClose: () => void}) => {
  return (
    <Modal open={true} footer={null} onCancel={onClose} centered width={718}>
      <div className={styles.success_wrapper}>
        <div className={styles.success}>
          <p>Заявка отправлена.</p>
          <p>В ближайшее время с вами свяжется персональный менеджер</p>
        </div>
        <FilledButton onClick={onClose}>Продолжить</FilledButton>
      </div>
    </Modal>
  )
}
