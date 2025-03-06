import styles from './comfort.module.scss'
import DownloadButton from '@shared/downloadButton'

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
          <DownloadButton/>
        </div>
      </div>

      <div className={styles['img-wrapper']}></div>
    </section>
  )
}

export default Comfort
