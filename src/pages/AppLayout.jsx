import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useCitiesContext } from "../components/CitiesContext";
import ErrorMessage from "../components/ErrorMessage";
import Map from "../components/MapContainer";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import { useEffect } from "react";
export default function AppLayout() {
  const { isError, errorMessage } = useCitiesContext();
  const { isAuthorized } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) return navigate("/");
  }, [isAuthorized, navigate]);

  return (
    <div className={styles.app}>
      {isError && <ErrorMessage message={errorMessage} />}
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
