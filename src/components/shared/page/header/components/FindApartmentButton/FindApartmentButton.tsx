'use client'
import styles from './FindApartmentButton.module.scss'
import {IFindApartmentButtonProps} from './FindApartmentButton.types'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'

export default function FindApartmentButton({onClick, style}: IFindApartmentButtonProps) {
  return (
    <div style={style} className={styles.findApartmentButtonContainer}>
      <FullButton
        activeButton={true}
        extraClass={styles.findApartmentButton}
        type='Button'
        borderColor='none'
        onClick={onClick}
        buttonText='Подобрать квартиру'
        border={false}
        buttonFill='bronze-500'
        buttonElementColor='white'
      />
    </div>
  )
}
