'use client'
import styles from './Blocks.module.scss'

const Blocks = () => {
  return (
    <div className={styles.blocks_container}>
        <section className={styles.blocks}>
            <div className={styles['blocks-items']}>
            <div className={styles['blocks-row']}>
                <div className={`${styles.cover} ${styles.meta}`} style={{backgroundImage: `url("/content/transport/blocks_1.webp")`}}>
                    <p className={styles.meta__btnplus}>+</p>
                    <div className={styles.meta__info}>
                        <h3 className={styles['meta__title']}>Для общественно - деловой жизни</h3>
                    </div>
                </div>
                <div className={styles.meta}>
                <p className={styles.meta__btnplus}>+</p>
                <div className={styles.meta__info}>
                    <h3 className={styles['meta__title']}>Для досуга</h3>
                </div>
                </div>
            </div>
            <div className={styles['blocks-row']}>
                <div className={styles.meta}>
                    <p className={styles.meta__btnplus}>+</p>
                    <div className={styles.meta__info}>
                        <h3 className={styles['meta__title']}>Для активного отдыха</h3>
                    </div>
                </div>
                <div className={`${styles.cover} ${styles.meta}`} style={{backgroundImage: `url("/content/transport/blocks_2.webp")`}}>
                    <p className={styles.meta__btnplus}>+</p>
                    <div className={styles.meta__info}>
                        <h3 className={styles['meta__title']}>Для детей</h3>
                    </div>
                </div>
            </div>
            </div>
        </section>
      </div>
  )
}

export default Blocks