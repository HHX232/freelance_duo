'use client'
import { Suspense } from 'react'
import styles from './Transport.module.scss'
import Head from 'next/head'
import CornerSVG from '@icons/corner.svg'


const TransportContent = () => {
  return (
    <div>
      <Head>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <link rel='preload' href='/content/ymap.png' as='image' fetchPriority='high' />
      </Head>

      {(
        <section className={styles.section}>
          <div>
            <div className={styles.captions}>
              <h2 className={styles['captions-title']}>Транспортная доступность</h2>
              <div className={styles['caption-items']}>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>КАД</h2>
                  <hr className={styles['caption__divider']} />
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}><span>Кронштадтское шоссе</span></h2>
                  <hr className={styles['caption__divider']} />
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>256<span>автобус</span></h2>
                  <hr className={styles['caption__divider']} />
                </div>
                <div className={styles['caption']}>
                  <CornerSVG />
                  <h2 className={styles['caption__title']}>382<span>автобус</span></h2>
                  <hr className={styles['caption__divider']} />
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  )
}

const TransportPage = () => {
  return (
    <Suspense>
      <TransportContent />
    </Suspense>
  )
}

export default TransportPage
