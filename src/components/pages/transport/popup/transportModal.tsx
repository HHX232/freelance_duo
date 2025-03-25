import {Drawer} from 'antd'
import {FC} from 'react'
import styles from './transportModal.module.scss'
import {CloseButton} from '@src/components/UI-kit/BaseControls/buttons/close-button'
import clsx from 'clsx'
import {useMedia} from '@src/lib/utils/useMedia'
import Image from '@src/components/UI-kit/image/Image'
import {DotButton} from '@shared/phoneSlider/EmblaCarouselDotButton'
import { PrevButton, NextButton } from '@pages/map/Components/home/bg-slider/EmblaCarouselArrowButtons'
import ParagraphUI from '@src/components/UI-kit/Text-Elements/Typography/Paragraph/Paragraph'

interface ITransportModalProps {
  shown: number
  onClose: () => void
  scrollPage: (page: number) => void
}

const TransportModal: FC<ITransportModalProps> = ({shown, onClose, scrollPage}) => {
  const {isLessThan} = useMedia()

  const titleTextArr = ['', 'Для общественно - деловой жизни', 'Для досуга', 'Для активного отдыха', 'Для детей']
  const tabs = [1, 2, 3, 4]



  return (
    <Drawer
      bodyStyle={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
      placement={'right'}
      closable={false}
      onClose={onClose}
      open={shown > 0}
      contentWrapperStyle={{
        width:
          isLessThan &&
          (isLessThan('768')
            ? '100%'
            : isLessThan('1024')
              ? '88%'
              : isLessThan('1280')
                ? '70%'
                : isLessThan('1600')
                  ? '60%'
                  : '50%')
      }}
    >
      <div className={styles.head}>
        <CloseButton className={styles.headClose} onClick={onClose} />
      </div>

      <div className={styles.content}>
        {shown === 1 && <Image className={styles.contentImg} src='/content/transport/blocks_1.webp' alt='' />}
        {shown === 4 && <Image className={styles.contentImg} src='/content/transport/blocks_2.webp' alt='' />}

        <h3 className={clsx(styles.content_title, styles.bottomIndent)}>{titleTextArr[shown]}</h3>

        {shown === 1 && (
          <ParagraphUI size='md' weight='regular' extraClass={clsx(styles.content_text, styles.bottomIndent)}>
            Комплекс Музея военно- морской славы и конгрессно- выставочного центра в Кронштадте выступает площадкой
            знаковых общественных и деловых событий международного масштаба.<br/> В 2024 году на его территории проходят
            мероприятия Петербургского международного экономического форума, Международный военно- морской салон
            «ФЛОТ-2024», X Санкт- Петербургский культурный форум.
          </ParagraphUI>
        )}

        <div className={styles['slider_controls']}>
          <div className={styles['dots_wrapper']}>
            <div className={styles['embla__dots']}>
              {tabs.map((num, index) => (
                <DotButton
                  key={index}
                  onClick={() => scrollPage(num)}
                  className={`${styles['embla__dot']} ${index === shown - 1 && styles['embla__dot--selected']}`}
                />
              ))}
            </div>
          </div>
          <div className={styles['embla__buttons']}>
            <PrevButton onClick={() => scrollPage(shown === 1 ? 4 : shown - 1)} disabled={false} className={styles.embla_arrow_btns} />
            <NextButton onClick={() => scrollPage(shown === 4 ? 1 : shown + 1)} disabled={false} className={styles.embla_arrow_btns} />
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default TransportModal
