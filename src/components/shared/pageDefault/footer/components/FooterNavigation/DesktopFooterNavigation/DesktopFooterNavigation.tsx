import Link from 'next/link'
import {IFooterNavigationLink, IFooterNavigationLinksGroup} from '../FooterNavigation.types'
import styles from './DesktopFooterNavigation.module.scss'
import {IDesktopFooterNavigationProps} from './DesktopFooterNavigation.types'
import LinkUI from '@src/components/UI-kit/Text-Elements/Typography/Link/LinkUI'
import React from 'react'

export default function DesktopFooterNavigation(props: IDesktopFooterNavigationProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.links}>
        {props.linksGroups.map((group: IFooterNavigationLinksGroup, linksGroupIndex: number) => (
          <ul key={linksGroupIndex}>
            {group.links.map((link: IFooterNavigationLink, linkIndex: number) => {
              if (linksGroupIndex < 2 && linkIndex >= group.links.length - 1) {
                return (
                  <React.Fragment key={linkIndex}>
                    <li>{link.href ? <Link href={link.href}>{link.name}</Link> : link.name}</li>
                    <li className={styles.secondary_link} key={`secondary-${linksGroupIndex}-${linkIndex}`}>
                      <LinkUI href={props.secondaryLinks[linksGroupIndex].href as string} size={'sm'}>
                        {props.secondaryLinks[linksGroupIndex].name}
                      </LinkUI>
                    </li>
                  </React.Fragment>
                )
              }

              return (
                <li key={linkIndex}>
                  {link.href ? (
                    <LinkUI href={link.href} size={'sm'}>
                      {link.name}
                    </LinkUI>
                  ) : (
                    link.name
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
