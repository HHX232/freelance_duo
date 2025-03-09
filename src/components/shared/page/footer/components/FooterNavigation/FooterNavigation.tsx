import styles from './FooterNavigation.module.scss'
import {IFooterNavigationProps} from './FooterNavigation.types'
import DesktopFooterNavigation from './DesktopFooterNavigation/DesktopFooterNavigation'
import MobileFooterNavigation from './MobileFooterNavigation/MobileFooterNavigation'

export default function FooterNavigation(props: IFooterNavigationProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.desktop}>
        <DesktopFooterNavigation linksGroups={props.linksGroups} secondaryLinks={props.secondaryLinks} />
      </div>
      <div className={styles.mobile}>
        <MobileFooterNavigation />
      </div>
    </div>
  )
}
