import styles from './SettingsButton.module.scss'
import SettingsSVG from '@icon/Menu point.svg'
import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'

export default function SettingsButton() {
  return (
    <FullButton
      type={'Link'}
      href={'/planirovki-i-cen'}
      extraClass={styles.settingsButton}
      activeButton={true}
      border={false}
      borderColor={''}
      buttonFill={'bronze-500'}
      buttonText={''}
    >
      <SettingsSVG />
    </FullButton>
  )
}
