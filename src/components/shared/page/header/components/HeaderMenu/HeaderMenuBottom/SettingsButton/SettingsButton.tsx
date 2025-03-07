import Link from 'next/link'
import styles from './SettingsButton.module.scss'
import SettingsSVG from '@icon/Menu point.svg'

export default function SettingsButton() {
  return (
    <Link href={'/planirovki-i-ceny'} className={styles.settingsButton}>
      <SettingsSVG />
    </Link>
  )
}
