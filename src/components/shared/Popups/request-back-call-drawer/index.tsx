import {FC} from 'react'
import styles from './index.module.scss'
import {useMedia} from '@src/lib/utils/useMedia'
import {Drawer} from 'antd'
import {CloseButton} from '@src/components/UI-kit/BaseControls/buttons/close-button'
import clsx from 'clsx'
import TicketForm from '@shared/ticketForm/ticketForm'

interface IRequestBackCallDrawerProps {
  shown: boolean
  onClose: () => void
}

export const RequestBackCallDrawer: FC<IRequestBackCallDrawerProps> = ({shown, onClose}) => {
  const {isLessThan} = useMedia()

  return (
    <Drawer
      className={styles.popup}
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
          (isLessThan('480')
            ? '100%'
            : isLessThan('768')
              ? '88%'
              : isLessThan('1024')
                ? '60%'
                : isLessThan('1600')
                  ? '50%'
                  : '40%')
      }}
    >
      <div className={styles.head}>
        <CloseButton className={styles.headClose} onClick={onClose} />
      </div>

      <div className={styles.content}>
        <h3 className={clsx(styles.title)}>Заказать обратный звонок</h3>

        <div className={styles.form}>
          <TicketForm
            onSuccess={onClose}
            formContainerClassName={styles.form_container}
            description={
              'Оставьте заявку на обратный звонок, и персональный менеджер свяжется с вами для уточнения деталей'
            }
          />
        </div>
      </div>
    </Drawer>
  )
}
