'use client'
import { Suspense } from 'react'
import styles from './Areas.module.scss'
import Head from 'next/head'
import CornerSVG from '@icons/corner.svg'


const AreasContent = () => {
  return (
    <div>
      <Head>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/content/areas.jpg' as='image' fetchPriority='high' />
      </Head>

      {(
        <section className={styles.section}>
          <div>
            <div className={styles.captions}>
              <h2 className={styles['captions-title']}>От Уютных студий до просторных лофтов</h2>
              <div className={styles['caption-items']}>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>&#62;3<span>м</span></h2>
                  <hr className={styles['caption__divider']} />
                  <p className={styles['caption__description']}>высота потолков</p>
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>24-100<span>м2</span></h2>
                  <hr className={styles['caption__divider']} />
                  <p className={styles['caption__description']}>площадь квартир</p>
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>10</h2>
                  <hr className={styles['caption__divider']} />
                  <p className={styles['caption__description']}>корпусов в проекте</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  )
}

const AreasPage = () => {
  return (
    <Suspense>
      <AreasContent />
    </Suspense>
  )
}

export default AreasPage
