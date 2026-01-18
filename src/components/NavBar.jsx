import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${styles.nav__link} ${styles["nav__link--active"]}`
            : styles.nav__link
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/spacecrafts"
        className={({ isActive }) =>
          isActive
            ? `${styles.nav__link} ${styles["nav__link--active"]}`
            : styles.nav__link
        }
      >
        Spacecrafts
      </NavLink>

      <NavLink
        to="/planets"
        className={({ isActive }) =>
          isActive
            ? `${styles.nav__link} ${styles["nav__link--active"]}`
            : styles.nav__link
        }
      >
        Planets
      </NavLink>
    </nav>
  );
}

export default NavBar;
