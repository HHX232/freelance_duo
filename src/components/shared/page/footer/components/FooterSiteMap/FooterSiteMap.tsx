import { AccordionProps } from '@shared/accordion/Accordion';
import styles from './FooterSiteMap.module.scss';
import Link from 'next/link';
import { FooterSiteMapLink } from '../footer-types';

const LINKS: FooterSiteMapLink[][] = [
    [
        { title: 'Главная', href: '/' },
        { title: 'О застройщике', href: '/alkor' },
        { title: 'О проекте', href: '/o-proekte' },
        { title: 'Выбрать квартиру', href: '/planirovki-i-ceny' },
        { title: 'Выбрать паркинг', href: '#vibrat-parking' },
    ],
    [
        { title: 'Выбрать кладовую', href: '#vibrat-kladovuyu' },
        { title: 'Отделка', href: '/otdelka' },
        { title: 'Инвестиции', href: '#investicii' },
        { title: 'Ипотечный калькулятор', href: '#ipotechniy-kalkulator' },
        { title: 'Способы покупки', href: '#sposobi-pokupki' },
    ],
    [
        { title: 'Ход строительства', href: '/gallery' },
        { title: 'Новости', href: '/news' },
        { title: 'Акции', href: '#akcii' },
        { title: 'Контакты', href: '/contacts' },
    ],
];

const SECONDARY_LINKS: FooterSiteMapLink[] = [
    { title: 'Правила политики обработки данных ', href: '/consent' },
    { title: 'Политика конфиденциальности', href: '/privacy-policy' },
]

// const ACARDION_LINKS: AccordionProps = {
//     items: [
//         {

//         }
//     ]
// }

export default function FooterSiteMap() {

    return (
        <div className={styles.footerSiteMap}>
            <div className={styles.primaryLinks}>
                {LINKS.map((column: FooterSiteMapLink[], columnIndex: number) => (
                    <ul key={columnIndex}>
                        {column.map((link: FooterSiteMapLink, linkIndex: number) => (
                            <li key={linkIndex}>
                                <Link href={link.href}>{link.title}</Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className={styles.secondaryLinks}>
                <ul>
                    {SECONDARY_LINKS.map((link: FooterSiteMapLink, linkIndex: number) => (
                        <li key={linkIndex}>
                            <Link href={link.href}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}