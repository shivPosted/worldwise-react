import { Link } from "react-router-dom";
import styles from "./CityCard.module.css";
import { dateFormatter } from "./util";
import { useCitiesContext } from "./CitiesContext";

export default function CityCard({ city }) {
  const { cityName, country, countryCode, date, id, position } = city;
  const { currentCity, deleteCity } = useCitiesContext();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
      >
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${country}-flag`}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{dateFormatter(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
