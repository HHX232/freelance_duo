import Accordion, { AccordionProps } from '@shared/accordion/Accordion'
import styles from './FooterSiteMapWithAccordion.module.scss'
import { FooterSiteMapLink, FooterSitemapWithAccordionLink } from '../footer-types'
import Link from 'next/link'

const LINKS: FooterSitemapWithAccordionLink[] = [
    {
        header: <p style={{ marginLeft: '30px' }}>Недвижимость<br /></p>,
        items: [
            {
                href: '#test',
                title: 'test',
            },
            {
                href: '#test',
                title: 'test',
            },
            {
                href: '#test',
                title: 'test',
            },
        ],
    },
    {
        header: <p style={{ marginLeft: '30px' }}>О проекте<br /></p>,
        items: [
            {
                href: '#test',
                title: 'test',
            },
            {
                href: '#test',
                title: 'test',
            },
            {
                href: '#test',
                title: 'test',
            },
        ],
    },
    {
        header: <p style={{ marginLeft: '30px' }}>Информация<br /></p>,
        items: [
            {
                href: '#test',
                title: 'test',
            },
            {
                href: '#test',
                title: 'test',
            },
            {
                href: '#test',
                title: 'test',
            },
        ],
    },
]

const ACCORDION: AccordionProps = {
    items: LINKS.map((accordion: FooterSitemapWithAccordionLink, accordionIndex: number) => {
        return {
            header: accordion.header,
            font: 'romul',
            color: 'accent',
            size: 'accentMedium',
            children: <ul key={accordionIndex}>
                {
                    accordion.items.map((link: FooterSiteMapLink, linkIndex: number) => (
                        <li key={linkIndex}>
                            <Link href={link.href}>{link.title}</Link>
                        </li>
                    ))
                }
            </ul>

        }
    })
}

export default function FooterSiteMapWithAccordion() {

    return (
        <div className={styles.footerSiteMapWithAccordion}>
            <div className={styles.accordions}>
                <Accordion
                    extraStyle={{ padding: '8px 20px 8px 0px' }}
                    items={ACCORDION.items}
                />
            </div>
        </div>
    )
}