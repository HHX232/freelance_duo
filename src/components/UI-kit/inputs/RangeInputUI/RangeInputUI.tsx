'use client'
import {forwardRef, useCallback, useId, useState, useRef, useEffect} from 'react'
import cn from 'clsx'
import styles from './RangeInputUI.module.scss'
import {InputTextDefaultIcon as InputRangeDefaultIcon} from './InputRangeDefaultIcon'
import InputClearIcon from './InputClearIcon'
import {IField} from './RangeUI.types'
import {Golos_Text} from 'next/font/google'

const golos = Golos_Text({subsets: ['cyrillic']})

const InputRangeUI = forwardRef<HTMLInputElement, IField>(
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
      minValue = 0,
      maxValue = 100,
      textAfterValue = '',
      ...rest
    },
    ref
  ) => {
    const [inputText, setInputText] = useState('')
    const [rangeValue, setRangeValue] = useState(maxValue)
    const id = useId()
    const textInputRef = useRef<HTMLInputElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value)
      console.log(inputText)
    }

    const onRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value)
      setRangeValue(newValue)
      setInputText(newValue.toString())
      updateProgressWidth(newValue)
    }

    const updateProgressWidth = (value: number) => {
      if (progressRef.current) {
        const percentage = ((value - minValue) / (maxValue - minValue)) * 100
        progressRef.current.style.width = `${percentage}%`
      }
    }

    const clearInput = useCallback(() => {
      setInputText('')
      setRangeValue(minValue)
      if (progressRef.current) {
        progressRef.current.style.width = '0%'
      }
    }, [minValue])

    // Set initial values
    useEffect(() => {
      setInputText(maxValue.toString())
      updateProgressWidth(maxValue)
    }, [maxValue, minValue])

    return (
      <div className={cn(styles.input_box, extraClass, golos.className)} style={extraStyle}>
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
        <div className={styles.input_wrapper}>
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
              <InputRangeDefaultIcon
                opacity={
                  theme === 'white'
                    ? disabled
                      ? inputText.length === 0 || Number(rangeValue) === minValue
                        ? '0.4'
                        : '0.6'
                      : inputText.length === 0 || Number(rangeValue) === minValue
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
              ref={textInputRef}
              type={type}
              {...rest}
              disabled={true}
              value={inputText + textAfterValue}
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
          <div
            className={cn(styles.range_container, {
              [styles.range_container_disabled]: disabled
            })}
          >
            <div className={styles.range_track}>
              <div
                className={cn(styles.left_circle, {
                  [styles.left_dark]: theme === 'dark',
                  [styles.left_dark_disabled]: theme === 'dark' && disabled
                })}
              ></div>

              {/* Progress background */}
              <div
                ref={progressRef}
                className={cn(styles.range_progress, {
                  [styles.range_progress_white]: theme === 'white',
                  [styles.range_progress_dark]: theme === 'dark',
                  [styles.range_progress_disabled]: disabled
                })}
              ></div>
              <input
                ref={ref}
                type='range'
                min={minValue}
                max={maxValue}
                value={rangeValue}
                onChange={onRangeChange}
                className={cn(styles.range_input, {
                  [styles.range_input_white]: theme === 'white',
                  [styles.range_input_dark]: theme === 'dark',
                  [styles.range_input_disabled]: disabled
                })}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

InputRangeUI.displayName = 'InputRangeUI'

export default InputRangeUI
