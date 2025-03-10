import Link from 'next/link'
import styles from './HeaderMenuBottom.module.scss'
import PhoneSVG from '@icon/phone.svg'
import MessageSVG from '@icon/message.svg'
import FindApartmentButton from '../../FindApartmentButton/FindApartmentButton'
import {IHeaderMenuBottomProps} from './HeaderMenuBottom.types'
import SettingsButton from './SettingsButton/SettingsButton'
import PhoneIconSVG from '../../icons/PhoneIconSVG/PhoneIconSVG'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'

export default function HeaderMenuBottom({handleFindApartment}: IHeaderMenuBottomProps) {
  const onCallRequest = () => {}

  return (
    <div className={styles.headerMenuBottom}>
      <div className={styles.contacts}>
        <div className={styles.contactLink}>
          <Link href={'tel:+71231234567'}>
            <PhoneSVG />
          </Link>
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
        <FullButton
          type='Link'
          border={false}
          buttonFill='white'
          onClick={onCallRequest}
          extraClass={styles.phoneButton}
          buttonText={' Заказать звонок'}
        />
        <FullButton
          buttonFill='white'
          buttonText={''}
          border={false}
          onClick={onCallRequest}
          extraClass={styles.phoneButtonWithIcon}
        >
          <PhoneIconSVG />
        </FullButton>
      </div>
    </div>
  )
}
