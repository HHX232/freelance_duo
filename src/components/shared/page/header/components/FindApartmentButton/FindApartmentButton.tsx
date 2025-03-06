import FilledButton from '@shared/filledButton/FilledButton'
import styles from './FindApartmentButton.module.scss'
import {IFindApartmentButtonProps} from './FindApartmentButton.types'

export default function FindApartmentButton({onClick, style}: IFindApartmentButtonProps) {
  return (
    <div onClick={onClick} style={style} className={styles.findApartmentButtonContainer}>
      <FilledButton className={styles.findApartmentButton}>Подобрать квартиру</FilledButton>
    </div>
  )
}
