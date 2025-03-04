import styles from './design.module.scss'
import Lamp from '@icon/lamp.svg'
import Cursor from '@icon/cursor.svg'
import Rubick from '@icon/rubick.svg'
import Shower from '@icon/shower.svg'
import Guard from '@icon/guard.svg'

const Design = () => {
  return (
    <div className={styles['block-wrapper']}>
      <div className={styles['title-wrapper']}>
        <div className={styles['title']}>Внутреннее оформление</div>
      </div>

      <div className={styles['tiles-wrapper']}>
        <div className={styles['first-line']}>
          <div className={`${styles['tile']} ${styles['bg1']}`}>
            <Lamp />
            <div>Централизованное освещение</div>
          </div>
          <div className={`${styles['tile']} ${styles['bg2']}`}>
            <Cursor />
            <div>Цементная стяжка с противоскользящим покрытием</div>
          </div>
        </div>
        <div className={styles['second-line']}>
          <div className={styles['tile']}>
            <Rubick />
            <div>Металлическая сетка и бетонные панели</div>
          </div>
          <div className={styles['tile']}>
            <Shower />
            <div>Потолок без отделки</div>
          </div>
          <div className={`${styles['tile']} ${styles['bg5']}`}>
            <Guard />
            <div>Усиленные стальные двери с защитой от взлома</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Design
