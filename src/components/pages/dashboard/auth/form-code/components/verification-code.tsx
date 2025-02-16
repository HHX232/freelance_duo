import {
  ChangeEvent,
  ClipboardEvent,
  createRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import styles from './verification-code.module.scss'

export interface VerificationCodeProps {
  autoFocus?: boolean
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  length: number
  onChange?: (data: string) => void
  onCompleted?: (data: string) => void
  placeholder?: string
  type?: 'alphanumeric' | 'number'
  value?: string
}

const VerificationCode = ({
  autoFocus = false,
  inputProps,
  length = 4,
  onChange = () => null,
  onCompleted = () => null,
  placeholder = '',
  type = 'number',
  value: defaultValue = ''
}: VerificationCodeProps) => {
  const fillValues = (value: string | undefined, length: number) => {
    if (!value) {
      return new Array(length).fill('')
    }
    return new Array(length).fill('').map((_, index) => value[index] ?? '')
  }

  const [values, setValues] = useState(() => fillValues(defaultValue, 4))
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const inputsRefs = useMemo(() => new Array(length).fill(null).map(() => createRef<HTMLInputElement>()), [length])

  const validate = (input: string) => {
    if (type === 'number') {
      return /^\d/.test(input)
    }

    if (type === 'alphanumeric') {
      return /^[a-zA-Z0-9]/.test(input)
    }

    return true
  }

  const selectInputContent = (index: number) => {
    const input = inputsRefs[index].current

    if (input) {
      requestAnimationFrame(() => {
        input.select()
      })
    }
  }

  const setValue = (value: string, index: number) => {
    const nextValues = [...values]
    nextValues[index] = value

    setValues(nextValues)

    const stringifiedValues = nextValues.join('')
    const isCompleted = stringifiedValues.length === length

    if (isCompleted) {
      if (onCompleted) {
        onCompleted(stringifiedValues)
      }
      return
    }

    if (onChange) {
      onChange(stringifiedValues)
    }
  }

  const focusInput = useCallback(
    (index: number) => {
      const input = inputsRefs[index]?.current

      if (input) {
        requestAnimationFrame(() => {
          input.focus()
        })
      }
    },
    [inputsRefs]
  )

  const blurInput = (index: number) => {
    const input = inputsRefs[index]?.current

    if (input) {
      requestAnimationFrame(() => {
        input.blur()
      })
    }
  }

  const onInputFocus = (index: number) => {
    const input = inputsRefs[index]?.current

    if (input) {
      setFocusedIndex(index)
      selectInputContent(index)
    }
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const eventValue = event.target.value
    const value = eventValue.replace(values[index], '')

    if (!validate(value)) {
      selectInputContent(index)
      return
    }

    if (value.length > 1) {
      setValues(fillValues(eventValue, length))

      const isCompleted = eventValue.length === length

      if (isCompleted) {
        if (onCompleted) {
          onCompleted(eventValue)
        }
        blurInput(index)
        return
      }

      return
    }

    setValue(value, index)

    if (index === length - 1) {
      blurInput(index)
      return
    }

    focusInput(index + 1)
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    const eventKey = event.key

    if (eventKey === 'Backspace' || eventKey === 'Delete') {
      event.preventDefault()

      setValue('', focusedIndex)
      focusInput(index - 1)

      return
    }

    if (eventKey === values[index]) {
      focusInput(index + 1)
    }
  }

  const onInputPaste = (event: ClipboardEvent<HTMLInputElement>, index: number) => {
    event.preventDefault()

    const pastedValue = event.clipboardData.getData('text')
    const nextValues = pastedValue.slice(0, length)

    if (!validate(nextValues)) {
      return
    }

    setValues(fillValues(nextValues, length))

    const isCompleted = nextValues.length === length

    if (isCompleted) {
      if (onCompleted) {
        onCompleted(nextValues)
      }
      blurInput(index)
      return
    }

    focusInput(nextValues.length)
  }

  useEffect(() => {
    if (autoFocus) {
      focusInput(0)
    }
  }, [autoFocus, focusInput, inputsRefs])

  return (
    <div className={styles.code_container}>
      {inputsRefs.map((ref, i) => (
        <input
          autoComplete='one-time-code'
          className={styles.code_item}
          key={i}
          onChange={(event) => onInputChange(event, i)}
          onFocus={() => onInputFocus(i)}
          onKeyDown={(event) => onInputKeyDown(event, i)}
          onPaste={(event) => onInputPaste(event, i)}
          placeholder={placeholder}
          ref={ref}
          value={values[i]}
          {...inputProps}
          inputMode='numeric'
        />
      ))}
    </div>
  )
}

export default VerificationCode
