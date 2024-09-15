import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";

const PageNav = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/app">App</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
