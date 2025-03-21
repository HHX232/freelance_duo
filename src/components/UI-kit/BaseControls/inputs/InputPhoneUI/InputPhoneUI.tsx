'use client'
import {ChangeEvent, ChangeEventHandler, forwardRef, useCallback, useId, useState} from 'react'
import cn from 'clsx'
import styles from './InputPhoneUI.module.scss'
import {InputTextDefaultIcon} from './InputPhoneDefaultIcon'
import InputClearIcon from './InputClearIcon'
import {IField} from './InputPhoneUI.types'
import {Golos_Text} from 'next/font/google'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'
import {formatPhoneNumber} from '@src/lib/utils/auth/phone-mask.helper'

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

const InputPhoneUI = forwardRef<HTMLInputElement, IFieldExtended>(
  (
    {
      labelText = '',
      error,
      extraClass,
      extraStyle,
      icon,
      extraClassClearIcon,
      disabled = false,
      theme,
      placeholder = '+7 (___) ___-__-__',
      ...rest
    },
    ref
  ) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const id = useId()

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatPhoneNumber(e.target.value)
      setPhoneNumber(formattedValue)
    }

    const clearInput = useCallback(() => {
      setPhoneNumber('')
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
                    ? phoneNumber.length === 0
                      ? '0.4'
                      : '0.6'
                    : phoneNumber.length === 0
                      ? '0.6'
                      : '1'
                  : '1'
              }
              color={theme === 'white' ? '#FFFFFF' : disabled || phoneNumber.length === 0 ? '#B5B9BE' : '#747679'}
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
            type={'text'}
            {...rest}
            value={phoneNumber}
            onChange={onInputChange}
            autoComplete={'off'}
          />
          {phoneNumber && phoneNumber.length > 0 ? (
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

InputPhoneUI.displayName = 'InputPhoneUI'

export default InputPhoneUI
