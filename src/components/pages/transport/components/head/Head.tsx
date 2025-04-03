'use client'
import styles from './Head.module.scss'
import Breadcrumbs from '@src/components/UI-kit/Navigation/Breadcrumbs/Breadcrumbs'
import {useEffect, useRef, useState} from 'react'

const Head = () => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/'},
    {
      title: 'Транспортная доступность',
      href: '/transport'
    }
  ]
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div>
      <section className={styles['head-wrapper']} ref={sectionRef}>
        <div className={styles.routerWrapper}>
          {/*<Title breadcrumbs={breadcrumbItems} dashboard={true} darkTheme={true} />*/}
          <Breadcrumbs items={breadcrumbItems} darkTheme={true} className={styles['router']} />
        </div>
        <div className={`${styles.container} ${ isVisible ? styles.visible : ''}`}>
          <div className={styles.title_wrap}>
            <h2 className={styles.head_title}>Транспортная <br />доступность</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Head
