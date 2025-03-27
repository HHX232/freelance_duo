'use client'
import {FC} from 'react'
import styles from './Blocks.module.scss'
import ButtonPlus from '@src/components/UI-kit/BaseControls/buttons/ButtonPlus/ButtonPlus'

interface IBlocksProps {
  setShowModal: (page: number) => void
}

const Blocks: FC<IBlocksProps> = ({setShowModal}) => {
  return (
    <div className={styles.blocks_container}>
      <section className={styles.blocks}>
        <div className={styles['blocks-items']}>
          <div className={styles['blocks-row']}>
            <div
              className={`${styles.cover} ${styles.meta} ${styles['block-col']}`}
              style={{
                background: 'linear-gradient(230.26deg, rgba(0, 0, 0, 0) 4.73%, rgba(0, 0, 0, 0.5) 65.67%), url(/content/transport/blocks_1.webp)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
                // backgroundImage: `url("/content/transport/blocks_1.webp")`
              }}
            >
              <ButtonPlus onClick={() => setShowModal(1)} />
              <div className={styles.meta__info}>
                <h3 className={styles['meta__title']}>Для общественно - деловой жизни</h3>
              </div>
            </div>
            <div className={`${styles.meta} ${styles['block-col']}`}>
              <ButtonPlus onClick={() => setShowModal(2)} />
              <div className={styles.meta__info}>
                <h3 className={styles['meta__title']}>Для досуга</h3>
              </div>
            </div>
          </div>
          <div className={styles['blocks-row']}>
            <div className={`${styles.meta} ${styles['block-col']}`}>
              <ButtonPlus onClick={() => setShowModal(3)} />
              <div className={styles.meta__info}>
                <h3 className={styles['meta__title']}>Для активного отдыха</h3>
              </div>
            </div>
            <div
              className={`${styles.cover} ${styles.meta} ${styles['block-col']}`}
              style={{
                //backgroundImage: `url("/content/transport/blocks_2.webp")`,
                background: 'linear-gradient(230.26deg, rgba(0, 0, 0, 0) 4.73%, rgba(0, 0, 0, 0.5) 65.67%), url(/content/transport/blocks_2.webp)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
            >
              <ButtonPlus onClick={() => setShowModal(4)} />
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
