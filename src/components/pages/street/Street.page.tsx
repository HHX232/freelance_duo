'use client'
import Image from '@shared/image/Image'
import styles from './Street.module.scss'
import LayersMap from '@icons/layers.svg'
import Card from './card/Card'
import {Point} from './model'
import MouseMover from '@shared/mouse-mover/MouseMover'
import {MouseParallaxContainer, MouseParallaxChild} from 'react-parallax-mouse'

const POINTS_DATA: Point[] = [
  {title: 'БУТИКОВАя ЗОНА', type: 'compass', coords: {x: 25, y: 25}},
  {title: 'БУТИКОВАя ЗОНА', type: 'sail', coords: {x: 25, y: 75}},
  {title: 'БУТИКОВАя ЗОНА', type: 'wave', coords: {x: 75, y: 25}},
  {title: 'БУТИКОВАя ЗОНА', type: 'compass', coords: {x: 75, y: 75}}
]

const StreetPage = () => {
  return (
    <>
      <MouseMover>
        {(size) => (
          <>
            <div className={styles.wrapper}>
              {POINTS_DATA.map((point, index) => (
                <Card key={index} {...point} size={size} />
              ))}
            </div>
            <MouseParallaxContainer className={styles.parallax} globalFactorX={0.5} globalFactorY={0.5}>
              <MouseParallaxChild className={styles.parallaxItem} factorX={0.5} factorY={0.5}>
                <Image className={styles.cloud} src={'/street/cloud.png'} alt='background' />
              </MouseParallaxChild>
              <Image className={styles.image} src={'/street/street.png'} alt='background' />
            </MouseParallaxContainer>
          </>
        )}
      </MouseMover>
      <LayersMap className={styles.layers} />
    </>
  )
}

export default StreetPage
