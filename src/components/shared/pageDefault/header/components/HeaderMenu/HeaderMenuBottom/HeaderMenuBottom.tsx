'use client'
import styles from './HeaderMenuBottom.module.scss'
import FindApartmentButton from '../../FindApartmentButton/FindApartmentButton'
import {IHeaderMenuBottomProps} from './HeaderMenuBottom.types'
import SettingsButton from './buttons/HeaderMenuBottomSettingsButton/HeaderMenuBottomSettingsButton'
import PhoneIconSVG from '../../icons/PhoneIconSVG/PhoneIconSVG'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import HeaderMenuBottomPhoneButton from './buttons/HeaderMenuBottomPhoneButton/HeaderMenuBottomPhoneButton'
import HeaderMenuBottomMessageButton from './buttons/HeaderMenuBottomMessageButton/HeaderMenuBottomMessageButton'

export default function HeaderMenuBottom({handleFindApartment}: IHeaderMenuBottomProps) {
  return (
    <div className={styles.headerMenuBottom}>
      <div className={styles.contacts}>
        <div className={styles.contactLink}>
          <HeaderMenuBottomPhoneButton />
        </div>
        <div className={styles.contactLink}>
          <HeaderMenuBottomMessageButton />
        </div>
      </div>
      <div className={styles.settingButton}>
        <SettingsButton />
      </div>

      <div className={styles.buttons}>
        <div className={styles.findApartmentButton}>
          <FindApartmentButton onClick={handleFindApartment} />
        </div>
        {/* TODO: replace link with FullButton type Link */}

        <span>
          <FullButton
            activeButton={false}
            type='Button'
            href='tel:+71231234567'
            border={false}
            borderColor='none'
            buttonBorderRadius='6px'
            buttonFill='white'
            extraClass={styles.phoneButton}
            buttonText={'Заказать звонок'}
            alternativeBorderOnActive
            alternativeBorderWidth='3px'
            alternativeBorderColor='blue'
          ></FullButton>
          <FullButton
            borderColor='none'
            activeButton={true}
            type='Button'
            href='tel:+71231234567'
            buttonFill='white'
            buttonText={''}
            border={false}
            buttonBorderRadius='6px'
            extraClass={styles.phoneButtonWithIcon}
          >
            <PhoneIconSVG />
          </FullButton>
        </span>
      </div>
    </div>
  )
}
