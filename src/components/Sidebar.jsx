import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* {isLoading ? <Spinner /> : <Outlet />}{" "} */}
      {/*BUG: this is unmounting and mounting the outlet component that is resulting in infinite spinner loop*/}
      <Outlet />
      <Footer />
    </div>
  );
}
