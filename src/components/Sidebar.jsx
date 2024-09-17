import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Spinner from "./Spinner";
export default function Sidebar({ isLoading }) {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {isLoading ? <Spinner /> : <Outlet />}
      <Footer />
    </div>
  );
}
