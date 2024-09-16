import styles from "./CityCard.module.css";
import { dateFormatter } from "./util";
export default function CityCard({ city }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{dateFormatter(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
