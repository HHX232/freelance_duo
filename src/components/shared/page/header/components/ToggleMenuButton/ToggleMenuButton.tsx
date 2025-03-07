import CancelIconSVG from '../icons/CancelIconSVG/CancelIconSVG'
import styles from './ToggleMenuButton.module.scss'
import {IToggleMenuButton} from './ToggleMenuButton.types'
import MenuSVG from '@icons/menu.svg'

export default function ToggleMenuButton({isMenuOpened, onClick}: IToggleMenuButton) {
  return (
    <div className={styles.toggleMenuButton}>
      <button onClick={onClick}>{isMenuOpened ? <CancelIconSVG /> : <MenuSVG />}</button>
    </div>
  )
}
