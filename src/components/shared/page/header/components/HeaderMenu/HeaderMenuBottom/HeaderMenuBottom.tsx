import Link from 'next/link'
import styles from './HeaderMenuBottom.module.scss'
import PhoneSVG from '@icon/phone.svg'
import MessageSVG from '@icon/message.svg'
import FindApartmentButton from '../../FindApartmentButton/FindApartmentButton'
import {IHeaderMenuBottomProps} from './HeaderMenuBottom.types'
import SettingsButton from './SettingsButton/SettingsButton'
import FilledButton from '@shared/filledButton/FilledButton'
import PhoneIconSVG from '../../icons/PhoneIconSVG/PhoneIconSVG'

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
        <FilledButton onClick={onCallRequest} className={styles.phoneButton}>
          Заказать звонок
        </FilledButton>
        <FilledButton onClick={onCallRequest} className={styles.phoneButtonWithIcon}>
          <PhoneIconSVG />
        </FilledButton>
      </div>
    </div>
  )
}
