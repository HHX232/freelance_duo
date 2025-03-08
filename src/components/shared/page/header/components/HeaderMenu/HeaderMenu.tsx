'use client'
import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import styles from './HeaderMenu.module.scss'
import {IHeaderMenuProps} from './HeaderMenu.types'
import Link from 'next/link'
import {useWindowWidth} from './hooks/useWindowWidth'
import {MobileHeaderMenu} from './MobileHeaderMenu/MobileHeaderMenu'
import Image from '@src/components/UI-kit/image/Image'

export default function HeaderMenu({onClose}: IHeaderMenuProps) {
  const windowWidth = useWindowWidth()

  return (
    <div className={styles.menu}>
      {(windowWidth ? windowWidth : 901) > 900 ? (
        <div className={`${styles.container} ${styles.container_desctop}`}>
          {/* TODO: Сделать отдельный компонент */}
          <div className={`${styles.container_item} ${styles.container_item_accent}`}>
            <p className={styles.item_title}>Недвижимость</p>
            <div className={`${styles.item_inner} ${styles.accent}`}>
              <Accordion
                animationOn={false}
                extraClass={`${styles.accordion_extra} ${styles.accordion_extra__accent}`}
                leftArrow={false}
                rightArrow={true}
                items={[
                  {
                    header: 'Квартиры',
                    children: (
                      <ul className={styles.accrodeon_inner_list}>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <Link href={'/odnokomnatnye'}>Однокомнатные</Link>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <Link href={'/dvuhkomnatnye'}>Двухкомнатные</Link>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <Link href={'/3-komnatnye'}>Трехкомнатные</Link>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          {/* TODO: Проверить ссылку */}
                          <Link href={'/4-komnatnye'}>Четырехкомнатые</Link>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <Link href={'/lofty'}>Лофты</Link>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          {/* TODO: Проверить ссылку */}
                          <Link href={'/planirovki-i-ceny'}>Апартаменты</Link>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <Link href={'/kvartiry-s-balkonom'}>С балконом</Link>
                        </li>
                      </ul>
                    ),
                    size: 'defaultXXL'
                  }
                ]}
              />
              <Link onClick={onClose} href={'/parking'}>
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
              {/* TODO: Проверить ссылку */}
              <Link onClick={onClose} href={'/studii'}>
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
              <Link onClick={onClose} href={'/kvartiry-s-kladovoi'}>
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
            </div>
          </div>
          <div className={`${styles.container_item} ${styles.container_item_default}`}>
            <p className={styles.item_title}>О проекте</p>
            <div style={{paddingTop: '13px'}} className={`${styles.item_inner} ${styles.item_inner_default}`}>
              <Accordion
                animationOn={false}
                extraClass={styles.accordion_extra}
                leftArrow={false}
                rightArrow={true}
                arrowSize='medium'
                arrowColor='#fff'
                items={[
                  {
                    // mb: 44px;
                    header: 'О проекте',

                    children: (
                      <ul className={styles.accrodeon_inner_list}>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
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
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
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
              <Link onClick={onClose} href={'/raspolozhenie'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/infrastruktura'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/blagoustroistvo'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/otdelka'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/gallery'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/news'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/stocks'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
          <div className={`${styles.container_item} ${styles.container_item_default}`}>
            <p className={styles.item_title}>Информация</p>

            <div
              style={{paddingTop: '13px', maxHeight: '680px', overflowY: 'scroll'}}
              className={`${styles.item_inner} ${styles.item_inner_default}`}
            >
              <Link onClick={onClose} href={'/alkor'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              {/* TODO: Проверить ссылку */}
              <Link onClick={onClose} href={'/plan-razvitiya'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Accordion
                animationOn={false}
                extraClass={styles.accordion_extra}
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
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <Link href={'/payment-methods'}>Ипотека</Link>
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <Link href={'/payment-methods'}>Рассрочка</Link>
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <Link href={'/payment-methods'}>100% оплата</Link>
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <Link href={'/payment-methods'}>Trade In</Link>
                        </li>
                      </ul>
                    ),
                    size: 'defaultXL',
                    color: 'white'
                  }
                ]}
              />

              {/* TODO: Проверить ссылки */}
              <Link onClick={onClose} href={'/ipotechniy-kalkulator'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/investicii'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/docs'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/contacts'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <Link onClick={onClose} href={'/faq'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
          {/* 
        ------------------------------------------------------------------------------------
        */}
        </div>
      ) : (
        <MobileHeaderMenu onClose={onClose} />
      )}
    </div>
  )
}
