'use client'
import { Suspense } from 'react'
import styles from './Fortov.module.scss'
import Head from 'next/head'

const FortovContent = () => {
  return (
    <div>
      <Head>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/content/cluster.png' as='image' fetchPriority='high' />
      </Head>

      {(
        <section className={styles.section}>
          <div>
            <div className={styles.captions}>
              <div>
                <h2 className={styles['captions-title']}>Часть кластера «Остров фортов»</h2>
                <p className={styles['caption__description']}>видео о Кластере</p>
              </div>

              <div className={styles['caption-items']}>
                <div className={styles['caption']}>
                  <h2 className={styles['caption__title']}><span>парк <br />«остров фортов»</span></h2>
                  <hr className={styles['caption__divider']} />
                  <p className={styles['caption__description']}>для активного отдыха и прогулок с детьми</p>
                </div>
                <div className={styles['caption']}>
                  <h2 className={styles['caption__title']}>32</h2>
                  <hr className={styles['caption__divider']} />
                  <p className={styles['caption__description']}>комфортных общественных и социальных объекта инфраструктуры</p>
                </div>
                <div className={styles['caption']}>
                  <h2 className={styles['caption__title']}>3</h2>
                  <hr className={styles['caption__divider']} />
                  <p className={styles['caption__description']}>объекта всемирного культурного наследия ЮНЕСКО</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  )
}

const FortovPage = () => {
  return (
    <Suspense>
      <FortovContent />
    </Suspense>
  )
}

export default FortovPage
