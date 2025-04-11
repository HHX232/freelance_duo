'use client'
import {Suspense, useRef} from 'react'
import styles from './Transport.module.scss'
import TransportMap from '@src/components/UI-kit/transportMap/transportMap'
import {mapRoutes} from '@src/lib/utils/catalog/mapMockData'

const TransportContent = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  //const customPoi = [{ coords: [59.999664, 29.746338], name: "Кронфорт", icon: 'kf_green_icon.svg' }]
  const customState = {center: [60.052332, 29.915930], zoom: 11, controls: []};

  return (
    <div>
      {
        <section id='MapWrapper' className={styles.section} ref={sectionRef}>
          <div className={styles.overflow} />
          <TransportMap
            customRoutes={mapRoutes}
            //customPoi={customPoi}
            customState={customState}
            wrapperClass={styles.map}
            withLegend={false}
            withPoi
            withRouteButtons
          />
        </section>
      }
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
