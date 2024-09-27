import { Outlet } from "react-router-dom";
import CityCard from "./CityCard";
import styles from "./ListofCities.module.css";
import { useCitiesContext } from "./CitiesContext";
import Spinner from "./Spinner";

export default function ListofCities() {
  const { cities, isLoading } = useCitiesContext();
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityCard city={city} key={city.id} />
      ))}
    </ul>
  );
}
