import {FC} from 'react'
import styles from './ButtonPlus.module.scss'

interface IButtonPlus {
  extraClass?: string
  onClick?: () => void
}


const ButtonPlus: FC<IButtonPlus> = ({
  extraClass,
  onClick
}) => {
  return (
    <div className={styles['btn-plus-wrapper']} onClick={onClick}>
        <svg
            width="30"
            height="30"
            viewBox={`0 0 30 30`}
            className={`${styles['btn-plus-icon']} ${extraClass}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path d="M15 6.25V23.75" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.25 15H23.75" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
  )
}

export default ButtonPlus