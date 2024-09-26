import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Spinner from "./Spinner";
import { useCitiesContext } from "./CitiesContext";
export default function Sidebar() {
  const { isLoading } = useCitiesContext();
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {isLoading ? <Spinner /> : <Outlet />}
      <Footer />
    </div>
  );
}
