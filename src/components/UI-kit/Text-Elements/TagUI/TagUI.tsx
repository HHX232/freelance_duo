import {FC} from 'react'
import {ITagUIProps} from './TagUI.types'
import cn from 'clsx'
import styles from './TagUI.module.scss'

const TagUI: FC<ITagUIProps> = ({
  color = 'dark',
  text,
  extraClass,
  extraStyle,
  circleContain = true,
  size = 'large'
}) => {
  return (
    <div className={cn(styles.tag, styles[`tag_${color}`], styles[`tag_size_${size}`], extraClass)} style={extraStyle}>
      {circleContain ? <span className={styles.tag__circle}></span> : null}
      <span className={styles.tag__text}>{text}</span>
    </div>
  )
}

export default TagUI
