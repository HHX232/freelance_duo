import styles from './SaleBlock.module.scss'

interface Props {
  title: React.ReactNode
  description: React.ReactNode
  icon?: React.ReactNode
}

const SaleBlock = ({title, description, icon}: Props) => {
  return (
    <div className={styles.sale_wrapper}>
      {icon && <div className={styles.xlIcon}>{icon}</div>}
      <div className={styles.sale_title_wrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}{title}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  )
}

export default SaleBlock
