import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import styles from "../styles/pageStyles/dishDetailPage.module.css";
import PageHeader from "../component/pageHeader/PageHeader.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Footer from "../component/footer/Footer.jsx";
import { useCart } from "../component/context/CartContext.jsx"; // 🔹 importér cart context

const DishDetailPage = () => {
  const { id } = useParams();
  const { get, isLoading, error } = useFetch();
  const [dish, setDish] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState(0);

  const { addToCart } = useCart(); // 🔹 brug addToCart fra context

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const data = await get.dish(id);
        const dishData = data.data ? data.data : data;
        setDish(dishData);

        // Set default size and price if available
        if (dishData.price && typeof dishData.price === "object") {
          const sizes = Object.keys(dishData.price);
          if (sizes.length > 0) {
            setSelectedSize(sizes[0]);
            setPrice(dishData.price[sizes[0]]);
          }
        } else if (dishData.price) {
          setPrice(dishData.price);
        }
      } catch (err) {
        setDish(null);
      }
    };
    fetchDish();
  }, [id]);

  // Update price when size changes
  useEffect(() => {
    if (dish && dish.price && typeof dish.price === "object" && selectedSize) {
      setPrice(dish.price[selectedSize]);
    }
  }, [selectedSize, dish]);

  if (isLoading) return <p>Henter ret...</p>;
  if (error) return <p>{error}</p>;
  if (!dish) return <p>Ret ikke fundet.</p>;

  // Helper: get available sizes if price is an object
  const sizeOptions =
    dish.price && typeof dish.price === "object" ? Object.keys(dish.price) : [];

  const handleAddToBasket = () => {
    addToCart(dish, selectedSize, price); // 🔹 tilføj til kurv
  };

  return (
    <>
      <PageHeader
        upperTitle="DEN"
        title="GLADE"
        subTitle={dish.title}
        backgroundImage="/images/headerImg.png"
      />
      <div className={styles.dishDetailContainer}>
        <img src={dish.image} alt={dish.title} className={styles.dishImage} />
        <div className={styles.infoSection}>
          <h1 className={styles.dishTitle}>{dish.title}</h1>
          <div className={styles.ingredientsSection}>
            <h4>
              {dish.ingredients &&
                dish.ingredients.map((ing, idx) => (
                  <p key={idx} className={styles.ingredientItem}>
                    {ing}
                  </p>
                ))}
            </h4>
          </div>
        </div>

        {/* Size/Price/Buy Section */}
        <div className={styles.buySection}>
          {sizeOptions.length > 0 && (
            <div className={styles.sizePicker}>
              <div className={styles.selectContainer}>
                <h1>Vælg størrelse:</h1>
                <div className={styles.selectRow}>
                  <select
                    id="size"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.chevronIcon}
                  />
                </div>
              </div>
            </div>
          )}
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <div>Pris</div>
              <span>{price} ,-</span>
            </div>
          </div>
          <button className={styles.addToBasketBtn} onClick={handleAddToBasket}>
            Tilføj {dish.title} til kurven
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DishDetailPage;
