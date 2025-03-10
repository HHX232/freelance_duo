import styles from './ModalForm.module.scss'
import {FC} from 'react'

interface Props {
  children: React.ReactNode
  onClose: () => void
}

const ModalForm: FC<Props> = ({children, onClose}) => {

  return <div className={styles.wrapper} onClick={onClose}>{children}</div>
}

export default ModalForm
