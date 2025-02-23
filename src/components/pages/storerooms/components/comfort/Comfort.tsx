import styles from './comfort.module.scss'
import DownloadSVG from '@icon/download.svg'

const Comfort = () => {
  return (
    <section className={styles['comfort-wrapper']}>
      <div className={styles['info-wrapper']}>
        <h3 className={styles['title']}>удобство хранения на территории комплекса</h3>
        <p className={styles['description']}>
          Индивидуальные кладовые различных размеров от 2,89 до 6,15 кв.м, расположенные на — 1 этаже дома, с общим
          коридором и системами контроля доступа и пожаротушения.
        </p>

        <div className={styles['table-img-wrapper']}></div>

        <div className={styles['download-wrapper']}>
          <button
            type='button'
            className={styles['download']}
            // onClick={() => sendTmrEvent('download', id, fvalue)}
          >
            <DownloadSVG />
            <div className={styles['text']}>
              <h4>Скачайте буклет</h4>
              <p>PDF, 4MB</p>
            </div>
          </button>
        </div>
      </div>

      <div className={styles['img-wrapper']}></div>
    </section>
  )
}

export default Comfort
