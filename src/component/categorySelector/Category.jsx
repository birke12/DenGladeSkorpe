import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./category.module.css";

const Categories = () => {
  const { get, isLoading, error } = useFetch();
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const catData = await get.categories();
        const dishData = await get.dishes();
        setCategories(Array.isArray(catData) ? catData : catData.data || []);
        setDishes(Array.isArray(dishData) ? dishData : dishData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setCategories([]);
        setDishes([]);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <p>Henter data...</p>;
  if (error) return <p>{error}</p>;

  // Filtrer dishes baseret på valgt kategori
  const filteredDishes = selectedCategory
    ? dishes.filter(
        (dish) =>
          dish.category === selectedCategory.name ||
          dish.categoryId === selectedCategory._id // Support both possible keys
      )
    : dishes;

  // Group dishes by category and take up to 3 from each, limit to 9 total (only when no category is selected)
  let limitedDishes = filteredDishes;
  if (!selectedCategory) {
    const groupedDishes = {};
    filteredDishes.forEach((dish) => {
      const key = dish.categoryId || dish.category;
      if (!groupedDishes[key]) groupedDishes[key] = [];
      if (groupedDishes[key].length < 3) groupedDishes[key].push(dish);
    });
    limitedDishes = Object.values(groupedDishes).flat().slice(0, 9);
  }

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryTitle}>Vælg Kategori</h2>
      </div>

      {/* Categories */}
      <div className={styles.categoryWrapper}>
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${styles.categoryItem} ${
              selectedCategory?._id === category._id ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.categoryOverlay}></div>
              <span className={styles.categoryName}>{category.name}</span>
              <img
                src={category.image}
                alt={category.name}
                className={styles.categoryImage}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dishes */}
      <div className={styles.dishesWrapper}>
        {limitedDishes.map((dish) => (
          <Link
            key={dish._id}
            to={`/dish/${dish._id}`}
            className={styles.dishItem}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span className={styles.dishName}>{dish.title}</span>
            <img
              src={dish.image}
              alt={dish.title}
              className={styles.dishImage}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
