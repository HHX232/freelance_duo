import React from 'react'
import styles from './Scheme.module.scss'
import DownloadSVG from '@icon/download.svg'
import SchemeIcon from '@icon/scheme.svg'

const Scheme = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.title}>Схема типового этажа</div>
        <div className={styles['download-wrapper']}>
          <button
            type='button'
            className={styles['download']}
            // onClick={() => sendTmrEvent('download', id, fvalue)}
          >
            <DownloadSVG />
            <div className={styles['text']}>
              <h4>Скачайте схему паркинга</h4>
              <p>PDF, 4MB</p>
            </div>
          </button>
        </div>
      </div>
      <div className={styles.schemeWrapper}>
        <SchemeIcon className={styles.icon} />
      </div>
    </div>
  )
}

export default Scheme
