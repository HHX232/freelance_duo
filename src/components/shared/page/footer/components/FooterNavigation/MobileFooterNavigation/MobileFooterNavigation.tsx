import {MobileHeaderMenu} from '@shared/page/header/components/HeaderMenu/MobileHeaderMenu/MobileHeaderMenu'
import styles from './MobileFooterNavigation.module.scss'

export default function MobileFooterNavigation() {
  return (
    <div className={styles.nav}>
      <MobileHeaderMenu extraClass={styles.mobileHeaderMenu} onClose={() => {}} />
    </div>
  )
}
