import styles from "./CityCard.module.css";
import { dateFormatter } from "./util";
export default function CityCard({ city }) {
  const { cityName, country, countryCode, date } = city;
  console.log(city);
  return (
    <li className={styles.cityItem}>
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${country}-flag`}
      />
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{dateFormatter(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
