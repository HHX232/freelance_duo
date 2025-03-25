import { FC } from "react";
import styles from "./mapSidebar.module.scss";

interface IMapSidebar {
  isOpen: boolean
  isMobile?: boolean
}

const MapSidebar: FC<IMapSidebar> = ({isOpen, isMobile}) => {

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""} ${isMobile ? styles.mobile : ''}`}>
      <div className={styles.content}>
        <div className={styles.content_block}>
          <h2 className={`${styles.content_title} ${styles.blue}`}>ДОСТУПНОСТЬ</h2>
          <hr className={styles.content_hr} />
          <div className={styles.content_block_row}>
            <p className={styles.row_left}>25 минут до</p>
            <p className={styles.row_right}>Курортного района</p>
          </div>
          <div className={styles.content_block_row}>
            <p className={styles.row_left}>30 минут до</p>
            <p className={styles.row_right}>«Лахта Центра»</p>
          </div>
          <div className={styles.content_block_row}>
            <p className={styles.row_left}>40 минут до</p>
            <p className={styles.row_right}>центра Петербурга</p>
          </div>
          <hr className={styles.content_hr} style={{borderColor: '#D38F6D'}} />
          <div className={styles.content_block_row}>
            <p className={styles.row_left}>50 минут до</p>
            <p className={styles.row_right}>аэропорта Пулково</p>
          </div>
          <hr className={styles.content_hr} />
          <div className={styles.content_block_row}>
            <p className={styles.row_left}>60 минут на «Метеоре» или яхте до</p>
            <p className={styles.row_right}>причала на Дворцовой набережной</p>
          </div>
        </div>

        <div className={styles.content_block}>
          <h2 className={`${styles.content_title} ${styles.orange}`}>ОБЪЕКТЫ ТУРИЗМА</h2>
          <ol className={styles.content_list}>
            <li>Музейно-исторический парк «Остров фортов»</li>
            <li>Комплекс Музея военно-морской славы</li>
            <li>Никольский морской собор</li>
            <li>Океанариум</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MapSidebar;