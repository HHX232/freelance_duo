import styles from './SwitchUI.module.scss'
import {forwardRef, useId} from 'react'
import {ISwitchUIProps} from './SwitchUI.types'
import clsx from 'clsx'
import LinkUI from '../../Text-Elements/Typography/Link/LinkUI'

const SwitchUI = forwardRef<HTMLInputElement, ISwitchUIProps>(
  ({type = 'checkbox', uiSize = 'lg', error, children, extraClass, extraStyles, ...rest}, forwardedRef) => {
    const uid = useId()
    const switchId = `${SwitchUI.displayName}-${uid}`

    return (
      <div
        ref={forwardedRef}
        className={clsx(styles.switch, styles[`size-${uiSize}`], error?.length ? styles.hasError : '', extraClass)}
        style={extraStyles}
      >
        <input id={switchId} type={type} {...rest} />
        <label htmlFor={switchId}>
          <div className={styles.button}>
            <div className={styles.circle}></div>
          </div>
          <LinkUI size={uiSize === 'sm' ? 'xs' : 'md'} weight={'regular'}>
            {children}
          </LinkUI>
        </label>

        <LinkUI extraClass={styles.error} size={'sm'} weight={'regular'}>
          {error}
        </LinkUI>
      </div>
    )
  }
)

SwitchUI.displayName = 'Switch'

export default SwitchUI
