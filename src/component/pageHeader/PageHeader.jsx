import styles from "./PageHeader.module.css";

const PageHeader = ({ title, subTitle, upperTitle, backgroundImage }) => {
  return (
    <header
      className={`${styles.pageHeader} pageHeader`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <h4>{upperTitle}</h4>
            <h1>{title}</h1>
            <h2 className={styles.subTitle}>{subTitle}</h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
