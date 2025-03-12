import Link from 'next/link'
import styles from './HeaderMenuBottom.module.scss'
import MessageSVG from '@icon/message.svg'
import FindApartmentButton from '../../FindApartmentButton/FindApartmentButton'
import {IHeaderMenuBottomProps} from './HeaderMenuBottom.types'
import SettingsButton from './buttons/HeaderMenuBottomSettingsButton/HeaderMenuBottomSettingsButton'
import PhoneIconSVG from '../../icons/PhoneIconSVG/PhoneIconSVG'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import HeaderMenuBottomPhoneButton from './buttons/HeaderMenuBottomPhoneButton/HeaderMenuBottomPhoneButton'

export default function HeaderMenuBottom({handleFindApartment}: IHeaderMenuBottomProps) {
  return (
    <div className={styles.headerMenuBottom}>
      <div className={styles.contacts}>
        <div className={styles.contactLink}>
          <HeaderMenuBottomPhoneButton />
        </div>
        <div className={styles.contactLink}>
          <Link href={''}>
            <MessageSVG />
          </Link>
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

        <Link href={'tel:+71231234567'}>
          <FullButton
            activeButton={true}
            type='Button'
            href='tel:+71231234567'
            border={false}
            borderColor='none'
            buttonBorderRadius='6px'
            buttonFill='white'
            extraClass={styles.phoneButton}
            buttonText={'Заказать звонок'}
          />
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
        </Link>
      </div>
    </div>
  )
}
