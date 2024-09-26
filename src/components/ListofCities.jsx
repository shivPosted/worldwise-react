import { Outlet } from "react-router-dom";
import CityCard from "./CityCard";
import styles from "./ListofCities.module.css";
import { useCitiesContext } from "./CitiesContext";

export default function ListofCities() {
  const { cities } = useCitiesContext();
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityCard city={city} key={city.id} />
      ))}
    </ul>
  );
}
