import React, {forwardRef, InputHTMLAttributes} from 'react'
import styles from './input-field.module.scss'
import clsx from 'clsx'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  title: string
  styleContainer?: React.CSSProperties
  variety?: 'primary' | 'secondary'
  stylesLabel?: any
  inputStyles?: any
  maxLength?: number
  pattern?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      onChange,
      style,
      placeholder,
      variety = 'primary',
      className,
      type = 'text',
      styleContainer,
      error,
      title,
      stylesLabel,
      inputStyles,
      maxLength,
      pattern,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <label className={clsx(styles.input_container, className)} style={styleContainer}>
        <span className={clsx(styles.label, stylesLabel)}>{title}</span>
        <input
          type={type}
          onChange={handleChange}
          className={clsx(styles.input_field, styles[variety], inputStyles)}
          style={style}
          {...props}
          ref={ref}
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
        />
        {error && <span className={styles.error}>{error}</span>}
      </label>
    )
  }
)

InputField.displayName = 'InputField'
