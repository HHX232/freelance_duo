import styles from './HeaderMenu.module.scss'
import {IHeaderMenuProps} from './HeaderMenu.types'
import MenuBlock from './menuBlock/MenuBlock'
import MenuItem from './menuItem/MenuItem'

export default function HeaderMenu({onClose, setIsMenuOpened}: IHeaderMenuProps) {
  return (
    <div className={styles.menu}>
      <div className={styles.container}>
        <MenuBlock closeHandler={onClose} title='Недвижимость'>
          <MenuItem text='Квартиры' openable>
            <div onClick={() => setIsMenuOpened(false)}>
              <MenuItem text='Все квартиры' href='/planirovki-i-ceny' />
            </div>
            <div onClick={() => setIsMenuOpened(false)}>
              <MenuItem text='Студии' href='/studii' />
            </div>
            <div onClick={() => setIsMenuOpened(false)}>
              <MenuItem text='Однокомнатные' href='/odnokomnatnye' />
            </div>
            <div onClick={() => setIsMenuOpened(false)}>
              <MenuItem text='Двухкомнатные' href='/dvuhkomnatnye' />
            </div>
            <div onClick={() => setIsMenuOpened(false)}>
              <MenuItem text='Трехкомнатные' href='/3-komnatnye' />
            </div>
          </MenuItem>
          <div onClick={() => setIsMenuOpened(false)}>
            <MenuItem text={'Кладовые'} href={'/storerooms'} />
          </div>
          <div onClick={() => setIsMenuOpened(false)}>
            <MenuItem text={'Паркинг'} href={'/parking'} />
          </div>
        </MenuBlock>

        <MenuBlock closeHandler={onClose} title='О проекте'>
          <MenuItem text='О проекте' openable>
            <MenuItem text='О проекте "Кронфорт"' href='/o-proekte' />
            <MenuItem text='"Кронфорт. Центральный"' href='/tsentralnyi' />
          </MenuItem>
          <MenuItem text='Расположение' href='/raspolozhenie' />
          <MenuItem text='Инфраструктура' href='/infrastruktura' />
          <MenuItem text='Благоустройство' href='/blagoustroistvo' />
          <MenuItem text='Архитектура' href='/architektura' />
          <MenuItem text='Виды отделки' href='/otdelka' />
          <MenuItem text='Новости' href='/news' />
        </MenuBlock>

        <MenuBlock closeHandler={onClose} title='Информация'>
          <MenuItem text='О застройщике' href='/alkor' />
          <MenuItem text='Способы покупки' href='/payment-methods' />
          <MenuItem text='Ход строительства' href='/gallery' />
          <MenuItem text='Документы' href='/docs' />
          <MenuItem text='Контакты' href='/contacts' />
          <MenuItem text='Служба доверия' href='/feedback' />
        </MenuBlock>
      </div>
    </div>
  )
}
