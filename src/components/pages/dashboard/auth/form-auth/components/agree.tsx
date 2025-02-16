import React, {ButtonHTMLAttributes, forwardRef, useState} from 'react'
import styles from './agree.module.scss'

export interface ButtonCheckBoxProps extends ButtonHTMLAttributes<HTMLInputElement> {
  isChecked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ButtonCheckboxAgree = forwardRef<HTMLInputElement, ButtonCheckBoxProps>(
  ({isChecked, onChange, children, ...props}, ref) => {
    const [checked, setChecked] = useState<boolean>(isChecked || false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked)
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <label className={styles.checkbox_container}>
        <div>
          <input type='checkbox' checked={checked} onChange={handleChange} {...props} ref={ref} />
          <span className={`${styles.checkbox} ${checked ? styles.checked : ''}`} aria-hidden='true' />
        </div>

        <div className={styles.text}>{children}</div>
      </label>
    )
  }
)

ButtonCheckboxAgree.displayName = 'ButtonCheckboxAgree'
