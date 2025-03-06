import Link from 'next/link'
import styles from './DashboardActions.module.scss'
import {IDashboardActionsProps} from './DashboardActions.types'
import clsx from 'clsx'
import {useRef, useState} from 'react'
import {useClickOutside} from '@src/lib/hooks/useOutsideClick'

export default function DashboardActions({onClick}: IDashboardActionsProps) {
  const [isDropDown, setDropDown] = useState(false)
  const ref = useRef<HTMLUListElement>(null)
  useClickOutside(ref, () => setDropDown(false))

  return (
    <nav className={styles.dashboard_actions}>
      <ul>
        <li className={styles.dropdown} onClick={() => setDropDown(!isDropDown)}>
          <span>Моя информация</span>
          <ul className={clsx(styles.dropdown_list, isDropDown ? styles.active : '')} ref={ref}>
            <li>
              <Link href={'/lk/reservation'}>Бронь</Link>
            </li>
          </ul>
        </li>
        <li>
          <div onClick={onClick}>
            <Link href='/planirovki-i-ceny'>Подобрать квартиру</Link>
          </div>
        </li>
      </ul>
    </nav>
  )
}
