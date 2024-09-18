import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MapContainer.module.css";
export default function MapContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
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
