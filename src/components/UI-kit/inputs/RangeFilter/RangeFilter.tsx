import {ConfigProvider, InputNumber, Slider} from 'antd'
import React, {ReactNode} from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

interface RangeFilterProps {
  minValue: number
  maxValue: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
  sliderRange: [number, number]
  title?: ReactNode
  isPrice?: boolean
}

const RangeFilter: React.FC<RangeFilterProps> = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  sliderRange,
  title,
  isPrice
}) => {
  const onSliderChange = (value: [number, number]) => {
    onMinChange(value[0])
    onMaxChange(value[1])
  }

  const onMinInputChange = (value: number | null) => {
    if (value !== null) {
      onMinChange(value)
    }
  }

  const onMaxInputChange = (value: number | null) => {
    if (value !== null) {
      onMaxChange(value)
    }
  }

  return (
    <div className={styles.rangeFilter}>
      {title && <h3 className={styles.rangeTitle}>{title}</h3>}
      <div className={styles.rangeInputWrap}>
        <InputNumber
          min={minValue}
          max={maxValue}
          style={{margin: '0 16px'}}
          value={minValue}
          onChange={onMinInputChange}
          className={styles.rangeInput}
          controls={false}
        />

        <ConfigProvider theme={{token: {colorPrimary: '#F47422'}}}>
          <Slider
            range
            step={isPrice ? 1 : 1}
            min={sliderRange[0]}
            max={sliderRange[1]}
            value={[minValue, maxValue]}
            onChange={onSliderChange as (value: number[]) => void}
            className={clsx(styles.rangeSlider, 'range-slider')}
          />
        </ConfigProvider>

        <InputNumber
          min={minValue}
          max={maxValue}
          style={{margin: '0 16px'}}
          value={maxValue}
          onChange={onMaxInputChange}
          className={styles.rangeInput}
          controls={false}
        />
      </div>
    </div>
  )
}

export default RangeFilter
