import styles from './style.module.scss'
import DownloadSVG from '@icon/download.svg'

const DownloadButton = () => {
  return (
    <button
      type='button'
      className={styles['download']}
      // onClick={() => sendTmrEvent('download', id, fvalue)}
    >
      <DownloadSVG />
      <div className={styles['text']}>
        <div>Скачайте буклет</div>
        <p>PDF, 4MB</p>
      </div>
    </button>
  )
}

export default DownloadButton
