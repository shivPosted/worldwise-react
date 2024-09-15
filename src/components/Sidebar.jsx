import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Footer />
    </div>
  );
}
