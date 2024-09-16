import CityCard from "./CityCard";
import styles from "./ListofCities.module.css";

export default function ListofCities({ cities }) {
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityCard city={city} key={city.id} />
      ))}
    </ul>
  );
}
