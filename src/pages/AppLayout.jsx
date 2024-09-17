import MapContainer from "../components/MapContainer";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
export default function AppLayout({ isLoading }) {
  return (
    <div className={styles.app}>
      <Sidebar isLoading={isLoading} />
      <MapContainer />
    </div>
  );
}
