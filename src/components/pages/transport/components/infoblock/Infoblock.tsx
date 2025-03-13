import styles from './Infoblock.module.scss'

const Infoblock = () => {
  return (
    <section className={styles['comfort-wrapper']}>
        <div className={styles['info-wrapper']}>
            <div className={styles['info']}>
            <div className={styles['title']}>Преимущество инфраструктуры</div>

            <div className={styles['table-desc-wrapper']}>
                <p className={styles['description']}>
                Для развития потенциала Кронштадта создается комплекс инфраструктуры: многофункциональные 
                общественные пространства, социальные, научные и образовательные объекты, которые  обеспечат высокий уровень качества городской среды. 
                Современные объекты призваны открыть  дополнительные возможности для жителей и туристов.
                </p>
            </div>
            </div>
        </div>

        <div className={styles['desc-wrapper']}>
                <p className={styles['description']}>
                Для развития потенциала Кронштадта создается комплекс инфраструктуры: многофункциональные 
                общественные пространства, социальные, научные и образовательные объекты, которые  обеспечат высокий уровень качества городской среды. 
                Современные объекты призваны открыть  дополнительные возможности для жителей и туристов.
                </p>
        </div>
    </section>
  )
}

export default Infoblock