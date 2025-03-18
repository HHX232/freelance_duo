import React, {FC, useState} from 'react'
import styles from './MobileHeaderMenu.module.scss'
import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import cn, {clsx} from 'clsx'
import {useWindowWidth} from '../hooks/useWindowWidth'
import Image from '@src/components/UI-kit/image/Image'
import LinkUI from '@src/components/UI-kit/Typography/Link/LinkUI'

interface IMobileHeaderMenuProps {
  onClose: () => void
  extraClass?: string | undefined
}

interface IMobileAccordionMainProps {
  header: string
  children: React.ReactNode
}

const MobileAccordionMain: FC<IMobileAccordionMainProps> = ({children, header}) => {
  const [accordionActive, setAccordionActive] = useState(false)

  const windowWidth = useWindowWidth()

  return (
    <span
      className={cn(styles.main_accordion_box, {
        [styles.main_accordion_box_active]: accordionActive
      })}
    >
      <div className={styles.active_bg_line}></div>
      <Accordion
        animationOn={false}
        onClick={() => {
          setAccordionActive((prev) => !prev)
        }}
        extraClass={accordionActive ? styles.accordion_header_active : ''}
        arrowColor={accordionActive ? '#FFFFFF' : '#FDF1CD'}
        leftArrow={false}
        arrowSize='large'
        decorUnderLine={!accordionActive}
        items={[
          {
            size: (windowWidth ? windowWidth : 769) < 760 ? 'accentSmall' : 'accentMedium',
            font: 'romul',
            color: accordionActive ? 'white' : 'accent',
            header: header,
            children: children
          }
        ]}
      />
    </span>
  )
}

export const MobileHeaderMenu: FC<IMobileHeaderMenuProps> = ({onClose, extraClass}) => {
  const windowWidth = useWindowWidth()
  return (
    <div className={clsx(styles.container, styles.container_mobile, extraClass)}>
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
                  size: (windowWidth ? windowWidth : 769) < 760 ? 'accentSmall' : 'accentMedium',
                  font: 'romul',
                  children: (
                    <ul className={styles.accordion_mobile_list_default}>
                      <li>
                        <LinkUI
                          size={'sm'}
                          weight={'regular'}
                          extraStyle={{color: '#FFFFFF'}}
                          onClick={onClose}
                          href={'/odnokomnatnye'}
                        >
                          Однокомнатные
                        </LinkUI>
                      </li>
                      <li>
                        <LinkUI
                          size={'sm'}
                          weight={'regular'}
                          extraStyle={{color: '#FFFFFF'}}
                          onClick={onClose}
                          href={'/dvuhkomnatnye'}
                        >
                          Двухкомнатные
                        </LinkUI>
                      </li>
                      <li>
                        <LinkUI
                          size={'sm'}
                          weight={'regular'}
                          extraStyle={{color: '#FFFFFF'}}
                          onClick={onClose}
                          href={'/3-komnatnye'}
                        >
                          Трехкомнатные
                        </LinkUI>
                      </li>
                      <li>
                        <LinkUI
                          size={'sm'}
                          weight={'regular'}
                          extraStyle={{color: '#FFFFFF'}}
                          onClick={onClose}
                          href={'/4-komnatnye'}
                        >
                          Четырехкомнатые
                        </LinkUI>
                      </li>
                      <li>
                        <LinkUI
                          size={'sm'}
                          weight={'regular'}
                          extraStyle={{color: '#FFFFFF'}}
                          onClick={onClose}
                          href={'/lofty'}
                        >
                          Лофты
                        </LinkUI>
                      </li>
                      <li>
                        <LinkUI
                          size={'sm'}
                          extraStyle={{color: '#FFFFFF'}}
                          onClick={onClose}
                          href={'/planirovki-i-ceny'}
                        >
                          Апартаменты
                        </LinkUI>
                      </li>
                      <li>
                        <LinkUI
                          size={'sm'}
                          extraStyle={{color: '#FFFFFF'}}
                          onClick={onClose}
                          href={'/kvartiry-s-balkonom'}
                        >
                          С балконом
                        </LinkUI>
                      </li>
                    </ul>
                  )
                }
              ]}
            />
            <LinkUI size={'sm'} weight={'regular'} extraStyle={{color: '#FFFFFF'}} onClick={onClose} href={'/parking'}>
              <Accordion
                animationOn={false}
                extraClass={`${styles.accordion_extra} ${styles.accordion_extra__accent} ${styles.romul_text}`}
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
            </LinkUI>
            <LinkUI size={'sm'} weight={'regular'} extraStyle={{color: '#FFFFFF'}} onClick={onClose} href={'/studii'}>
              <Accordion
                animationOn={false}
                extraClass={`${styles.accordion_extra} ${styles.accordion_extra__accent} ${styles.romul_text}`}
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
            </LinkUI>
            <LinkUI
              size={'sm'}
              weight={'regular'}
              extraStyle={{color: '#FFFFFF'}}
              onClick={onClose}
              href={'/kvartiry-s-kladovoi'}
            >
              <Accordion
                animationOn={false}
                extraClass={`${styles.accordion_extra} ${styles.accordion_extra__accent} ${styles.romul_text}`}
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
            </LinkUI>
          </span>
        </MobileAccordionMain>

        <MobileAccordionMain header='О проекте'>
          <span
            onClick={(e: any) => {
              e.stopPropagation()
            }}
            style={{width: '100%', zIndex: 999, overflowY: 'auto'}}
          >
            <ul>
              <li>
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
                          <li onClick={onClose}>
                            <LinkUI size={'sm'} weight={'regular'} extraStyle={{color: '#FFFFFF'}} href={'/o-proekte'}>
                              <Image
                                className={styles.accordeon_inner_item_image}
                                src='/content/about/about-new.png'
                                alt='Кронфорт'
                                loading='lazy'
                                fill={true}
                                quality={10}
                              />
                              «Кронфорт»
                            </LinkUI>
                          </li>
                          <li onClick={onClose}>
                            <LinkUI
                              size={'sm'}
                              weight={'regular'}
                              extraStyle={{color: '#FFFFFF'}}
                              href={'/tsentralnyi'}
                            >
                              <Image
                                className={styles.accordeon_inner_item_image}
                                src='/content/about/central-1.png'
                                alt='Кронфорт'
                                loading='lazy'
                                fill={true}
                                quality={10}
                              />
                              «Кронфорт. Центральный»
                            </LinkUI>
                          </li>
                        </ul>
                      ),
                      size: 'defaultXL',
                      color: 'white'
                    }
                  ]}
                />
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/raspolozhenie'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/infrastruktura'}
                >
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
                </LinkUI>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/transport'}
                >
                  <Accordion
                    animationOn={false}
                    leftArrow={false}
                    rightArrow={false}
                    items={[
                      {
                        header: 'Транспортная доступность',
                        children: <></>,
                        size: 'defaultXL',
                        color: 'white'
                      }
                    ]}
                  />
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/blagoustroistvo'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/otdelka'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/gallery'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI size={'sm'} weight={'regular'} extraStyle={{color: '#FFFFFF'}} onClick={onClose} href={'/news'}>
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
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/stocks'}
                >
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
                </LinkUI>
              </li>
            </ul>
          </span>
        </MobileAccordionMain>

        <MobileAccordionMain header='Информация'>
          <span
            onClick={(e: any) => {
              e.stopPropagation()
            }}
            style={{width: '100%', zIndex: 999, overflowY: 'auto'}}
          >
            <ul>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/alkor'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/plan-razvitiya'}
                >
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
                </LinkUI>
              </li>
              <li>
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
                          <li onClick={onClose}>
                            <LinkUI
                              size={'sm'}
                              weight={'regular'}
                              extraStyle={{color: '#FFFFFF'}}
                              href={'/payment-methods'}
                            >
                              Ипотека
                            </LinkUI>
                          </li>
                          <li onClick={onClose}>
                            <LinkUI
                              size={'sm'}
                              weight={'regular'}
                              extraStyle={{color: '#FFFFFF'}}
                              href={'/payment-methods'}
                            >
                              Рассрочка
                            </LinkUI>
                          </li>
                          <li onClick={onClose}>
                            <LinkUI
                              size={'sm'}
                              weight={'regular'}
                              extraStyle={{color: '#FFFFFF'}}
                              href={'/payment-methods'}
                            >
                              100% оплата
                            </LinkUI>
                          </li>
                          <li onClick={onClose}>
                            <LinkUI
                              size={'sm'}
                              weight={'regular'}
                              extraStyle={{color: '#FFFFFF'}}
                              href={'/payment-methods'}
                            >
                              Trade In
                            </LinkUI>
                          </li>
                        </ul>
                      ),
                      size: 'defaultXL',
                      color: 'white'
                    }
                  ]}
                />
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/mortgage-calculate'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/investicii'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI size={'sm'} weight={'regular'} extraStyle={{color: '#FFFFFF'}} onClick={onClose} href={'/docs'}>
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
                </LinkUI>
              </li>
              <li>
                <LinkUI
                  size={'sm'}
                  weight={'regular'}
                  extraStyle={{color: '#FFFFFF'}}
                  onClick={onClose}
                  href={'/contacts'}
                >
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
                </LinkUI>
              </li>
              <li>
                <LinkUI size={'sm'} weight={'regular'} extraStyle={{color: '#FFFFFF'}} onClick={onClose} href={'/faq'}>
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
                </LinkUI>
              </li>
            </ul>
          </span>
        </MobileAccordionMain>
      </div>
    </div>
  )
}
