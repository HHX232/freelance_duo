'use client'

import styles from './Scheme.module.scss'
import DownloadSVG from '@icon/download.svg'
import SchemeIcon from '@icon/scheme.svg'
import SchemeDesctop from '@icon/scheme_desctop.svg'
import {useIsLg} from '@utils/useIsMobile'

const Scheme = () => {
  const isLg = useIsLg();

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
              <div>Скачайте схему паркинга</div>
              <p>PDF, 4MB</p>
            </div>
          </button>
        </div>
      </div>
      <div className={styles.schemeWrapper}>{isLg ? <SchemeIcon className={styles.icon} /> : <SchemeDesctop /> }</div>
    </div>
  )
}

export default Scheme
