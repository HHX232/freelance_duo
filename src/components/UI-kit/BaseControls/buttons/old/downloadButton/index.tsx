import styles from './style.module.scss'
import DownloadSVG from '@icon/download.svg'
import {FC} from 'react'

interface Props {
  text?: string
}

const DownloadButton: FC<Props> = (props) => {
  const {text = 'Скачайте буклет'} = props

  return (
    <button type='button' className={styles['download']}>
      <DownloadSVG />
      <div className={styles['text']}>
        <div>{text}</div>
        <p>PDF, 4MB</p>
      </div>
    </button>
  )
}

export default DownloadButton
