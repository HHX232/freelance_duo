import styles from './agree.module.scss'
import Link from 'next/link'
import clsx from 'clsx'

export const Agree = ({...props}: any) => {
  return (
    <div className={clsx(styles.agree, props.className)} {...props}>
      <p>
        Нажимая кнопку, я автоматически даю свое согласие на обработку{' '}
        <Link href={'/consent'} target='_blank'>
          <span>персональных данных</span>
        </Link>
      </p>
    </div>
  )
}
