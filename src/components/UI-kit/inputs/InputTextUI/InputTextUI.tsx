'use client'
import {forwardRef, useCallback, useId, useState} from 'react'
import cn from 'clsx'
import styles from './InputTextUI.module.scss'
import {InputTextDefaultIcon} from './InputTextDefaultIcon'
import InputClearIcon from './InputClearIcon'
import {IField} from './InputTextUI.types'

{
  /* <InputTextUI placeholder='Вводите...' labelText='Вводите...' theme='white' disabled={false} /> */
}

const InputTextUI = forwardRef<HTMLInputElement, IField>(
  (
    {
      placeholder = 'Вводите...',
      labelText = '',
      error,
      extraClass,
      type = 'text',
      extraStyle,
      icon,
      extraClassClearIcon,
      disabled = false,
      theme,
      ...rest
    },
    ref
  ) => {
    const [inputText, setInputText] = useState('')
    const id = useId()

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value)
      console.log(inputText)
    }

    const clearInput = useCallback(() => {
      setInputText('')
    }, [])

    return (
      <div className={cn(styles.input_box, extraClass)} style={extraStyle}>
        {labelText.length > 0 && (
          <label
            className={cn({
              [styles.disabled_top_label_white]: theme === 'white' && disabled === true,
              [styles.disabled_top_label_white_error]: !!error && theme === 'white' && disabled === true,
              [styles.disabled_top_label_dark]: theme === 'dark' && disabled === true,
              [styles.disabled_top_label_dark_error]: !!error && theme === 'dark' && disabled === true,
              [styles.top_label_white_error]: theme === 'white' && !!error,
              [styles.top_label_dark_error]: theme === 'dark' && !!error,
              [styles.top_label_white]: theme === 'white',
              [styles.top_label_dark]: theme === 'dark'
            })}
            htmlFor={id}
          >
            {labelText}
          </label>
        )}
        <label
          htmlFor={id}
          className={cn(styles.input_main_content, {
            [styles.disabled_input_main_content_white]: theme === 'white' && disabled === true,
            [styles.disabled_input_main_content_dark]: theme === 'dark' && disabled === true,
            [styles.disabled_input_main_content_error_light]: theme === 'white' && disabled === true && !!error,
            [styles.disabled_input_main_content_error_dark]: theme === 'dark' && disabled === true && !!error,
            [styles.input_main_content_error_white]: theme === 'white' && !!error,
            [styles.input_main_content_error_dark]: theme === 'dark' && !!error,
            [styles.input_main_content_white]: theme === 'white',
            [styles.input_main_content_dark]: theme === 'dark'
          })}
        >
          {icon ? (
            icon
          ) : (
            <InputTextDefaultIcon
              opacity={
                theme === 'white'
                  ? disabled
                    ? inputText.length === 0
                      ? '0.4'
                      : '0.6'
                    : inputText.length === 0
                      ? '0.6'
                      : '1'
                  : '1'
              }
              color={theme === 'white' ? '#FFFFFF' : disabled || inputText.length === 0 ? '#B5B9BE' : '#747679'}
            />
          )}
          <input
            id={id}
            placeholder={placeholder}
            className={cn(styles.input, {
              [styles.disabled_input_placeholder_white]: theme === 'white' && disabled === true,
              [styles.disabled_input_placeholder_dark]: theme === 'dark' && disabled === true,
              [styles.disabled_input_text_white]: theme === 'white' && disabled === true,
              [styles.disabled_input_text_dark]: theme === 'dark' && disabled === true,
              [styles.input_white]: theme === 'white',
              [styles.input_dark]: theme === 'dark'
            })}
            ref={ref}
            type={type}
            {...rest}
            value={inputText}
            onChange={onInputChange}
            autoComplete={type === 'text' ? 'off' : undefined}
          />
          {inputText && inputText.length > 0 ? (
            <InputClearIcon
              gOpacity={theme === 'white' ? (disabled ? '0.24' : '0.6') : '0.6'}
              color={theme === 'white' ? '#FFFFFF' : '#000000'}
              onClick={clearInput}
              extraClassName={cn(styles.input_clear, extraClassClearIcon)}
            />
          ) : (
            <></>
          )}
        </label>
      </div>
    )
  }
)

InputTextUI.displayName = 'InputTextUI'

export default InputTextUI
