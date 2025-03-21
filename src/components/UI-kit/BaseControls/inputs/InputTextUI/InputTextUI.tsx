'use client'
import {forwardRef, useCallback, useId, useState} from 'react'
import cn from 'clsx'
import styles from './InputTextUI.module.scss'
import {InputTextDefaultIcon} from './InputTextDefaultIcon'
import InputClearIcon from './InputClearIcon'
import {IField} from './InputTextUI.types'
import {Golos_Text} from 'next/font/google'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'

{
  /* <InputTextUI placeholder='Вводите...' theme='white' />

<InputTextUI placeholder='Только текст...' theme='white' onlyType='onlyText' />

<InputTextUI placeholder='Только цифры...' theme='white' onlyType='onlyNumbers' />

<InputTextUI placeholder='+7 (___) ___-__-__' theme='white' customPattern={/^\+7 \(\d{0,3}\) \d{0,3}-\d{0,2}-\d{0,2}$/} /> */
}

const golos = Golos_Text({subsets: ['cyrillic']})

interface IFieldExtended extends IField {
  onlyType?: 'all' | 'onlyText' | 'onlyNumbers'
  customPattern?: RegExp
}

const InputTextUI = forwardRef<HTMLInputElement, IFieldExtended>(
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
      onlyType = 'all',
      customPattern,
      ...rest
    },
    ref
  ) => {
    const [inputText, setInputText] = useState('')
    const id = useId()

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      let newValue = value

      // Apply onlyType filters first
      if (onlyType === 'onlyText') {
        newValue = value.replace(/[0-9]/g, '')
      } else if (onlyType === 'onlyNumbers') {
        newValue = value.replace(/[^0-9]/g, '')
      }

      if (customPattern) {
        if (customPattern.test(newValue) || newValue === '') {
          setInputText(newValue)
        } else {
          return
        }
      } else {
        setInputText(newValue)
      }

      if (rest.onChange) {
        const newEvent = {
          ...event,
          target: {
            ...event.target,
            value: newValue
          }
        }
        rest.onChange(newEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const clearInput = useCallback(() => {
      setInputText('')
      if (rest.onChange) {
        const event = {
          target: {
            value: ''
          }
        }
        rest.onChange(event as React.ChangeEvent<HTMLInputElement>)
      }
    }, [rest])

    return (
      <div className={cn(styles.input_box, extraClass, golos.className)} style={extraStyle}>
        {labelText.length > 0 && (
          <label
            className={cn(styles.label, {
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
            <ParagraphUI
              size={'md'}
              weight={'regular'}
              extraStyle={{color: error?.length ? '#D36281' : theme === 'white' ? '#fff' : '#B5B9BE'}}
              extraClass={golos.className}
            >
              {labelText}
            </ParagraphUI>
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
