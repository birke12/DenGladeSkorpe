import React, { useState } from "react";
import styles from "../styles/pageStyles/contact.module.css";
import PageHeader from "../component/pageHeader/PageHeader";
import Footer from "../component/footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    navn: "",
    emne: "",
    beskrivelse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message sent:", formData);
    // Reset form
    setFormData({ navn: "", emne: "", beskrivelse: "" });
  };

  return (
    <>
      <PageHeader
        upperTitle="DEN"
        title="GLADE"
        subTitle="SKORPE"
        backgroundImage="/images/headerImg.png"
      />
      <div className={styles.container}>
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>
            Har du spørgsmål eller ønsker du at bestille din favoritpizza?
          </h2>
          <p className={styles.infoText}>
            Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi
            glæder os til at høre fra dig!
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="navn" className={styles.label}>
              Navn:
            </label>
            <input
              type="text"
              id="navn"
              name="navn"
              value={formData.navn}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="emne" className={styles.label}>
              Emne:
            </label>
            <input
              type="text"
              id="emne"
              name="emne"
              value={formData.emne}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="beskrivelse" className={styles.label}>
              Beskrivelse:
            </label>
            <textarea
              id="beskrivelse"
              name="beskrivelse"
              value={formData.beskrivelse}
              onChange={handleChange}
              className={styles.textarea}
              rows="4"
              required
            ></textarea>
          </div>
        <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
                Send
            </button>
        </div>
        
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
