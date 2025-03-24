import React, {useState, useRef, useEffect} from 'react'
import styles from './SelectInput.module.scss'
import cn, {clsx} from 'clsx'
import RadioUI from '../../RadioUI/RadioUI'
import CheckBoxUI from '../../CheckBoxUI/CheckBoxUI'
import {Golos_Text} from 'next/font/google'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'

const golos = Golos_Text({subsets: ['cyrillic']})

interface SelectOption {
  value: string
  label: string
}

// ! Не использовать CustomSelect, используйте CustomSelectWithDropdown
interface CustomSelectProps {
  options: SelectOption[]
  value?: string
  values?: string[]
  onChange?: (value: string) => void
  onMultipleChange?: (value: string[]) => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
  selectClassName?: string
  optionClassName?: string
  placeholder?: string
  disabled?: boolean
  name?: string
  required?: boolean
  id?: string
  theme?: 'white' | 'dark'
  error?: string
  labelTopText?: string
  dropdownDirection?: 'down' | 'up'
  multiple?: boolean
}

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      options,
      value,
      onChange,
      leftIcon,
      rightIcon,
      containerClassName = '',
      selectClassName = '',
      optionClassName = '',
      placeholder,
      disabled,
      name,
      required,
      id
      // theme,
      // error
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLSelectElement>(null)

    // Handle forwarded ref properly
    React.useImperativeHandle(ref, () => selectRef.current as HTMLSelectElement)

    // Handle the native select onChange
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value)
    }

    // Custom dropdown toggle (visual only)
    const toggleCustomDropdown = () => {
      if (disabled) return
      setIsOpen(!isOpen)
      // Trigger the native select dropdown when our custom UI is clicked
      if (selectRef.current) {
        if (!isOpen) {
          selectRef.current.focus()
        }
      }
    }

    // Listen for blur on the select to close our visual open state
    const handleBlur = () => {
      setIsOpen(false)
    }

    // Get the currently selected option for display
    const selectedOption = options.find((option) => option.value === value)

    return (
      <div
        className={clsx(
          styles.selectContainer,
          containerClassName,
          {[styles.selectDisabled]: disabled},
          golos.className
        )}
      >
        {/* Custom styled select appearance */}
        <div
          className={`${styles.selectStyled} ${selectClassName} ${isOpen ? styles.selectOpen : ''}`}
          onClick={toggleCustomDropdown}
        >
          {/* Left Icon */}
          {leftIcon && <div className={styles.selectIconLeft}>{leftIcon}</div>}

          {/* Selected Option Text */}
          <div className={styles.selectValue} data-placeholder={placeholder || 'Select an option'}>
            {selectedOption?.label || ''}
          </div>

          {/* Right Icon/Arrow */}
          <div className={styles.selectIconRight}>
            {rightIcon || (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={`${styles.selectArrow} ${isOpen ? styles.selectArrowUp : ''}`}
              >
                <polyline points='6 9 12 15 18 9'></polyline>
              </svg>
            )}
          </div>
        </div>

        <select
          ref={selectRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.selectHidden}
          aria-hidden='false'
          disabled={disabled}
          name={name}
          required={required}
          id={id}
        >
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value} className={optionClassName}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

CustomSelect.displayName = 'CustomSelect'

// ! Используется
const CustomSelectWithDropdown: React.FC<CustomSelectProps> = ({
  options,
  value,
  values = [],
  onChange,
  onMultipleChange = () => {},
  leftIcon,
  rightIcon,
  containerClassName,
  selectClassName,
  optionClassName,
  placeholder,
  disabled = false,
  theme = 'white',
  error,
  labelTopText = '',
  dropdownDirection = 'down',
  multiple
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [selectedValues, setSelectedValues] = useState<string[]>(values)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue)
    }

    setIsDropdownOpen(false)
  }

  const handleMultipleSelect = (optionValue: string) => {
    setSelectedValues((v) => {
      if (v.includes(optionValue)) {
        v = v.filter((prevValue) => prevValue !== optionValue)
      } else {
        v = [...v, optionValue]
      }

      onMultipleChange(v)
      return v
    })
  }

  const selectedOption = options.find((opt) => opt.value === value)
  const hasError: boolean = !!error?.length

  return (
    <div
      ref={dropdownRef}
      className={cn(styles.selectWithDropdown, containerClassName, {
        [styles.selectDisabled]: disabled,
        [styles.selectWhiteTheme]: theme === 'white',
        [styles.selectDarkTheme]: theme === 'dark',
        [styles.selectWhiteError]: hasError,
        [styles.directionUp]: dropdownDirection === 'up'
      })}
    >
      <label
        className={cn({
          [styles.disabled_top_label_white]: theme === 'white' && disabled === true,
          [styles.disabled_top_label_white_error]: hasError && theme === 'white' && disabled === true,
          [styles.disabled_top_label_dark]: theme === 'dark' && disabled === true,
          [styles.disabled_top_label_dark_error]: hasError && theme === 'dark' && disabled === true,
          [styles.top_label_white_error]: theme === 'white' && hasError,
          [styles.top_label_dark_error]: theme === 'dark' && hasError,
          [styles.top_label_white]: theme === 'white',
          [styles.top_label_dark]: theme === 'dark'
        })}
      >
        <ParagraphUI
          size={'md'}
          weight={'regular'}
          extraStyle={{color: theme === 'white' ? '#fff' : '#555'}}
          extraClass={golos.className}
        >
          {labelTopText}
        </ParagraphUI>
      </label>

      <div
        className={cn(styles.selectStyled, selectClassName, {
          [styles.selectOpen]: isDropdownOpen,
          [styles.selectWhiteHover]: theme === 'white' && !disabled && !isDropdownOpen,
          [styles.selectWhiteFocus]: isDropdownOpen && theme === 'white'
        })}
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
      >
        {leftIcon && (
          <div className={cn(styles.selectIconLeft, selectedOption?.value ? styles.iconWhite : '')}>{leftIcon}</div>
        )}

        <div className={styles.selectValue} data-placeholder={placeholder || 'Select an option'}>
          {selectedOption?.label || ''}
        </div>

        <div className={styles.selectIconRight}>
          {rightIcon || (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke={theme === 'white' ? '#FFFFFF' : '#747679'}
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={cn(styles.selectArrow, {[styles.selectArrowUp]: isDropdownOpen})}
            >
              <polyline points='6 9 12 15 18 9'></polyline>
            </svg>
          )}
        </div>
      </div>

      {isDropdownOpen && !disabled && (
        <div className={styles.selectDropdownContainer}>
          <div className={styles.selectDropdown}>
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(styles.selectOption, optionClassName, {
                  [styles.selectOptionSelected]: option.value === value
                })}
              >
                {multiple ? (
                  <CheckBoxUI
                    uiSize={'md'}
                    typeMark='check'
                    value={option.value}
                    onChange={() => handleMultipleSelect(option.value)}
                    checked={selectedValues.includes(option.value)}
                  >
                    {option.label}
                  </CheckBoxUI>
                ) : (
                  <RadioUI
                    onChange={() => handleSelect(option.value)}
                    value={option.value}
                    checked={option.value === value}
                  >
                    {option.label}
                  </RadioUI>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

CustomSelectWithDropdown.displayName = 'CustomSelectWithDropdown'

export default CustomSelectWithDropdown

// const SelectExample = () => {
//    const [selectedValue, setSelectedValue] = useState('')
//    const [isDisabled, setIsDisabled] = useState(false)
//    const [hasError, setHasError] = useState(false)

//    const options = [
//      {value: 'option1', label: 'Option 1'},
//      {value: 'option2', label: 'Option 2'},
//      {value: 'option3', label: 'Option 3'},
//      {value: 'option4', label: 'Option 4'},
//      {value: 'option5', label: 'Option 5'},
//      {value: 'option6', label: 'Option 6'},
//      {value: 'option7', label: 'Option 7'},
//      {value: 'option8', label: 'Option 8'},
//      {value: 'option9', label: 'Option 9'},
//      {value: 'option10', label: 'Option 10'},
//      {value: 'option11', label: 'Option 11'},
//      {value: 'option12', label: 'Option 12'},
//      {value: 'option13', label: 'Option 13'},
//      {value: 'option14', label: 'Option 14'},
//      {value: 'option15', label: 'Option 15'}
//    ]

//    const LeftIcon = () => (
//      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
//        <circle cx='12' cy='12' r='10' />
//      </svg>
//    )

//    const renderCheckbox = (isChecked: boolean) => (
//      <CheckBoxUI defaultChecked={isChecked} size='medium' typeMark='check' theme='dark' />
//    )

//    return (
//      <div style={{maxWidth: '400px', padding: '20px', background: '#11627D'}}>
//        <h3 style={{color: '#FFF', marginBottom: '20px'}}>Custom Select Demo</h3>

//        <div style={{marginBottom: '30px'}}>
//          <h2>{selectedValue}</h2>
//          <CustomSelectWithDropdown
//            error='rer'
//            theme='white'
//            options={options}
//            labelTopText={'Hi'}
//            value={selectedValue}
//            onChange={setSelectedValue}
//            placeholder='Select option'
//            leftIcon={<LeftIcon />}
//            renderCheckbox={renderCheckbox}
//          />
//        </div>

//        {/* Пример с ошибкой */}
//        <div style={{marginBottom: '30px'}}>
//          <CustomSelectWithDropdown
//            theme='white'
//            options={options}
//            value={selectedValue}
//            onChange={setSelectedValue}
//            error={hasError.toString()}
//            placeholder='With error state'
//          />
//          <button onClick={() => setHasError(!hasError)} style={{marginTop: '10px', color: '#FFF'}}>
//            Toggle Error
//          </button>
//        </div>

//        {/* Отключенное состояние */}
//        <div style={{marginBottom: '30px'}}>
//          <CustomSelectWithDropdown
//            theme='white'
//            options={options}
//            value={selectedValue}
//            onChange={setSelectedValue}
//            disabled={true}
//            placeholder='Disabled state'
//          />
//          <button onClick={() => setIsDisabled(!isDisabled)} style={{marginTop: '10px', color: '#FFF'}}>
//            Toggle Disabled
//          </button>
//        </div>

//        {/* Пример с кастомной стрелкой */}
//        <CustomSelectWithDropdown
//          theme='white'
//          options={options}
//          value={selectedValue}
//          onChange={setSelectedValue}
//          placeholder='Custom arrow'
//          rightIcon={
//            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#FFF' strokeWidth='3'>
//              <path d='M6 9l6 6 6-6' />
//            </svg>
//          }
//        />
//      </div>
//    )
//  }

// <div style={{backgroundColor: '#11627D', padding: '20px', margin: '20px', width: '300px', height: '300px'}}>
// {/* <CheckmarkDemo /> */}
// <SelectExample />
// </div>
