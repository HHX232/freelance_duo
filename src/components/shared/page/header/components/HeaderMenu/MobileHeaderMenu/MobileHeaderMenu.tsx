import {FC, useState} from 'react'
import styles from './MobileHeaderMenu.module.scss'
import Accordion from '@src/components/UI-kit/AccordeonKit/accordion/Accordion'
import cn from 'clsx'
import Link from 'next/link'
import Inst from '@icons/inst.svg'
import Vk from '@icons/vk.svg'
import {useWindowWidth} from '../hooks/useWindowWidth'

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
                        <Link onClick={onClose} href={'/dvukhkomnatnye'}>
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
          </span>
        </MobileAccordionMain>
        <MobileAccordionMain header='О проекте'>
          <ul>
            <li>li11</li>
            <li>li22</li>
            <li>li33</li>
          </ul>
        </MobileAccordionMain>
        <MobileAccordionMain header='Информация'>
          <ul>
            <li>li11</li>
            <li>li22</li>
            <li>li33</li>
          </ul>
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
