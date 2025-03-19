import React, {forwardRef, TextareaHTMLAttributes} from 'react'
import styles from './textbox.module.scss'
import clsx from 'clsx'

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  title: string
  styleContainer?: React.CSSProperties
  variety?: 'primary' | 'secondary'
}

export const TextBox = forwardRef<HTMLTextAreaElement, IProps>(
  ({onChange, style, variety = 'primary', className, styleContainer, error, title, ...props}, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <label className={clsx(styles.textbox_container, className)} style={styleContainer}>
        <span className={styles.label}>{title}</span>
        <textarea
          onChange={handleChange}
          className={clsx(styles.textbox, styles[variety])}
          style={style}
          {...props}
          ref={ref}
        />
        {error && <span className={styles.error}>{error}</span>}
      </label>
    )
  }
)

TextBox.displayName = 'InputField'
