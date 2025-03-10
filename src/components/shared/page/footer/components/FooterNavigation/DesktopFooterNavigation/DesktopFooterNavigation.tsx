import Link from 'next/link'
import {IFooterNavigationLink, IFooterNavigationLinksGroup} from '../FooterNavigation.types'
import styles from './DesktopFooterNavigation.module.scss'
import {IDesktopFooterNavigationProps} from './DesktopFooterNavigation.types'

export default function DesktopFooterNavigation(props: IDesktopFooterNavigationProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.links}>
        {props.linksGroups.map((group: IFooterNavigationLinksGroup, linksGroupIndex: number) => (
          <ul key={linksGroupIndex}>
            {group.links.map((link: IFooterNavigationLink, linkIndex: number) => {
              if (linksGroupIndex < 2 && linkIndex >= group.links.length - 1) {
                return (
                  <>
                    <li key={linkIndex}>{link.href ? <Link href={link.href}>{link.name}</Link> : link.href}</li>
                    <li className={styles.secondary_link} key={linkIndex + '_secondary'}>
                      <Link href={props.secondaryLinks[linksGroupIndex].href as string}>
                        {props.secondaryLinks[linksGroupIndex].name}
                      </Link>
                    </li>
                  </>
                )
              }

              return <li key={linkIndex}>{link.href ? <Link href={link.href}>{link.name}</Link> : link.href}</li>
            })}
          </ul>
        ))}
      </div>
    </div>
  )
}
