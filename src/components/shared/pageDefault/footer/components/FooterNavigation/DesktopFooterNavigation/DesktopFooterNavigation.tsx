import Link from 'next/link'
import {IFooterNavigationLink, IFooterNavigationLinksGroup} from '../FooterNavigation.types'
import styles from './DesktopFooterNavigation.module.scss'
import {IDesktopFooterNavigationProps} from './DesktopFooterNavigation.types'
import LinkUI from '@src/components/UI-kit/Text-Elements/Typography/Link/LinkUI'
import React from 'react'

export default function DesktopFooterNavigation(props: IDesktopFooterNavigationProps) {
  return (
    <div itemScope itemType='http://schema.org/SiteNavigationElement' className={styles.nav}>
      <div className={styles.links}>
        {props.linksGroups.map((group: IFooterNavigationLinksGroup, linksGroupIndex: number) => (
          <ul itemScope itemType='http://schema.org/ItemList' key={linksGroupIndex}>
            {group.links.map((link: IFooterNavigationLink, linkIndex: number) => {
              if (linksGroupIndex < 2 && linkIndex >= group.links.length - 1) {
                return (
                  <React.Fragment key={linkIndex}>
                    <li>
                      {link.href ? (
                        <Link itemProp='url' href={link.href}>
                          {link.name}
                        </Link>
                      ) : (
                        link.name
                      )}
                    </li>
                    <li
                      itemProp='itemListElement'
                      itemScope
                      itemType='http://schema.org/ListItem'
                      className={styles.secondary_link}
                      key={`secondary-${linksGroupIndex}-${linkIndex}`}
                    >
                      <LinkUI itemProp='url' href={props.secondaryLinks[linksGroupIndex].href as string} size={'sm'}>
                        {props.secondaryLinks[linksGroupIndex].name}
                      </LinkUI>
                    </li>
                  </React.Fragment>
                )
              }

              return (
                <li key={linkIndex} itemProp='itemListElement' itemScope itemType='http://schema.org/ListItem'>
                  {link.href ? (
                    <LinkUI itemProp='url' href={link.href} size={'sm'}>
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
