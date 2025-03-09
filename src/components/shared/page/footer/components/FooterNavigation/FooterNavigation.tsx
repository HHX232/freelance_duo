import styles from './FooterNavigation.module.scss'
import {IFooterNavigationProps} from './FooterNavigation.types'
import DesktopFooterNavigation from './DesktopFooterNavigation/DesktopFooterNavigation'
import Link from 'next/link'
import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import {MobileAccordionMain} from '@shared/page/header/components/HeaderMenu/MobileHeaderMenu/MobileHeaderMenu'
import Image from '@src/components/UI-kit/image/Image'

export default function FooterNavigation(props: IFooterNavigationProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.desktop}>
        <DesktopFooterNavigation linksGroups={props.linksGroups} secondaryLinks={props.secondaryLinks} />
      </div>
      <div className={styles.mobile}>
        <div className={styles.accordion_mobile_box}>
          <MobileAccordionMain header='Недвижимость'>
            <span
              onClick={(e: any) => {
                e.stopPropagation()
              }}
              style={{width: '100%', zIndex: 999, overflowY: 'auto'}}
            >
              <Accordion
                animationOn={false}
                leftArrow={false}
                containerExtraClass={styles.accordion_mobile_100}
                items={[
                  {
                    header: 'Квартиры',
                    size: 'accentSmall',
                    font: 'romul',
                    children: (
                      <ul className={styles.accordion_mobile_list_default}>
                        <li>
                          <Link href={'/odnokomnatnye'}>Однокомнатные</Link>
                        </li>
                        <li>
                          <Link href={'/dvukhkomnatnye'}>Двухкомнатные</Link>
                        </li>
                        <li>
                          <Link href={'/3-komnatnye'}>Трехкомнатные</Link>
                        </li>
                        <li>
                          <Link href={'/4-komnatnye'}>Четырехкомнатые</Link>
                        </li>
                        <li>
                          <Link href={'/lofty'}>Лофты</Link>
                        </li>
                        <li>
                          <Link href={'/planirovki-i-ceny'}>Апартаменты</Link>
                        </li>
                        <li>
                          <Link href={'/kvartiry-s-balkonom'}>С балконом</Link>
                        </li>
                      </ul>
                    )
                  }
                ]}
              />
              <Link href={'/parking'}>
                <Accordion
                  animationOn={false}
                  extraClass={`${styles.accordion_extra} ${styles.accordion_extra__accent}`}
                  leftArrow={false}
                  rightArrow={false}
                  items={[
                    {
                      header: 'Паркинг',
                      children: <></>,
                      size: 'defaultXXL'
                    }
                  ]}
                />
              </Link>
              <Link href={'/studii'}>
                <Accordion
                  animationOn={false}
                  extraClass={`${styles.accordion_extra} ${styles.accordion_extra__accent}`}
                  leftArrow={false}
                  rightArrow={false}
                  items={[
                    {
                      header: 'Коммерческие помещения',
                      children: <></>,
                      size: 'defaultXXL'
                    }
                  ]}
                />
              </Link>
              <Link href={'/kvartiry-s-kladovoi'}>
                <Accordion
                  animationOn={false}
                  extraClass={`${styles.accordion_extra} ${styles.accordion_extra__accent}`}
                  leftArrow={false}
                  rightArrow={false}
                  items={[
                    {
                      header: 'Кладовые',
                      children: <></>,
                      size: 'defaultXXL'
                    }
                  ]}
                />
              </Link>
            </span>
          </MobileAccordionMain>
          <MobileAccordionMain header='О проекте'>
            <span
              onClick={(e: any) => {
                e.stopPropagation()
              }}
              style={{width: '100%', zIndex: 999, overflowY: 'auto'}}
            >
              <div>
                <div>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={true}
                    arrowSize='medium'
                    arrowColor='#fff'
                    items={[
                      {
                        // mb: 44px;
                        header: 'О проекте',

                        children: (
                          <ul className={styles.accordeon_inner_about}>
                            <li>
                              <Link href={'/o-proekte'}>
                                <Image
                                  className={styles.accordeon_inner_item_image}
                                  src='/content/about/about-new.png'
                                  alt='Кронфорт'
                                  loading='lazy'
                                  fill={true}
                                  quality={10}
                                />
                                «Кронфорт»
                              </Link>
                            </li>
                            <li>
                              <Link href={'/tsentralnyi'}>
                                <Image
                                  className={styles.accordeon_inner_item_image}
                                  src='/content/about/central-1.png'
                                  alt='Кронфорт'
                                  loading='lazy'
                                  fill={true}
                                  quality={10}
                                />
                                «Кронфорт. Центральный»
                              </Link>
                            </li>
                          </ul>
                        ),
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </div>
                <div>
                  <Link href={'/raspolozhenie'}>
                    <Accordion
                      animationOn={false}
                      leftArrow={false}
                      rightArrow={false}
                      items={[
                        {
                          header: 'Расположение',
                          children: <></>,
                          size: 'defaultXL',
                          color: 'white'
                        }
                      ]}
                    />
                  </Link>
                </div>
                <div>
                  <Link href={'/infrastruktura'}>
                    <Accordion
                      animationOn={false}
                      leftArrow={false}
                      rightArrow={false}
                      items={[
                        {
                          header: 'Инфраструктура',
                          children: <></>,
                          size: 'defaultXL',
                          color: 'white'
                        }
                      ]}
                    />
                  </Link>
                </div>
                <div>
                  <Link href={'/blagoustroistvo'}>
                    <Accordion
                      animationOn={false}
                      leftArrow={false}
                      rightArrow={false}
                      items={[
                        {
                          header: 'Благоустройство',
                          children: <></>,
                          size: 'defaultXL',
                          color: 'white'
                        }
                      ]}
                    />
                  </Link>
                </div>
                <div>
                  <Link href={'/otdelka'}>
                    <Accordion
                      animationOn={false}
                      leftArrow={false}
                      rightArrow={false}
                      items={[
                        {
                          header: 'Виды отделки',
                          children: <></>,
                          size: 'defaultXL',
                          color: 'white'
                        }
                      ]}
                    />
                  </Link>
                </div>
                <div>
                  <Link href={'/gallery'}>
                    <Accordion
                      animationOn={false}
                      leftArrow={false}
                      rightArrow={false}
                      items={[
                        {
                          header: 'Ход строительства',
                          children: <></>,
                          size: 'defaultXL',
                          color: 'white'
                        }
                      ]}
                    />
                  </Link>
                </div>
                <div>
                  <Link href={'/news'}>
                    <Accordion
                      animationOn={false}
                      leftArrow={false}
                      rightArrow={false}
                      items={[
                        {
                          header: 'Новости',
                          children: <></>,
                          size: 'defaultXL',
                          color: 'white'
                        }
                      ]}
                    />
                  </Link>
                </div>
                <div>
                  <Link href={'/stocks'}>
                    <Accordion
                      animationOn={false}
                      leftArrow={false}
                      rightArrow={false}
                      items={[
                        {
                          header: 'Акции',
                          children: <></>,
                          size: 'defaultXL',
                          color: 'white'
                        }
                      ]}
                    />
                  </Link>
                </div>
              </div>
            </span>
          </MobileAccordionMain>
          <MobileAccordionMain header='Информация'>
            <div>
              <div>
                <Link href={'/alkor'}>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        // mb: 44px;
                        header: 'О застройщике',

                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </Link>
              </div>
              <div>
                <Link href={'/plan-razvitiya'}>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        header: 'План развития',
                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </Link>
              </div>
              <div>
                <Accordion
                  animationOn={false}
                  leftArrow={false}
                  rightArrow={true}
                  arrowSize='medium'
                  arrowColor='#fff'
                  items={[
                    {
                      header: 'Способы покупки',
                      children: (
                        <ul className={styles.accrodeon_inner_list}>
                          {/* TODO: Проверить ссылки */}
                          <li>
                            <Link href={'/payment-methods'}>Ипотека</Link>
                          </li>
                          <li>
                            <Link href={'/payment-methods'}>Рассрочка</Link>
                          </li>
                          <li>
                            <Link href={'/payment-methods'}>100% оплата</Link>
                          </li>
                          <li>
                            <Link href={'/payment-methods'}>Trade In</Link>
                          </li>
                        </ul>
                      ),
                      size: 'defaultXL',
                      color: 'white'
                    }
                  ]}
                />
              </div>
              <div>
                <Link href={'/ipotechniy-kalkulator'}>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        header: 'Ипотечный калькулятор',
                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </Link>
              </div>
              <div>
                <Link href={'/investicii'}>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        header: 'Инвестиции',
                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </Link>
              </div>
              <div>
                <Link href={'/docs'}>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        header: 'Документы',
                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </Link>
              </div>
              <div>
                <Link href={'/contacts'}>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        header: 'Контакты',
                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </Link>
              </div>
              <div>
                <Link href={'/faq'}>
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        header: 'FAQ',
                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </Link>
              </div>
            </div>
          </MobileAccordionMain>
        </div>
      </div>
    </div>
  )
}
