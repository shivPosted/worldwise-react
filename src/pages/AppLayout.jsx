import { useCitiesContext } from "../components/CitiesContext";
import MapContainer from "../components/MapContainer";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
export default function AppLayout() {
  const { isLoading } = useCitiesContext();
  return (
    <div className={styles.app}>
      <Sidebar />
      <MapContainer />
    </div>
  );
}
