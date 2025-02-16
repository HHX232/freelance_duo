import {IProgress} from '@src/types/progress.interface'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@shared/title/title'
import {breadcrumbItems} from './config/breadcrumbs'
import styles from './progress.module.scss'
import NextImage from 'next/image'
import Link from 'next/link'

export const Progress = (data: {progress: IProgress[]}) => {
  console.log(data)

  return (
    <MainContainer>
      <Title title='Ход строительства' breadcrumbs={breadcrumbItems} />
      <div className={styles.progress}>
        <div className={styles.items}>
          {data.progress.map((item) => (
            <Link href={`/gallery/${item.id}`} key={item.id}>
              <div className={styles.item}>
                <div className={styles.img}>
                  <NextImage
                    src={item.image}
                    alt={item.name}
                    width={310}
                    height={352}
                    style={{objectFit: 'cover', objectPosition: 'center'}}
                    quality={100}
                    unoptimized={true}
                  />
                  {item.last_image_date && <div className={styles.date}>{item.last_image_date}</div>}
                </div>
                <div className={styles.name}>
                  <p>{item.name}</p>
                  <span>{item.total_images} фото</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainContainer>
  )
}
