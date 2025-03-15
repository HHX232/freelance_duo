import { useState } from "react";
import styles from "./mapSidebar.module.scss";

const MapSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '>>' : '<<'}
      </button>
      <div className={styles.content}>
        <h2>ДОСТУПНОСТЬ</h2>
        <p>25 минут до Курортного района</p>
        <p>30 минут до «Лахта Центра»</p>
        <p>40 минут до центра Петербурга</p>
        <p>50 минут до аэропорта Пулково</p>
        <p>60 минут на «Метеоре» до Дворцовой набережной</p>
        <h2>ОБЪЕКТЫ ТУРИЗМА</h2>
        <ul>
          <li>Музейно-исторический парк «Остров фортов»</li>
          <li>Комплекс Музея военно-морской славы</li>
          <li>Никольский морской собор</li>
          <li>Океанариум</li>
        </ul>
      </div>
    </div>
  );
};

export default MapSidebar;