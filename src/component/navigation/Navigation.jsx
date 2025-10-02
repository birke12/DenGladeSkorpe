import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./navigation.module.css";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [burgerColor, setBurgerColor] = useState("#fff");
  const [navbarBg, setNavbarBg] = useState(false);
  const { signedIn, user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".pageHeader");
      if (header) {
        const headerBottom = header.getBoundingClientRect().bottom;
        if (headerBottom <= 0) {
          setNavbarBg(true);
          setBurgerColor("#000");
        } else {
          setNavbarBg(false);
          setBurgerColor("#fff");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${styles.navbar} ${navbarBg ? styles.navbarBg : ""}`}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <img src="/images/logo.png" alt="logo" />
        </Link>
        <div className={styles.cartBurgerContainer}>
          <Link to="/basket" className={styles.basketIcon}>
            <img src="/images/basket_icon.png" alt="basket" />
          </Link>
          <div
            className={`${styles.menuToggle} ${isOpen ? styles.open : ""}`}
            onClick={toggleMenu}
          >
            <span style={{ background: burgerColor }}></span>
            <span style={{ background: burgerColor }}></span>
            <span style={{ background: burgerColor }}></span>
          </div>
        </div>

        <div className={`${styles.navOverlay} ${isOpen ? styles.active : ""}`}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={toggleMenu}>
                Kurv
              </Link>
            </li>
            <li>
              <Link to="/employees" onClick={toggleMenu}>
                Personalet
              </Link>
            </li>

            {/* Hvis bruger er logget ind og er admin */}
            {signedIn && user.role === "admin" && (
              <li>
                <Link to="/backoffice" onClick={toggleMenu}>
                  Backoffice
                </Link>
              </li>
            )}

            {/* Hvis ikke logget ind → vis login */}
            {!signedIn ? (
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className={styles.logoutBtn}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
