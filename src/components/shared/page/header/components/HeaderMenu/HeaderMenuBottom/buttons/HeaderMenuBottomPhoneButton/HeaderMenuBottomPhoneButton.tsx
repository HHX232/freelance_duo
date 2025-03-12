import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import styles from './HeaderMenuBottomPhoneButton.module.scss'
import PhoneSVG from '@icon/phone.svg'

export default function HeaderMenuBottomPhoneButton() {
  return (
    <div className={styles.phoneButton}>
      <FullButton
        type={'Link'}
        href={'tel:+71231234567'}
        activeButton={true}
        border={false}
        borderColor={''}
        buttonFill={'none'}
        buttonElementColor={'white'}
        buttonText={''}
      >
        <PhoneSVG />
      </FullButton>
    </div>
  )
}
