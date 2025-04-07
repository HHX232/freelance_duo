import {ReactNode} from 'react'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import styles from './contentData.module.scss'
export interface AboutItem {
  img: string
  alt: string
  title: string
  text: ReactNode | string
}

const Content = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '74px', marginLeft: '2px'}}>
      <p style={{fontWeight: '300'}}>
        <span style={{fontWeight: '500'}}>
          Все необходимые документы доступны всем пользователям на сайте{' '}
          <a
            href='https://наш.дом.рф/%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B/%D0%B5%D0%B4%D0%B8%D0%BD%D1%8B%D0%B9-%D1%80%D0%B5%D0%B5%D1%81%D1%82%D1%80-%D0%B7%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%89%D0%B8%D0%BA%D0%BE%D0%B2/%D0%B7%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%89%D0%B8%D0%BA/17439'
            target='_blank'
            rel='nofollow noreferrer'
          >
            дом.рф
          </a>
        </span>{' '}
        Со всеми необходимыми документами вы можете ознакомиться на сайте Наш Дом.рф. На портале вы найдете проверенную
        информацию о застройщике, жилищных кооперативах и объектах строительства.
      </p>
      <a
        href='https://наш.дом.рф/%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B/%D0%B5%D0%B4%D0%B8%D0%BD%D1%8B%D0%B9-%D1%80%D0%B5%D0%B5%D1%81%D1%82%D1%80-%D0%B7%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%89%D0%B8%D0%BA%D0%BE%D0%B2/%D0%B7%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%89%D0%B8%D0%BA/17439'
        target='_blank'
        rel='noreferrer'
      >
        {/* <FilledButton variety='primary' className={'route_docs'}>
          Перейти на сайт
        </FilledButton> */}
        <span style={{zIndex: '9'}}>
          <FullButton
            activeButton={true}
            buttonFill={'bronze-500'}
            border={false}
            buttonText={'Перейти на сайт'}
            borderColor='none'
            buttonElementColor='white'
            extraClass={styles.extra_button}
            buttonBorderRadius='6px'
          />
        </span>
      </a>
    </div>
  )
}

export const documentsData: {img: string; alt: string; text: ReactNode | string; title: string}[] = [
  {
    img: `/content/docs/docs1.webp`,
    alt: `map`,
    title: `ДОКУМЕНТЫ`,
    text: <Content />
  }
]
