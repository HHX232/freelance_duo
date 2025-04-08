import styles from './routeButtons.module.scss'
import {FC, useState, useEffect, useRef} from 'react'
import { FullButton } from '../../BaseControls/buttons/FullButton/FullButton'
import ParagraphUI from '../../Text-Elements/Typography/Paragraph/Paragraph'

interface IRouteButtons {
  switchRoute: (route: any) => void
}

const RouteButtons: FC<IRouteButtons> = ({switchRoute}) => {
  const [activeRoute, setActiveRoute] = useState(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        {threshold: 0.5}
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

  const handleClick = (route: any, idx: number) => {
    setActiveRoute(idx)
    switchRoute(route)
  }

  const routeBlocks = [
    {minute: 25, text: 'ДО КУРОРТНОГО РАЙОНА', route: {
        points: [
          [60.000921, 29.751304],
          ["Петербург, курортный район"]
        ],
        color: '#148F88',
        lineWidth: 4,
        hint: 'До курортного района'
      }
    },
    {minute: 30, text: 'ДО ЛАХТА ЦЕНТРА', route: {
        points: [
          [60.000921, 29.751304],
          ["Петербург, Лахта-центр"]
        ],
        color: '#148F88',
        lineWidth: 4,
        hint: 'До Лахта - центра'
      }
    },
    {minute: 40, text: 'ДО ЦЕНТРА ПЕТЕРБУРГА', route: {
        points: [
          [60.000921, 29.751304],
          ["Петербург, Эрмитаж"]
        ],
        color: '#148F88',
        lineWidth: 4,
        hint: 'До центра Петербурга'
      }
    },
  ]

  return (
    <section className={styles['routes-wrapper']} ref={sectionRef}>
        <h2 className={styles['routes-title']}>Транспортная доступность</h2>
        <div className={styles['routes-blocks-container']}>
            {routeBlocks.map((block, index) => (
                <div
                key={index}
                className={`${styles['route-block']} ${activeRoute === index ? styles['active-route'] : ''} ${isVisible ? styles.visible : ''}`}
                >
                    <div className={styles['rb-texts']}>
                        <ParagraphUI itemProp='description' extraClass={styles['rb-text-minute']} size={'md'} weight={'light'}>
                            {block.minute + ' минут'}
                        </ParagraphUI>
                        <h4 className={styles['rb-text-route']}>{block.text}</h4>
                    </div>
                    {activeRoute === index ? null :
                        <FullButton
                            extraClass={styles['rb-btn']}
                            activeButton={false}
                            onClick={() => handleClick(block.route, index)}
                            buttonBorderRadius='6px'
                            buttonFill='white'
                            border={false}
                            borderColor='none'
                            buttonText={'Проложить маршрут  '}
                        />
                    }
                </div>
            ))}
        </div>
    </section>
  )
}

export default RouteButtons
