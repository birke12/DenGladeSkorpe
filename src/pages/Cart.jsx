import { useState } from "react";
import { useCart } from "../component/context/CartContext";
import PageHeader from "../component/pageHeader/PageHeader";
import Modal from "../component/modal/Modal";
import styles from "../styles/pageStyles/cart.module.css";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  // Beregn totalpris
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <PageHeader
        title="Bestilling"
        subTitle="Din kurv"
        backgroundImage="/images/headerImg.png"
      />

      {cart.length === 0 ? (
        <p className={styles.empty}>Kurven er tom.</p>
      ) : (
        <div className={styles.cartContainer}>
          {cart.map((item, idx) => (
            <div key={idx} className={styles.cartItem}>
              <div className={styles.itemHeader}>
                <span>{item.quantity} X</span>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImg}
                />
                <span className={styles.itemTitle}>{item.title}</span>
              </div>

              <div className={styles.itemDetails}>
                {item.extra && (
                  <p>
                    <span>Ekstra:</span> {item.extra}
                  </p>
                )}
                {item.size && (
                  <p>
                    <span>Størrelse:</span> {item.size}
                  </p>
                )}
                <p>
                  <span>Pris:</span> {item.price},-
                </p>
              </div>

              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id, item.size)}
              >
                Fjern
              </button>
            </div>
          ))}

          <div className={styles.total}>
            <strong>I alt:</strong> {total},-
          </div>

          <textarea
            className={styles.textArea}
            placeholder="Kommentar til ordren"
          ></textarea>

          <button
            className={styles.confirmBtn}
            onClick={() => setShowModal(true)}
          >
            Afgiv Ordre
          </button>

        
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            backgroundImage="/images/headerImg.png"
          >
            <p>Tak for din bestilling!</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CartPage;
