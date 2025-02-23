import styles from './tiles.module.scss'

import Star from '@icon/star.svg'
import M from '@icon/м..svg'
import M2 from '@icon/м2.svg'

const Tiles = () => {
  return (
    <section className={styles['tiles-wrapper']}>

      <div className={`${styles['wrapper']} ${styles['main-wrapper']}`}>
        <div className={`${styles['tile']} ${styles['tile-bg1']}`}>
          <p className={styles['title']}>
            Система видеонаблюдения
          </p>
          <p className={styles['description']}>
            пожаротушение с автоматическими датчиками
          </p>
        </div>
        <div className={`${styles['wrapper']} ${styles['column']}`}>
          <div className={styles['wrapper']}>
            <div className={`${styles['tile']} ${styles['tile-bg2']}`}>
              <p className={styles['title']}>
                система защиты
              </p>
              <p className={styles['description']}>
                Защищенные электронные ключи, общий коридор с системами контроля доступа
              </p>
            </div>
            <div className={`${styles['tile']} ${styles['tile-bg3']}`}>
              <p className={styles['title']}>
                3,8 <M/>
              </p>
              <p className={styles['description']}>
                Высота потолков
              </p>
            </div>
          </div>
          <div className={`${styles['tile']} ${styles['tile-bg4']}`}>
            <p className={styles['title']}>
              2,89 - 6,15 <M2/>
            </p>
            <p className={styles['description']}>
              площадь кладовых
            </p>
            <div className={styles['icon-wrapper']}>
              <Star/>
            </div>
          </div>

        </div>
      </div>

    </section>

  )
}

export default Tiles
