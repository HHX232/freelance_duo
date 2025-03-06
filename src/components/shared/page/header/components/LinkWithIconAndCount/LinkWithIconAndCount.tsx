import Link from 'next/link'
import styles from './LinkWithIconAndCount.module.scss'
import {ILinkWithIconAndCountProps} from './LinkWithIconAndCount.types'
import IconWithCount from '@shared/IconWithCount/IconWithCount'

export default function LinkWithIconAndCount(props: ILinkWithIconAndCountProps) {
  return (
    <div style={props.style} className={styles.link}>
      <Link href={props.href}>
        <IconWithCount hw={[20, 20]} position={[-15, 0, 0, 16]} count={props.count}>
          <div className={styles.icon}>{props.children}</div>
        </IconWithCount>
      </Link>
    </div>
  )
}
