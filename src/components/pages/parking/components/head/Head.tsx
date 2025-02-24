'use client'
import styles from './Head.module.scss'
import {Title} from '@shared/title/title'
import SaleBlock from '@shared/SaleBlock/SaleBlock'
import SalePIcon from '@icon/SaleP.svg'

const Head = () => {
  const breadcrumbItems = [
    {title: 'Главная', href: '/map'},
    {
      title: 'Паркинг',
      href: '/parking'
    }
  ]

  const isSale = true

  return (
    <div>
      <section className={styles['head-wrapper']}>
        <div>
          <Title breadcrumbs={breadcrumbItems} dashboard={true} darkTheme={true} />
        </div>
        <div className={styles.container}>
          <div className={styles.title_wrap}>
            <div className={styles.head_title}>Паркинг</div>
            <p className={styles.description}>
              Современный паркинг с прямым доступом из жилых секций обеспечивает удобство и безопасность в ежедневной
              эксплуатации.
            </p>
          </div>
          {isSale && (
            <SaleBlock
              title={
                <div className={styles.sale_title}>
                  <p className={styles.sale_title_text}>скидка 10% </p>
                </div>
              }
              description={<div className={styles.sale_desc}>На парковку до 27 сентабря 2025</div>}
              icon={<SalePIcon />}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Head
