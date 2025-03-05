import styles from './FooterNavigation.module.scss'
import {IFooterNavigationProps} from './FooterNavigation.types'
import MobileFooterNavigation from './MobileFooterNavigation/MobileFooterNavigation'
import DesktopFooterNavigation from './DesktopFooterNavigation/DesktopFooterNavigation'

export default function FooterNavigation(props: IFooterNavigationProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.desktop}>
        <DesktopFooterNavigation linksGroups={props.linksGroups} secondaryLinks={props.secondaryLinks} />
      </div>
      <div className={styles.mobile}>
        <MobileFooterNavigation mobileLinksGroup={props.mobileLinksGroup} />
      </div>
    </div>
  )
}
