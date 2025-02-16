import React, {ButtonHTMLAttributes, forwardRef, useState} from 'react'
import styles from './extra-checkbox.module.scss'

export interface ButtonCheckBoxProps extends ButtonHTMLAttributes<HTMLInputElement> {
  isChecked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ExtraCheckbox = forwardRef<HTMLInputElement, ButtonCheckBoxProps>(
  ({isChecked, onChange, children, ...props}, ref) => {
    const [checked, setChecked] = useState<boolean>(isChecked || false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked)
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <label className={styles.extracheckbox_container}>
        <div className={styles.box}>
          <input type='checkbox' checked={checked} onChange={handleChange} {...props} ref={ref} />
          <span className={`${styles.checkbox} ${checked ? styles.checked : ''}`} aria-hidden='true' />
        </div>

        <div className={styles.text}>{children}</div>
      </label>
    )
  }
)

ExtraCheckbox.displayName = 'ExtraCheckbox'
