import React, { useState } from "react";
import styles from "../styles/pageStyles/contact.module.css";
import PageHeader from "../component/pageHeader/PageHeader";
import Footer from "../component/footer/Footer";
import useFetch from "../hooks/useFetch";

const Contact = () => {
  const { post, isLoading, error } = useFetch();
  const [formData, setFormData] = useState({
    navn: "",
    emne: "",
    beskrivelse: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Her laver jeg formdata om til engelsk fordi API'et forventer engelske felter
      const messageData = {
        name: formData.navn,
        subject: formData.emne,
        description: formData.beskrivelse,
        status: false, // Sætter til ulæst som standard
      };

      console.log("Prøver at sende besked:", messageData);
      console.log("API URL:", "http://localhost:3042/messages");

      const result = await post.messages(messageData);
      console.log("Besked sendt!", result);
      setSubmitSuccess(true);
      // Nulstil formularen så den er tom igen
      setFormData({ navn: "", emne: "", beskrivelse: "" });

      // Vis success besked i 3 sekunder og skjul den så igen
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Der skete en fejl ved afsendelse:", err);
      console.error("Fejlbesked:", err.message);
      console.error("Hele fejl objektet:", err);
    } finally {
      setIsSubmitting(false);
    }
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
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sender..." : "Send"}
            </button>
          </div>

          {submitSuccess && (
            <div className={styles.successMessage}>
              ✅ Din besked er sendt! Vi vender tilbage til dig hurtigst muligt.
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              ❌ Der opstod en fejl. Prøv venligst igen.
            </div>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
