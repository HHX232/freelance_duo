import {FC, useState} from 'react'
import styles from './MobileHeaderMenu.module.scss'
import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import cn from 'clsx'
import Link from 'next/link'
import Inst from '@icons/inst.svg'
import Vk from '@icons/vk.svg'
import {useWindowWidth} from '../hooks/useWindowWidth'
import Image from '@src/components/UI-kit/image/Image'

interface IMobileHeaderMenuProps {
  onClose: () => void
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

export const MobileHeaderMenu: FC<IMobileHeaderMenuProps> = ({onClose}) => {
  const windowWidth = useWindowWidth()
  return (
    <div className={`${styles.container} ${styles.container_mobile}`}>
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
                        <Link onClick={onClose} href={'/odnokomnatnye'}>
                          Однокомнатные
                        </Link>
                      </li>
                      <li>
                        <Link onClick={onClose} href={'/dvuhkomnatnye'}>
                          Двухкомнатные
                        </Link>
                      </li>
                      <li>
                        <Link onClick={onClose} href={'/3-komnatnye'}>
                          Трехкомнатные
                        </Link>
                      </li>
                      <li>
                        <Link onClick={onClose} href={'/4-komnatnye'}>
                          Четырехкомнатые
                        </Link>
                      </li>
                      <li>
                        <Link onClick={onClose} href={'/lofty'}>
                          Лофты
                        </Link>
                      </li>
                      <li>
                        <Link onClick={onClose} href={'/planirovki-i-ceny'}>
                          Апартаменты
                        </Link>
                      </li>
                      <li>
                        <Link onClick={onClose} href={'/kvartiry-s-balkonom'}>
                          С балконом
                        </Link>
                      </li>
                    </ul>
                  )
                }
              ]}
            />
            <Link onClick={onClose} href={'/parking'}>
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
            </Link>
            <Link onClick={onClose} href={'/studii'}>
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
            </Link>
            <Link onClick={onClose} href={'/kvartiry-s-kladovoi'}>
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
                          <li onClick={onClose}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/raspolozhenie'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/infrastruktura'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/blagoustroistvo'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/otdelka'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/gallery'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/news'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/stocks'}>
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
                <Link onClick={onClose} href={'/alkor'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/plan-razvitiya'}>
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
                            <Link href={'/payment-methods'}>Ипотека</Link>
                          </li>
                          <li onClick={onClose}>
                            <Link href={'/payment-methods'}>Рассрочка</Link>
                          </li>
                          <li onClick={onClose}>
                            <Link href={'/payment-methods'}>100% оплата</Link>
                          </li>
                          <li onClick={onClose}>
                            <Link href={'/payment-methods'}>Trade In</Link>
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
                <Link onClick={onClose} href={'/ipotechniy-kalkulator'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/investicii'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/docs'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/contacts'}>
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
              </li>
              <li>
                <Link onClick={onClose} href={'/faq'}>
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
              </li>
            </ul>
          </span>
        </MobileAccordionMain>
      </div>

      <div className={styles.mobile_text_box}>
        <p className={styles.mobile_text_title}>Головной офис продаж</p>
        <div className={styles.mobile_inner_text}>
          <a className={styles.mobile_text} href={'tel:+7 812 602 20 10'}>
            +7 (812) 270-50-73
          </a>
          <p className={styles.mobile_text_adress}>
            ст. м. «Старая деревня», ул. Оптиков, 4, корпус 3, лит. А, бизнес-центр «Лахта-2»
          </p>
          <div className={styles.time_block}>
            <p className={styles.time_block_text}>По будням: с 9:00 до 19:00</p>
            <p className={styles.time_block_text}>Выходные: суббота - воскресенье</p>
          </div>
          <div className={styles.social_box}>
            <a href={'/'} target='_blank' rel='noreferrer'>
              <Vk className={styles.vk}></Vk>
            </a>
            <a href={'/'} target='_blank' rel='noreferrer'>
              <Inst className={styles.inst}></Inst>
            </a>
            <p className={styles.social_box_text}>— Мы в соц сетях</p>
          </div>
        </div>
      </div>
    </div>
  )
}
