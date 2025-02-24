import styles from './circleLineDivider.module.scss'

interface Types {
  numberOfCircles: number
}

const CircleLineDivider = ( {numberOfCircles} : Types ) => {

  const arr = Array.from({length: numberOfCircles}, (_, i) => i);

  return (
    <div className={styles.wrapper}>
      <div className={styles['circle-wrapper']}>
        {
          arr.map((item) => {
            return <div className={styles.circle} key={item}></div>
          })
        }
      </div>
      <div className={styles['line']}></div>
    </div>
  )
}

export default CircleLineDivider
