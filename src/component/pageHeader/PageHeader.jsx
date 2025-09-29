import styles from "./PageHeader.module.css";

const PageHeader = ({ title, subTitle, backgroundImage }) => {
  return (
    <header
      className={styles.pageHeader}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.textContainer}>
          <h1>{title}</h1>
          <div className={styles.titleContainer}>
            <p className={styles.title}>{title}</p>
            <p className={styles.subTitle}>{subTitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
