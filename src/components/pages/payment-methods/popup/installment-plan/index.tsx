import {Drawer} from 'antd'
import {FC} from 'react'
import styles from './index.module.scss'
import FilledButton from '@shared/filledButton/FilledButton'
import BorderedButton from '@shared/borderedButton/BorderedButton'
import {CloseButton} from '@shared/close-button'
import clsx from 'clsx'
import {useMedia} from '@src/lib/utils/useMedia'
import {useRouter} from 'next/navigation'
import Swipe from '@src/components/UI-kit/BaseControls/Swipe/Swipe'

interface IInstallmentPlanDrawerProps {
  shown: boolean
  onClose: () => void
}

export const InstallmentPlanDrawer: FC<IInstallmentPlanDrawerProps> = ({shown, onClose}) => {
  const {isLessThan} = useMedia()
  const router = useRouter()
  const handleClick = () => {
    router.replace('/planirovki-i-ceny')
  }

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
      open={shown}
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
        <h3 className={clsx(styles.title, styles.bottomIndent)}>Рассрочка до ввода в эксплуатацию</h3>

        <ul className={clsx(styles.list, styles.bottomIndent)}>
          <li>Беспроцентная</li>
          <li>Увеличение цены договора на 10% от базовой цены договора</li>
          <li>Рассрочка предоставляется до даты ввода в эксплуатацию</li>
          <li>Первоначальный взнос не менее 20% от базовой стоимости</li>
        </ul>

        <Swipe className={styles.swipe} maxVisibleWidth={433} />

        <div className={styles.table_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Платеж</th>
                <th>Сумма рассрочки</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50 000 руб.</td>
                <td>до 500 000 руб.</td>
              </tr>
              <tr>
                <td>80 000 руб.</td>
                <td>от 500 001 руб. до 1 000 000 руб.</td>
              </tr>
              <tr>
                <td>120 000 руб.</td>
                <td>от 1 000 001 руб. до 1 500 000 руб.</td>
              </tr>
              <tr>
                <td>160 000 руб.</td>
                <td>от 1 500 001 руб. до 2 000 000 руб.</td>
              </tr>
              <tr>
                <td>200 000 руб.</td>
                <td>от 2 000 001 руб. до 2 500 000 руб.</td>
              </tr>
              <tr>
                <td>250 000 руб.</td>
                <td>от 2 500 001 руб.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <FilledButton onClick={handleClick}>
          <span>ПОДОБРАТЬ КВАРТИРУ</span>
        </FilledButton>
        <BorderedButton>
          <span>Получить консультацию</span>
        </BorderedButton>
      </div>
    </Drawer>
  )
}
