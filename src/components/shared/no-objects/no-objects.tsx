import {ReactNode} from 'react'
import styles from './no-objects.module.scss'
interface IProps {
  children: ReactNode
}

export const NoObjects = (props: IProps) => {
  return (
    <div className={styles.no_objects}>
      <div className={styles.no_objects_content}>{props.children}</div>
    </div>
  )
}
