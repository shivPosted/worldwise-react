import { useSearchParams } from "react-router-dom";
import styles from "./MapContainer.module.css";
export default function MapContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log(lat, lng);
  return (
    <div className={styles.mapContainer}>
      <h1>MapContainer</h1>
      <p>{lat}</p>
      <p>{lng}</p>
      <button
        onClick={() => setSearchParams({ ...searchParams, lat: 52, lng: 65 })}
      >
        change position
      </button>
    </div>
  );
}
