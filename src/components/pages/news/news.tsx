'use client'
import {useState, useEffect, useRef, forwardRef} from 'react'
import styles from './news.module.scss'
import {MainContainer} from '@shared/containers/main/main-container'
import {Title} from '@src/components/UI-kit/TextKit/title/title'
import {breadcrumbItems} from './config/breadcrumbs'
import clsx from 'clsx'
import Image from 'next/image'
import DOMPurify from 'dompurify'
import {formatDate} from '@src/lib/utils/news/formatDate'
import {INews} from '@src/types/news.interface'
import {useRouter} from 'next/navigation'

const NewsCard = forwardRef<HTMLDivElement, INews>((props, ref) => {
  const router = useRouter()

  const handleClick = () => {
    if (props.onClick) {
      props.onClick()
    }
    router.push(`/news/${props.slug}`)
  }

  return (
    <div ref={ref} className={clsx(styles.card, props?.selected === props.id && styles.selected)} onClick={handleClick}>
      <div className={styles.title}>
        <span>{formatDate(props.created_at)}</span>
        <p>{props.title}</p>
      </div>
      <p>{props.description}</p>
    </div>
  )
})

NewsCard.displayName = 'NewsCard'

export const News = ({news, id, h1, h1_details}: {news: INews[]; id?: string; h1?: boolean; h1_details?: boolean}) => {
  const [selectedNews, setSelectedNews] = useState<INews | null>(news.find((item) => item.slug === id) || news[0])

  const [sanitizedContent, setSanitizedContent] = useState<string>('')
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const asideRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selectedNews) {
      try {
        const sanitized = DOMPurify.sanitize(selectedNews.content)
        setSanitizedContent(sanitized)
      } catch (error) {
        console.error('Error sanitizing content:', error)
        setSanitizedContent(selectedNews.content.replace(/(<([^>]+)>)/gi, ''))
      }
    }
  }, [selectedNews])

  useEffect(() => {
    const isMobile = window.innerWidth < 777

    // Прокрутка сайдбара к выбранной новости
    const selectedIndex = news.findIndex((item) => item.id === selectedNews?.id)
    if (selectedIndex !== -1 && cardRefs.current[selectedIndex] && asideRef.current) {
      const card = cardRefs.current[selectedIndex]
      const aside = asideRef.current

      const cardRect = card!.getBoundingClientRect()
      const asideRect = aside.getBoundingClientRect()

      if (cardRect.top < asideRect.top || cardRect.bottom > asideRect.bottom) {
        card!.scrollIntoView({behavior: 'smooth', block: 'nearest'})
      }

      if (isMobile) {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
    }
  }, [selectedNews, news])

  const router = useRouter()

  const handlePrevNews = () => {
    const currentIndex = news.findIndex((item) => item.id === selectedNews?.id)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : news.length - 1
    setSelectedNews(news[prevIndex])
    router.push(`/news/${news[prevIndex].slug}`)
  }

  const handleNextNews = () => {
    const currentIndex = news.findIndex((item) => item.id === selectedNews?.id)
    const nextIndex = currentIndex < news.length - 1 ? currentIndex + 1 : 0
    setSelectedNews(news[nextIndex])
    router.push(`/news/${news[nextIndex].slug}`)
  }
  return (
    <MainContainer>
      <Title title='Новости' breadcrumbs={breadcrumbItems} dashboard={true} h1={h1} />
      <div className={styles.news}>
        {news.length > 0 && (
          <>
            <aside ref={asideRef}>
              {news.map((item, index) => (
                <NewsCard
                  key={item.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  {...item}
                  onClick={() => setSelectedNews(item)}
                  selected={selectedNews?.id === item.id ? selectedNews.id : 0}
                />
              ))}
            </aside>
            <div className={styles.news_content}>
              {selectedNews && (
                <>
                  <div className={styles.title}>
                    <span>{formatDate(selectedNews.created_at)}</span>
                    {h1_details ? (
                      <p className={styles.main_title}>{selectedNews.title}</p>
                    ) : (
                      <h1 className={styles.main_title}>{selectedNews.title}</h1>
                    )}
                  </div>
                  <div className={styles.img}>
                    <Image
                      src={selectedNews.image_path}
                      alt='Image'
                      style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
                      width={892}
                      height={298}
                    />
                  </div>
                  <div className={styles.content_text} dangerouslySetInnerHTML={{__html: sanitizedContent}} />
                  <div className={styles.arrows}>
                    <button type='button' onClick={handlePrevNews}>
                      <svg width='47' height='8' viewBox='0 0 47 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM47 3.5L1 3.5V4.5L47 4.5V3.5Z'
                          fill='#555555'
                        />
                      </svg>
                    </button>
                    <button type='button' onClick={handleNextNews}>
                      <svg width='47' height='8' viewBox='0 0 47 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M46.3536 4.35355C46.5488 4.15829 46.5488 3.84171 46.3536 3.64645L43.1716 0.464466C42.9763 0.269204 42.6597 0.269204 42.4645 0.464466C42.2692 0.659728 42.2692 0.976311 42.4645 1.17157L45.2929 4L42.4645 6.82843C42.2692 7.02369 42.2692 7.34027 42.4645 7.53553C42.6597 7.7308 42.9763 7.7308 43.1716 7.53553L46.3536 4.35355ZM46 3.5L0 3.5V4.5L46 4.5V3.5Z'
                          fill='#555555'
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </MainContainer>
  )
}

export default News
