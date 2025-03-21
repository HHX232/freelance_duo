import {forwardRef, useId} from 'react'
import styles from './RadioUI.module.scss'
import {IRadioUIProps} from './RadioUI.types'
import clsx from 'clsx'
import LinkUI from '../../Text-Elements/Typography/Link/LinkUI'

const RadioUI = forwardRef<HTMLInputElement, IRadioUIProps>(
  ({children, error, uiSize = 'lg', extraClass, extraStyles, ...rest}, forwardedRef) => {
    const uid = useId()
    const radioId = `${RadioUI.displayName}-${uid}`

    return (
      <div
        className={clsx(styles.radio, styles[`size-${uiSize}`], extraClass, error?.length ? styles.hasError : '')}
        style={extraStyles}
      >
        <input id={radioId} type='radio' ref={forwardedRef} {...rest} />

        <label htmlFor={radioId}>
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
