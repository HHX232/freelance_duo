import styles from './Access.module.scss'
import CircleLineDivider from '@shared/circleLineDivider/CircleLineDivider'
import FilledButton from '@shared/filledButton/FilledButton'

const Access = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['image']}></div>
      <div className={styles['content']}>
        <div className={styles['title-wrapper']}>
          <div className={styles['title']}>Въезд и доступ на паркинг</div>

          <div className={styles['DesktopButton']}>
            <FilledButton
              style={{
                background: 'rgba(255, 255, 255, 0.16)',
                border: 'none',
                padding: '12px 36px'
              }}
            >
              ПОДОБРАТЬ парковку
            </FilledButton>
          </div>
        </div>
        <div className={styles['tiles']}>
          <div className={`${styles['column']}`}>
            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Круглосуточное видеонаблюдение</div>
                <div className={styles['desc']}>с охватом всей территории</div>
              </div>
            </div>

            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Системы контроля</div>
                <div className={styles['desc']}>доступа на въездах и выездах</div>
              </div>
            </div>
          </div>

          <div className={`${styles['column']}`}>
            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Автоматизированные ворота</div>
                <div className={styles['desc']}>с дистанционным управлением</div>
              </div>
            </div>

            <div className={styles['tile']}>
              <CircleLineDivider numberOfCircles={3} />
              <div className={styles['textWrapper']}>
                <div className={styles['sub-title']}>Многоуровневая система контроля</div>
                <div className={styles['desc']}>доступа с использованием электронных брелоков</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['TableButtonWrapper']}>
          <FilledButton style={{background: 'rgba(255, 255, 255, 0.16)', border: 'none'}}>
            ПОДОБРАТЬ парковку
          </FilledButton>
        </div>
      </div>
    </div>
  )
}

export default Access
