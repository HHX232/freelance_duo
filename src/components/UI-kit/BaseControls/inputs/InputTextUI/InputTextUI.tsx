/* eslint-disable prefer-const */
'use client'
import {forwardRef, useCallback, useEffect, useId, useRef, useState} from 'react'
import cn from 'clsx'
import styles from './InputTextUI.module.scss'
import {InputTextDefaultIcon} from './InputTextDefaultIcon'
import InputClearIcon from './InputClearIcon'
import {IField} from './InputTextUI.types'
import {Golos_Text} from 'next/font/google'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'

const golos = Golos_Text({subsets: ['cyrillic']})

interface IFieldExtended extends IField {
  onlyType?: 'all' | 'onlyText' | 'onlyNumbers'
  customPattern?: RegExp
  extraLabelClass?: string
  spacesBetwenNumbers?: boolean
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
      value = '',
      textAfterValue = '',
      spacesBetwenNumbers = false,
      ...rest
    },
    ref
  ) => {
    const [inputText, setInputText] = useState(value)
    const id = useId()
    const internalRef = useRef<HTMLInputElement | null>(null)
    const cursorPositionRef = useRef<number | null>(null)

    // Function to get the current input element
    const getInputElement = () => {
      // If a ref was passed through props, use it first
      if (ref) {
        if (typeof ref === 'function') {
          // Can't directly access the element with function refs
          return internalRef.current
        } else {
          // For RefObject
          return ref.current
        }
      }
      // Fall back to internal ref
      return internalRef.current
    }

    // Handle ref merging for React Hook Form compatibility
    const setRefs = (element: HTMLInputElement | null) => {
      // Update our internal ref
      internalRef.current = element

      // Forward to the external ref
      if (ref) {
        if (typeof ref === 'function') {
          ref(element)
        } else {
          ref.current = element
        }
      }
    }

    // Function to add spaces between groups of three digits
    const addSpaces = (value: string) => {
      if (!spacesBetwenNumbers) return value
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    // Function to remove spaces (used when processing input value)
    const removeSpaces = (value: string) => {
      return value.replace(/\s/g, '')
    }

    // Calculate how many spaces were added by formatting up to a specific position
    const countAddedSpacesUpToPosition = (original: string, _formatted: string, position: number) => {
      if (position <= 0) return 0

      let originalSubstring = original.substring(0, position)
      let spacesInOriginal = (originalSubstring.match(/\s/g) || []).length

      // Find how long this substring would be after formatting
      let formattedSubstring = addSpaces(removeSpaces(originalSubstring))
      let spacesInFormatted = (formattedSubstring.match(/\s/g) || []).length

      return spacesInFormatted - spacesInOriginal
    }

    // Update inputText when value prop changes
    useEffect(() => {
      if (spacesBetwenNumbers && onlyType === 'onlyNumbers') {
        const cleanValue = removeSpaces(value.toString())
        setInputText(addSpaces(cleanValue))
      } else {
        setInputText(value.toString())
      }
    }, [value, spacesBetwenNumbers, onlyType])

    // Restore cursor position after state update
    useEffect(() => {
      if (cursorPositionRef.current !== null) {
        const inputElement = getInputElement()
        if (inputElement) {
          // Ensure cursor position doesn't go beyond the actual input text
          const position = Math.min(cursorPositionRef.current, inputText.length)
          inputElement.setSelectionRange(position, position)
          cursorPositionRef.current = null
        }
      }
    }, [inputText])

    // Handle mouse clicks to fix cursor positioning with textAfterValue
    const handleMouseUpOrClick = (event: React.MouseEvent<HTMLInputElement>) => {
      if (!textAfterValue) return

      const cursorPosition = event.currentTarget.selectionStart
      const inputWithoutSuffix = inputText

      // If cursor is placed within or after the suffix, move it to the end of the input content
      if (cursorPosition !== null && cursorPosition >= inputWithoutSuffix.length) {
        event.currentTarget.setSelectionRange(inputWithoutSuffix.length, inputWithoutSuffix.length)
      }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = inputText + textAfterValue
      const newValue = event.target.value

      // Save current cursor position
      const cursorPosition = event.target.selectionStart

      // Special handling for deletion near textAfterValue
      if (textAfterValue && currentValue.length > newValue.length) {
        // Check if we're attempting to delete within or around the suffix
        const suffixStartPosition = inputText.length

        // If deletion happens at the beginning of or within suffix
        if (cursorPosition !== null && cursorPosition >= suffixStartPosition) {
          // User is trying to delete something in the suffix area
          // We should delete from the actual input text instead
          if (inputText.length > 0) {
            const newInputText = inputText.slice(0, -1)
            setInputText(newInputText)
            cursorPositionRef.current = newInputText.length

            if (rest.onChange) {
              const valueToEmit =
                spacesBetwenNumbers && onlyType === 'onlyNumbers' ? removeSpaces(newInputText) : newInputText

              const newEvent = {
                ...event,
                target: {
                  ...event.target,
                  value: valueToEmit
                }
              }
              rest.onChange(newEvent as React.ChangeEvent<HTMLInputElement>)
            }
            return
          }
        }
      }

      let valueWithoutSuffix = newValue
      // Remove the suffix if it exists at the end
      if (textAfterValue && newValue.endsWith(textAfterValue)) {
        valueWithoutSuffix = newValue.slice(0, newValue.length - textAfterValue.length)
      } else if (textAfterValue && newValue.includes(textAfterValue)) {
        // Handle the case where the suffix might be in the middle if user typed after it
        const suffixIndex = newValue.indexOf(textAfterValue)
        valueWithoutSuffix = newValue.slice(0, suffixIndex) + newValue.slice(suffixIndex + textAfterValue.length)
      }

      let processedValue = valueWithoutSuffix

      // Remove spaces for processing if handling number formatting
      const valueForProcessing =
        spacesBetwenNumbers && onlyType === 'onlyNumbers' ? removeSpaces(valueWithoutSuffix) : valueWithoutSuffix

      // Apply onlyType filters
      if (onlyType === 'onlyText') {
        processedValue = valueForProcessing.replace(/[0-9]/g, '')
      } else if (onlyType === 'onlyNumbers') {
        const cleaned = valueForProcessing.replace(/[^0-9]/g, '')

        // Calculate cursor position adjustment before formatting
        if (cursorPosition !== null && spacesBetwenNumbers) {
          // Store original text for comparison
          const originalValue = inputText
          const originalCleaned = removeSpaces(originalValue)

          // Calculate new cursor position
          const cleanedBeforeCursor = valueForProcessing.substring(0, cursorPosition).replace(/[^0-9]/g, '')
          cursorPositionRef.current = cleanedBeforeCursor.length

          // Adjust cursor position for added/removed spaces
          if (cleaned.length > originalCleaned.length) {
            // Text was added
            const newFormattedValue = addSpaces(cleaned)
            const spacesAdded = countAddedSpacesUpToPosition(cleaned, newFormattedValue, cursorPositionRef.current)
            cursorPositionRef.current += spacesAdded
          } else {
            // Text was removed or replaced
            const newFormattedValue = addSpaces(cleaned)
            const spacesAdded = countAddedSpacesUpToPosition(cleaned, newFormattedValue, cursorPositionRef.current)
            cursorPositionRef.current += spacesAdded
          }
        }

        processedValue = spacesBetwenNumbers ? addSpaces(cleaned) : cleaned
      } else {
        processedValue = valueForProcessing
      }

      if (customPattern) {
        if (customPattern.test(processedValue) || processedValue === '') {
          setInputText(processedValue)
        } else {
          return
        }
      } else {
        // Preserve cursor position relative to the text content
        if (cursorPosition !== null && !spacesBetwenNumbers) {
          // For basic inputs without special formatting
          cursorPositionRef.current = Math.min(cursorPosition, processedValue.length)
        }

        setInputText(processedValue)
      }

      if (rest.onChange) {
        // For the onChange handler, we need to decide whether to pass the formatted or raw value
        // If spacesBetwenNumbers is true, we pass the raw value without spaces
        const valueToEmit =
          spacesBetwenNumbers && onlyType === 'onlyNumbers' ? removeSpaces(processedValue) : processedValue

        const newEvent = {
          ...event,
          target: {
            ...event.target,
            value: valueToEmit
          }
        }
        rest.onChange(newEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const clearInput = useCallback(() => {
      setInputText('')
      cursorPositionRef.current = 0

      if (rest.onChange) {
        const event = {
          target: {
            value: ''
          }
        }
        rest.onChange(event as React.ChangeEvent<HTMLInputElement>)
      }
    }, [rest])

    // Handle keyboard navigation that might place cursor in the suffix area
    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!textAfterValue) return

      const cursorPosition = event.currentTarget.selectionStart
      // If cursor is placed within or after the suffix, move it to the end of the input content
      if (cursorPosition !== null && cursorPosition > inputText.length) {
        event.currentTarget.setSelectionRange(inputText.length, inputText.length)
      }
    }

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
            ref={setRefs}
            type={type}
            {...rest}
            value={inputText + textAfterValue}
            onChange={onInputChange}
            onMouseUp={handleMouseUpOrClick}
            onKeyUp={handleKeyUp}
            onClick={handleMouseUpOrClick}
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
