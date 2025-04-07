import Link from 'next/link'
import styles from './FooterContacts.module.scss'
import VkIcon from '@icons/vk.svg'
import InstIcon from '@icons/inst.svg'
import {IFooterContactsProps} from './FooterContacts.types'
import LogoFooterDashboard from '@icons/logo-footer-dashboard.svg'
import LogoIcon from '@icons/logo-accent-footer.svg'
import PrivateOfficeButton from './buttons/PrivateOfficeButton/PrivateOfficeButton'
import FooterNavigation from '../FooterNavigation/FooterNavigation'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import LinkUI from '@src/components/UI-kit/Text-Elements/Typography/Link/LinkUI'
import TelLink from '@src/components/UI-kit/Navigation/TelLink/TelLink'

export default function FooterContacts(props: IFooterContactsProps) {
  return (
    <div itemScope itemType='http://schema.org/WPFooter' className={styles.container}>
      <div itemScope itemType='http://schema.org/Organization' className={styles.logo}>
        <Link itemProp='url' href={'/'}>
          <div itemProp='logo' className={styles.logo}>
            {props.isDashboard ? <LogoFooterDashboard /> : <LogoIcon />}
          </div>
        </Link>
      </div>
      <div itemScope itemType='http://schema.org/SiteNavigationElement' className={styles.links}>
        <FooterNavigation linksGroups={props.navProps.linksGroups} secondaryLinks={props.navProps.secondaryLinks} />
      </div>
      <div className={`${styles.account} ${styles.lk_media}`}>
        {props.isLK && (
          <div className={`${styles.lk} `}>
            <PrivateOfficeButton isAuth={!!props.token} onClick={props.onClickPrivateOffice} />
          </div>
        )}
      </div>
      <div itemScope itemType='http://schema.org/ContactPoint' className={styles.contacts}>
        {/* TODO: Поменять ссылки */}

        <FullButton
          extraClass={styles.contactsButton}
          type={'Link'}
          href={'/#vkLink'}
          activeButton={true}
          border={false}
          borderColor={'none'}
          buttonFill={'none'}
          buttonElementColor={'black'}
          buttonText={''}
        >
          <VkIcon width={40} height={40} />
        </FullButton>

        <FullButton
          extraClass={styles.contactsButton}
          type={'Link'}
          href={'/instLink'}
          activeButton={true}
          border={false}
          borderColor={'none'}
          buttonFill={'none'}
          buttonElementColor={'black'}
          buttonText={''}
        >
          <InstIcon width={40} height={40} />
        </FullButton>

        <div itemProp='telephone' className={styles.phone}>
          <LinkUI size={'sm'} weight={'medium'} extraStyle={{color: '#fff'}}>
            Тел: <TelLink typeDecorNumber={'classic'} linkSize={'sm'} extraStyle={{fontWeight: '600', color: '#fff'}} />
          </LinkUI>
        </div>
      </div>

      <ul className={styles.secondaryLinks}>
        {props.navProps.secondaryLinks.map((link, linkIndex) => (
          <li itemScope itemType='http://schema.org/SiteNavigationElement' key={linkIndex}>
            {link.href ? (
              <LinkUI itemProp='url' href={link.href} size={'sm'} weight={'regular'}>
                {link.name}
              </LinkUI>
            ) : (
              <LinkUI itemProp='url' size={'sm'} weight={'regular'}>
                {link.name}
              </LinkUI>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
