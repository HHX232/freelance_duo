import styles from './PrivateOfficeButton.module.scss'
import Link from 'next/link'
import {IPrivateOfficeButton} from './PrivateOfficeButton.types'

export default function PrivateOfficeButton(props: IPrivateOfficeButton) {
  if (props.isAuth) {
    return (
      <Link href={'/lk'}>
        <span>Личный кабинет</span>
      </Link>
    )
  }

  return (
    <button className={styles.button} type='button' style={{padding: '0', textAlign: 'left'}} onClick={props.onClick}>
      <span>Личный кабинет</span>
    </button>
  )
}
