import {forwardRef, useId} from 'react'
import styles from './RadioUI.module.scss'
import {RadioUIProps} from './RadioUI.types'
import clsx from 'clsx'
import LinkUI from '../Typography/Link/LinkUI'

const RadioUI = forwardRef<HTMLInputElement, RadioUIProps>(
  ({children, error, uiSize = 'lg', extraClass, extraStyles, ...rest}, forwardedRef) => {
    const uid = useId()
    const inputId = `${RadioUI.displayName}-${uid}`

    return (
      <div
        className={clsx(styles.radio, styles[`size-${uiSize}`], extraClass, error?.length ? styles.hasError : '')}
        style={extraStyles}
      >
        <input id={inputId} type='radio' ref={forwardedRef} {...rest} />

        <label htmlFor={inputId}>
          <div className={styles.button} />
          <LinkUI size={uiSize === 'sm' ? 'xs' : 'md'} weight={'regular'}>
            {children}
          </LinkUI>
        </label>

        <LinkUI extraClass={styles.error} size={'xs'} weight={'regular'}>
          {error}
        </LinkUI>
      </div>
    )
  }
)

RadioUI.displayName = 'Radio'

export default RadioUI
