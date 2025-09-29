import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navigation.module.css";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <a href="/" className={styles.logo}>
          <img src="/images/logo.png" alt="logo" />
        </a>
        <div
          className={`${styles.menuToggle} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`${styles.navOverlay} ${isOpen ? styles.active : ""}`}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
