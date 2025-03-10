import styles from './progressBar.module.scss'
import React, {FC} from 'react'

interface ProgressBarProps {
  styleContainer?: React.CSSProperties,
  progress?: number | string,
}

const ProgressBar: FC<ProgressBarProps> =({styleContainer, progress}) => {

  return (
    <div className={styles.wrapper} style={styleContainer}>
      <div className={styles.progress} style={{width: progress}}></div>
    </div>
  )
}

export default ProgressBar
