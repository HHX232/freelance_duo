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
        <h1 className={styles["title"]}>Внутреннее оформление</h1>
      </div>

      <div className={styles['tiles-wrapper']}>
        <div className={styles['first-line']}>
          <div className={`${styles['tile']} ${styles['bg1']}`}>
            <Lamp/>
            <h5>Централизованное освещение</h5>
          </div>
          <div className={`${styles['tile']} ${styles['bg2']}`}>
            <Cursor/>
            <h5>Цементная стяжка с противоскользящим покрытием</h5>
          </div>
        </div>
        <div className={styles['second-line']}>
          <div className={styles['tile']}>
            <Rubick/>
            <h5>Металлическая сетка и бетонные панели</h5>
          </div>
          <div className={styles['tile']}>
            <Shower/>
            <h5>Потолок без отделки</h5>
          </div>
          <div className={styles['tile']}>
            <Guard/>
            <h5>Усиленные стальные двери с защитой от взлома</h5>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Design
