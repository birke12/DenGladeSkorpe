import React from "react";
import styles from "./modal.module.css";

const Modal = ({ show, onClose, backgroundImage, children }) => {
  if (!show) return null;

  return (
    <div
      className={styles.modalOverlay}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      onClick={onClose}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Forhindrer lukning når man klikker på content
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
