import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import styles from './MobileFooterNavigation.module.scss'
import {IMobileFooterNavigationProps} from './MobileFooterNavigation.types'
import {IAccordionItem} from '@src/components/UI-kit/AccordeonKit/accordion/accordion.types'
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
          //TODO добавить модуль стилей вместо inline
          <div
            className={styles.links}
            style={{gap: '10px', display: 'flex', flexDirection: 'column'}}
            key={groupIndex}
          >
            {group.links.map((link: IFooterNavigationLink, linkIndex: number) => {
              return (
                <div className={styles.link} key={linkIndex}>
                  {link.href ? (
                    <Link style={{fontSize: '14px'}} href={link.href}>
                      {link.name}
                    </Link>
                  ) : (
                    link.name
                  )}
                </div>
              )
            })}
          </div>
        )
      }
    }
  )

  return (
    <div className={styles.nav}>
      <div className={styles.accordions}>
        <Accordion
          extraClass={styles.accordion_adaptive}
          containerExtraClass={styles.extraGap}
          leftArrow={false}
          arrowSize='large'
          items={links}
        />
      </div>
    </div>
  )
}
