'use client'
import styles from './HeaderMenu.module.scss'
import {IHeaderMenuProps} from './HeaderMenu.types'
import {useWindowWidth} from './hooks/useWindowWidth'
import {MobileHeaderMenu} from './MobileHeaderMenu/MobileHeaderMenu'
import Image from '@src/components/UI-kit/image/Image'
import MobileHeaderInfoBlock from '../MobileHeaderInfoBlock/MobileHeaderInfoBlock'
import LinkUI from '@src/components/UI-kit/Text-Elements/Typography/Link/LinkUI'
import Accordion from '@src/components/UI-kit/Popups-Modals/AccordeonKit/accordion/Accordion'

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
                          <LinkUI size={'sm'} weight={'regular'} href={'/odnokomnatnye'}>
                            Однокомнатные
                          </LinkUI>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <LinkUI size={'sm'} weight={'regular'} href={'/dvuhkomnatnye'}>
                            Двухкомнатные
                          </LinkUI>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <LinkUI size={'sm'} weight={'regular'} href={'/3-komnatnye'}>
                            Трехкомнатные
                          </LinkUI>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <LinkUI size={'sm'} weight={'regular'} href={'/lofty'}>
                            Лофты
                          </LinkUI>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          {/* TODO: Проверить ссылку */}
                          <LinkUI size={'sm'} weight={'regular'} href={'/planirovki-i-ceny'}>
                            Апартаменты
                          </LinkUI>
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          <LinkUI size={'sm'} weight={'regular'} href={'/kvartiry-s-balkonom'}>
                            С балконом
                          </LinkUI>
                        </li>
                      </ul>
                    ),
                    size: 'defaultXXL'
                  }
                ]}
              />
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/parking'}>
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
              </LinkUI>
              {/* TODO: Проверить ссылку */}
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/commerce'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/storerooms'}>
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
              </LinkUI>
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
                          <LinkUI size={'sm'} weight={'regular'} href={'/o-proekte'}>
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
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <LinkUI size={'sm'} weight={'regular'} href={'/tsentralnyi'}>
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
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/raspolozhenie'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/infrastruktura'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/transport'}>
                <Accordion
                  animationOn={false}
                  extraClass={styles.accordion_extra}
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
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/blagoustroistvo'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/otdelka'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/gallery'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/news'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/stocks'}>
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
              </LinkUI>
            </div>
          </div>
          <div className={`${styles.container_item} ${styles.container_item_default}`}>
            <p className={styles.item_title}>Информация</p>

            <div
              style={{paddingTop: '13px', maxHeight: '680px', overflowY: 'scroll'}}
              className={`${styles.item_inner} ${styles.item_inner_default}`}
            >
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/alkor'}>
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
              </LinkUI>
              {/* TODO: Проверить ссылку */}
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/plan-razvitiya'}>
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
              </LinkUI>
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
                          <LinkUI size={'sm'} weight={'regular'} href={'/payment-methods'}>
                            Ипотека
                          </LinkUI>
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <LinkUI size={'sm'} weight={'regular'} href={'/payment-methods'}>
                            Рассрочка
                          </LinkUI>
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <LinkUI size={'sm'} weight={'regular'} href={'/payment-methods'}>
                            100% оплата
                          </LinkUI>
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          <LinkUI size={'sm'} weight={'regular'} href={'/payment-methods'}>
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

              {/* TODO: Проверить ссылки */}
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/mortgage-calculate'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/investicii'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/docs'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/contacts'}>
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
              </LinkUI>
              <LinkUI size={'sm'} weight={'regular'} onClick={onClose} href={'/faq'}>
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
              </LinkUI>
            </div>
          </div>
          {/*
        ------------------------------------------------------------------------------------
        */}
        </div>
      ) : (
        <div className={styles.mobileContainer}>
          <MobileHeaderMenu onClose={onClose} />
          <MobileHeaderInfoBlock />
        </div>
      )}
    </div>
  )
}
