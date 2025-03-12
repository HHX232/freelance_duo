import {forwardRef, useEffect, useState} from 'react'
import {CheckBoxUIProps} from './CheckBoxUI.types'
import cn from 'clsx'
import styles from './CheckBoxUI.module.scss'
import {CheckIcon} from './icons/CheckIcon'
import {DashIcon} from './icons/DashIcon'
import LinkUI from '../Typography/Link/LinkUI'
import InputText from '../Typography/Input/InputText'

const CheckBoxUI = forwardRef<HTMLInputElement, CheckBoxUIProps>(
  (
    {
      label = '',
      name,
      value,
      onChange,
      defaultChecked = false,
      error,
      extraClass,
      extraStyle,
      disabled,
      size = 'medium',
      typeMark = 'check',
      labelExtraClass,
      errorExtraClass,
      ...rest
    },
    forwardedRef
  ) => {
    const [checked, setChecked] = useState(defaultChecked)

    useEffect(() => {
      if (onChange) {
        onChange(checked)
      }
    }, [checked, onChange])

    return (
      <div
        className={cn(styles.bid_box, {
          [styles.big_box_disabled]: disabled
        })}
        onClick={() => setChecked(!checked)}
        style={{cursor: 'pointer'}}
      >
        <span className={cn(styles.checkbox_container_span)}>
          <input
            style={{display: 'none'}}
            ref={forwardedRef}
            type='checkbox'
            name={name}
            value={value}
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked)
            }}
            {...rest}
          />
          <div
            style={extraStyle}
            className={cn(
              styles.checkbox,
              {
                [styles[`checkbox_size_${size}`]]: size,
                [styles.checkbox_filled]: checked,
                [styles.checkbox_padding_large]: size === 'large',
                [styles.checkbox_padding_not_large]: size !== 'large',
                [styles.checkbox_disabled]: disabled,
                [styles.checkbox_disabled_check]: disabled && !checked,
                [styles.checkbox_error]: !!error,
                [styles.checkbox_error_checked]: !!error && checked
              },
              extraClass
            )}
          >
            {typeMark === 'check' && (
              <span
                className={cn(styles.icon_box, {
                  [styles[`icon_box_size_${size}`]]: size,
                  [styles.checked_icon_box_dis]: checked && disabled
                })}
              >
                <CheckIcon
                  width={size === 'large' ? '16' : size === 'medium' ? '12' : '9'}
                  height={size === 'large' ? '12' : size === 'medium' ? '9' : '6'}
                  fill={checked ? (disabled ? '#B5B9BE' : '#ffffff') : 'transparent'}
                />
              </span>
            )}
            {typeMark === 'dash' && (
              <span
                className={cn(styles.icon_box, {
                  [styles[`icon_box_size_${size}`]]: size,
                  [styles.checked_icon_box_dis]: checked && disabled,
                  [styles.unchecked_icon_box]: !checked && disabled
                })}
              >
                <DashIcon
                  width={size === 'large' ? '12' : size === 'medium' ? '10' : '7'}
                  height={size === 'large' ? '2' : size === 'medium' ? '1.2' : '1'}
                  fill={checked ? (disabled ? '#B5B9BE' : '#ffffff') : 'transparent'}
                />
              </span>
            )}
          </div>
          <LinkUI
            extraClass={cn(
              {[styles.label_size_small]: size === 'small', [styles.label_size_disabled]: disabled},
              labelExtraClass
            )}
            href=''
            weight='regular'
            size={size !== 'small' ? 'md' : 'xs'}
          >
            {label}
          </LinkUI>
        </span>
        <InputText
          extraClass={cn(
            styles.error_text,
            {
              [styles.error_text_big]: size === 'large',
              [styles.error_text_small]: size === 'small',
              [styles.error_text_medium]: size === 'medium'
            },
            errorExtraClass
          )}
          type='caption'
        >
          {error}
        </InputText>
      </div>
    )
  }
)

CheckBoxUI.displayName = 'Checkbox'

export default CheckBoxUI
