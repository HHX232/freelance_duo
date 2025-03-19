import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import styles from './HeaderMenuBottomSettingsButton.module.scss'
import SettingsSVG from '@icon/Menu point.svg'

export default function HeaderMenuBottomSettingsButton() {
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
