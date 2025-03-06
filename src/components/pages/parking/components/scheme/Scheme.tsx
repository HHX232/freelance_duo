'use client'

import styles from './Scheme.module.scss'
import SchemeIcon from '@icon/scheme.svg'
import SchemeDesctop from '@icon/scheme_desctop.svg'
import SchemeXXXL from '@icon/scheme_xxxl.svg'
import {useIsLg, useIsMinWidth} from '@utils/useIsMobile'
import DownloadButton from '@shared/downloadButton'

const Scheme = () => {
  const isLg = useIsMinWidth(1024);
  const isXXXL = useIsMinWidth(1920);
  const isXl = useIsLg();

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.title}>Схема типового этажа</div>
        <div className={styles['download-wrapper']}>
          <DownloadButton/>
        </div>
      </div>
      <div className={styles.schemeWrapper}>{isXl ? isLg ? <SchemeIcon className={styles.icon}/> : <SchemeIcon className={styles.icon} /> : isXXXL ? <SchemeXXXL className={styles.icon}/> : <SchemeDesctop /> }</div>
    </div>
  )
}

export default Scheme
