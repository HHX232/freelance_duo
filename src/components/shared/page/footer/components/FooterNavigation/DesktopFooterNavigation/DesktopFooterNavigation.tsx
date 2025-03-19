import Link from 'next/link'
import {IFooterNavigationLink, IFooterNavigationLinksGroup} from '../FooterNavigation.types'
import styles from './DesktopFooterNavigation.module.scss'
import {IDesktopFooterNavigationProps} from './DesktopFooterNavigation.types'
import LinkUI from '@src/components/UI-kit/Typography/Link/LinkUI'

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
                      <LinkUI href={props.secondaryLinks[linksGroupIndex].href as string} size={'sm'}>
                        {props.secondaryLinks[linksGroupIndex].name}
                      </LinkUI>
                    </li>
                  </>
                )
              }

              return (
                <li key={linkIndex}>
                  {link.href ? (
                    <LinkUI href={link.href} size={'sm'}>
                      {link.name}
                    </LinkUI>
                  ) : (
                    link.href
                  )}
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </div>
  )
}
