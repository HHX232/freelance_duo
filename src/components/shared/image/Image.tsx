import clsx from 'clsx'
import styles from './Image.module.scss'
import NextImage, {ImageProps} from 'next/image'

const Image = ({className, ...rest}: ImageProps) => (
  <div className={clsx(styles.picture, className)}>
    <NextImage
      {...rest}
      fill
      style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
      className={styles.image}
    />
  </div>
)

export default Image
