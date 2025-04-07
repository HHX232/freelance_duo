import {forwardRef, useId} from 'react'
import {CheckBoxUIProps} from './CheckBoxUI.types'
import cn from 'clsx'
import styles from './CheckBoxUI.module.scss'
import {CheckIcon} from './icons/CheckIcon'
import {DashIcon} from './icons/DashIcon'
import LinkUI from '../../Text-Elements/Typography/Link/LinkUI'


const CheckBoxUI = forwardRef<HTMLInputElement, CheckBoxUIProps>(
  (
    {
      children,
      error,
      extraClass,
      extraStyle,
      uiSize = 'lg',
      typeMark = 'check',
      labelExtraClass,
      errorExtraClass,
      ...rest
    },
    forwardedRef
  ) => {
    const id = useId()
    const checkboxId = `${CheckBoxUI.displayName}-${id}`

    return (
      <div
        className={cn(styles.checkbox, extraClass, styles[`size-${uiSize}`], {[styles.hasError]: !!error?.length})}
        style={extraStyle}
      >
        <input id={checkboxId} type='checkbox' ref={forwardedRef} {...rest} />

        <label htmlFor={checkboxId} className={labelExtraClass}>
          <div className={styles.button}>
            <div className={styles.icon}>{typeMark === 'check' ? <CheckIcon /> : <DashIcon />}</div>
          </div>
          <LinkUI size={uiSize === 'sm' ? 'xs' : 'md'} weight={'regular'}>
            {children}
          </LinkUI>
        </label>
        <LinkUI extraClass={cn(styles.error, errorExtraClass)} size={uiSize === 'sm' ? 'xs' : 'md'} weight={'regular'}>
          {error}
        </LinkUI>
      </div>
    )
  }
)

CheckBoxUI.displayName = 'Checkbox'

export default CheckBoxUI
