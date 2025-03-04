import Accordion from '@shared/accordion/Accordion'
import styles from './MobileFooterNavigation.module.scss'
import {IMobileFooterNavigationProps} from './MobileFooterNavigation.types'
import {IAccordionItem} from '@shared/accordion/accordion.types'
import {IFooterNavigationLink, IMobileFooterNavigationLinksGroup} from '../FooterNavigation.types'
import Link from 'next/link'

export default function MobileFooterNavigation(props: IMobileFooterNavigationProps) {
  const links: IAccordionItem[] = props.mobileLinksGroup.map(
    (group: IMobileFooterNavigationLinksGroup, groupIndex: number) => {
      return {
        header: group.name,
        font: 'romul',
        color: 'accent',
        size: 'accentMedium',
        children: (
          <ul key={groupIndex}>
            {group.links.map((link: IFooterNavigationLink, linkIndex: number) => {
              return (
                <li key={linkIndex}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              )
            })}
          </ul>
        )
      }
    }
  )

  return (
    <div className={styles.nav}>
      <div className={styles.accordions}>
        <Accordion extraStyle={{padding: '8px 20px 8px 0px'}} items={links} />
      </div>
    </div>
  )
}
