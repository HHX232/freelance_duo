import Link from 'next/link'
import styles from './FooterContacts.module.scss'
import VkIcon from '@icons/vk.svg'
import InstIcon from '@icons/inst.svg'
import {IFooterContactsProps} from './FooterContacts.types'
import LogoFooterDashboard from '@icons/logo-footer-dashboard.svg'
import LogoIcon from '@icons/logo-accent-footer.svg'
import PrivateOfficeButton from './buttons/PrivateOfficeButton/PrivateOfficeButton'
import FooterNavigation from '../FooterNavigation/FooterNavigation'

export default function FooterContacts(props: IFooterContactsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href={'/'}>
          <div className={styles.logo}>{props.isDashboard ? <LogoFooterDashboard /> : <LogoIcon />}</div>
        </Link>
      </div>
      <div className={styles.links}>
        <FooterNavigation
          linksGroups={props.navProps.linksGroups}
          mobileLinksGroup={props.navProps.mobileLinksGroup}
          secondaryLinks={props.navProps.secondaryLinks}
        />
      </div>
      <div className={`${styles.account} ${styles.lk_media}`}>
        {props.isLK && (
          <div className={`${styles.lk} `}>
            <PrivateOfficeButton isAuth={!!props.token} onClick={props.onClickPrivateOffice} />
          </div>
        )}
      </div>
      <div className={styles.contacts}>
        <Link href={'https://t.me/Kronfort_life'}>
          <VkIcon width={40} height={40} />
        </Link>
        {/* TODO: Поменять ссылку на инстаграм */}
        <Link href={'#inst'}>
          <InstIcon width={40} height={40} />
        </Link>
        <div className={styles.phone}>
          <a href={'tel:+78126022010'} className={styles.phone}>
            Тел: + 7 (123) 123-45-67
          </a>
        </div>
      </div>

      <ul className={styles.secondaryLinks}>
        {props.navProps.secondaryLinks.map((link, linkIndex) => (
          <li key={linkIndex}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
