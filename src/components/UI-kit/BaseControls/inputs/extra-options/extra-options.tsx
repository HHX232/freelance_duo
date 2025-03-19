import styles from './extra-options.module.scss'
import DropdownIcon from '@icon/dropdown_arrow.svg'
import {useState} from 'react'
import clsx from 'clsx'
import {ExtraCheckbox} from '@shared/extra-options-checkbox/extra-checkbox'
import {Parameter, Parametrs} from '@src/types/filters.interface'

interface ExtraOptionsProps {
  parametrs: Parametrs
  selectedParams: string[]
  onParamChange: (value: string, checked: boolean) => void
}

export const ExtraOptions = ({parametrs, selectedParams, onParamChange}: ExtraOptionsProps) => {
  const [isActive, setActive] = useState<boolean>(false)

  const handleCheckboxChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    onParamChange(value, checked)
  }

  return (
    <div className={styles.extraOptions}>
      <button
        type='button'
        className={clsx(styles.title, isActive ? styles.extra_active : '')}
        onClick={() => setActive(!isActive)}
      >
        <span>Дополнительные параметры</span>
        <DropdownIcon />
      </button>
      {isActive && (
        <div className={clsx(styles.content, isActive ? styles.active : '')}>
          {(Object.keys(parametrs) as Array<keyof Parametrs>).map((category) => (
            <div key={category} className={styles.type}>
              <span>{category}:</span>
              <div className={styles.items}>
                {parametrs[category]?.map((param: Parameter) => {
                  const normalizedValue = param.Value.toLowerCase().trim()
                  const isChecked = selectedParams.some(
                    (selectedParam) => selectedParam.toLowerCase().trim() === normalizedValue
                  )
                  return (
                    <ExtraCheckbox key={param.id} isChecked={isChecked} onChange={handleCheckboxChange(param.Value)}>
                      {param.Value}
                    </ExtraCheckbox>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
