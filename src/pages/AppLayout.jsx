import { useAuth } from "../components/AuthContext";
import { useCitiesContext } from "../components/CitiesContext";
import ErrorMessage from "../components/ErrorMessage";
import Map from "../components/MapContainer";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
export default function AppLayout() {
  const { isError, errorMessage } = useCitiesContext();
  const { isAuthorized } = useAuth();

  if (!isAuthorized) return null;

  return (
    <div className={styles.app}>
      {isError && <ErrorMessage message={errorMessage} />}
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
