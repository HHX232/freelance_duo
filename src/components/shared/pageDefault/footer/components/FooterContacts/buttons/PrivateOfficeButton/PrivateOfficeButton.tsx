import styles from './PrivateOfficeButton.module.scss'
import {IPrivateOfficeButton} from './PrivateOfficeButton.types'
import LinkUI from '@src/components/UI-kit/Text-Elements/Typography/Link/LinkUI'

export default function PrivateOfficeButton(props: IPrivateOfficeButton) {
  if (props.isAuth) {
    return (
      <LinkUI href={'/lk'} size={'sm'} extraStyle={{color: '#fff'}} weight={'medium'}>
        Личный кабинет
      </LinkUI>
    )
  }

  return (
    <button className={styles.button} type='button' style={{padding: '0', textAlign: 'left'}} onClick={props.onClick}>
      <LinkUI size={'sm'} extraStyle={{color: '#fff'}} weight={'medium'}>
        Личный кабинет
      </LinkUI>
    </button>
  )
}
