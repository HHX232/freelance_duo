import styles from './comfort.module.scss'
import DownloadSVG from '@icon/download.svg'

const Comfort = () => {
  return (
    <section className={styles['comfort-wrapper']}>
      <div className={styles['info-wrapper']}>
        <h3 className={styles['title']}>Комфорт и безопасность на высшем уровне</h3>

        <div className={styles['table-desc-wrapper']}>
          <p className={styles['description']}>
            В каждом корпусе пре дусмотрен подземный паркинг для автомобилей и мотоциклов с доступом из лифтов жилой
            части дома. Также здесь будет размещена велопарковка.
          </p>
          <p className={styles['description']}>
            Проведена подготовка под установку зарядных станций для электромобилей. В подземной части каждого корпуса
            для жильцов будут доступны индивидуальные кладовые различных размеров.
          </p>
        </div>

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

      <div className={styles['desc-wrapper']}>
        <p className={styles['description']}>
          В каждом корпусе пре дусмотрен подземный паркинг для автомобилей и мотоциклов с доступом из лифтов жилой части
          дома. Также здесь будет размещена велопарковка.
        </p>
        <p className={styles['description']}>
          Проведена подготовка под установку зарядных станций для электромобилей. В подземной части каждого корпуса для
          жильцов будут доступны индивидуальные кладовые различных размеров.
        </p>
      </div>
    </section>
  )
}

export default Comfort
