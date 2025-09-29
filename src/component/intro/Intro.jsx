import React from "react";
import styles from "./intro.module.css";

const Intro = ({ title, text }) => {
  return (
    <section className={styles.intro}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.text}>{text}</div>
    </section>
  );
};

export default Intro;