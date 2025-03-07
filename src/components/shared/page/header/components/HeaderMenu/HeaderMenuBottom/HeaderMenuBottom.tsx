import Link from 'next/link'
import styles from './HeaderMenuBottom.module.scss'
import PhoneSVG from '@icon/phone.svg'
import MessageSVG from '@icon/message.svg'

export default function HeaderMenuBottom() {
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
    </div>
  )
}
