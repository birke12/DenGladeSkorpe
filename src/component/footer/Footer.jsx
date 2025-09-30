import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoWrapper}>
        <img
          src="/images/logo.png"
          alt="Den Glade Skorpe logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.contactRow}>
        <h4>Email: gladskorpe@pizzaglad.dk</h4>
        <h4>Tlf: 12345678</h4>
        <h4>Adresse: Skorpevej 42, 1234 Pizzabyen</h4>
      </div>
    </footer>
  );
};

export default Footer;
