import { FC } from "react";
import styles from "./mapSidebar.module.scss";

interface IMapSidebar {
  isOpen: boolean
}

const MapSidebar: FC<IMapSidebar> = ({isOpen}) => {

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.content}>
        <div className={styles.content_block}>
          <h2 className={`${styles.content_title} ${styles.blue}`}>ДОСТУПНОСТЬ</h2>
          <div className={styles.content_block_row}>
            <div className={`${styles.content_block_column} ${styles.left_blue}`}>
              <p>25 минут до</p>
              <p>30 минут до</p>
              <p>40 минут до</p>
            </div>
            <div className={styles.content_block_column}>
              <p>Курортного района</p>
              <p>«Лахта Центра»</p>
              <p>центра Петербурга</p>
            </div>
          </div>
          <div className={styles.content_block_row}>
            <div className={`${styles.content_block_column} ${styles.left_orange}`}>
              <p>50 минут до</p>
            </div>
            <div className={styles.content_block_column}>
              <p>аэропорта Пулково</p>
            </div>
          </div>
          <div className={styles.content_block_row}>
            <div className={`${styles.content_block_column} ${styles.left_blue}`}>
              <p>60 минут на «Метеоре» или яхте до</p>
            </div>
            <div className={styles.content_block_column}>
              <p>причала на Дворцовой набережной</p>
            </div>
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