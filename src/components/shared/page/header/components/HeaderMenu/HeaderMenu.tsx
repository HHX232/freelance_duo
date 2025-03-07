'use client'
import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import styles from './HeaderMenu.module.scss'
import {IHeaderMenuProps} from './HeaderMenu.types'
import Link from 'next/link'
import {useWindowWidth} from './hooks/useWindowWidth'
import {MobileHeaderMenu} from './MobileHeaderMenu/MobileHeaderMenu'

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
                          Однокомнатные
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          Двухкомнатные
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          Трехкомнатные
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          Четырехкомнатые
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          Лофты
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          Апартаменты
                        </li>
                        <li
                          className={`${styles.accordeon_inner_item} ${styles.accordeon_inner_item_accent}`}
                          onClick={onClose}
                        >
                          С балконом
                        </li>
                      </ul>
                    ),
                    size: 'defaultXXL'
                  }
                ]}
              />
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
                          Однокомнатные
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Двухкомнатные
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Трехкомнатные
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Четырехкомнатые
                        </li>
                      </ul>
                    ),
                    size: 'defaultXL',
                    color: 'white'
                  }
                ]}
              />
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Однокомнатные
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Двухкомнатные
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Трехкомнатные
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Четырехкомнатые
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Лофты
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          Апартаменты
                        </li>
                        <li className={styles.accordeon_inner_item} onClick={onClose}>
                          С балконом
                        </li>
                      </ul>
                    ),
                    size: 'defaultXL',
                    color: 'white'
                  }
                ]}
              />

              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
              <Link onClick={onClose} href={'/'}>
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20px',
                backgroundColor: 'white',
                padding: '20px'
              }}
            ></div>
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
