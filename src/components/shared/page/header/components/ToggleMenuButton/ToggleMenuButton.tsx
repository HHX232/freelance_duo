import styles from './ToggleMenuButton.module.scss'
import {IToggleMenuButton} from './ToggleMenuButton.types'
import MenuSVG from '@icons/menu.svg'
import CancelSVG from '@icons/cancel.svg'

export default function ToggleMenuButton({isMenuOpened, onClick}: IToggleMenuButton) {
  return (
    <div className={styles.toggleMenuButton}>
      <button onClick={onClick}>{isMenuOpened ? <CancelSVG /> : <MenuSVG />}</button>
    </div>
  )
}
