'use client'
import {useState} from 'react'
import styles from './checkbox.module.scss'

interface IObjectCheckbox {
  onChoose: (value: boolean) => void
  dashboard?: boolean
}

export const CompareCheckBox = ({onChoose, dashboard}: IObjectCheckbox) => {
  const [isActive, setActive] = useState<boolean>(false)

  const handleClick = () => {
    setActive(!isActive)
    onChoose(!isActive)
  }

  return (
    <button type='button' className={styles.checkbox_container} onClick={handleClick}>
      <span>Только различия</span>
      <div className={`${styles.checkbox} ${isActive ? styles.active : ''} ${dashboard ? styles.dashboard : ''}`} />
    </button>
  )
}
