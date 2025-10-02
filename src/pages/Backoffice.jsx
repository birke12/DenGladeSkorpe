import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import styles from "../styles/pageStyles/backoffice.module.css";

const initialFormState = {
  title: "",
  description: "",
  weekday: "",
  image: null,
  time: "",
};

const BackofficeDishes = () => {
  const { get, put, post, del, error, isLoading } = useFetch();
  const [dishes, setDishes] = useState([]);
  const [editingDishId, setEditingDishId] = useState(null);

  const [addFormData, setAddFormData] = useState(initialFormState);
  const [editFormData, setEditFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const dishesData = await get.dishes();
        setDishes(dishesData.data);
      } catch (err) {
        console.error("Error fetching dishes:", err);
      }
    };
    fetchDishes();
  }, []);

  const handleChange = (setter) => (e) => {
    const { name, value, files } = e.target;
    setter((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // Add dish
  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    const newDish = {
      title: addFormData.title,
      description: addFormData.description,
      weekday: addFormData.weekday,
      time: addFormData.time,
      image: "", // optional for now
    };
    try {
      await post.dishes(newDish);
      alert("Dish added successfully!");
      const dishesData = await get.dishes();
      setDishes(dishesData.data);
      setAddFormData(initialFormState);
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };

  // Start editing
  const handleStartEdit = (dish) => {
    setEditingDishId(dish._id);
    setEditFormData({
      title: dish.title,
      description: dish.description || "",
      weekday: dish.weekday || "",
      image: null,
      time: dish.time || "",
    });
  };

  // Edit dish
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (!editingDishId) return;

    const updatedDish = {
      title: editFormData.title,
      description: editFormData.description,
      weekday: editFormData.weekday,
      time: editFormData.time,
    };

    try {
      await put.dishes(editingDishId, updatedDish);
      alert("Dish updated successfully!");
      const dishesData = await get.dishes();
      setDishes(dishesData.data);
      setEditingDishId(null);
    } catch (err) {
      console.error("Error updating dish:", err);
    }
  };

  // Delete dish
  const handleDeleteDish = async (dishId) => {
    try {
      await del.dishes(dishId);
      alert("Dish deleted successfully!");
      const dishesData = await get.dishes();
      setDishes(dishesData.data);
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.backoffice}>
      <section>
        <h1>Backoffice</h1>
        <p>
          <Link to="/">Back to frontend</Link>
        </p>
      </section>

      {/* Dish list */}
      <section>
        <h2>Dishes</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Ingredients</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish._id}>
                <td>{dish.title}</td>
                <td>
                  {dish.image ? (
                    <img
                      src={dish.image}
                      alt={dish.title}
                      style={{ width: "100px" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>

                <div className={styles.ingredientsContainer}>
                  <td className={styles.ingredientsCell}>
                    {Array.isArray(dish.ingredients)
                      ? dish.ingredients.join(", ")
                      : dish.ingredients || "No ingredients"}
                  </td>
                </div>
                <td>
                  {typeof dish.price === "object"
                    ? Object.entries(dish.price)
                        .map(([size, value]) => `${size}: ${value} kr.`)
                        .join(", ")
                    : dish.price || "-"}
                </td>

                <td>{dish.category || "-"}</td>
                <td className={styles.tableActions}>
                  <button onClick={() => handleStartEdit(dish)}>Update</button>
                  <button onClick={() => handleDeleteDish(dish._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className={styles.forms}>
        {/* Add Dish Form */}
        <section>
          <h2 className={styles.formTitle}>Add new dish</h2>
          <form className={styles.form} onSubmit={handleAddFormSubmit}>
            <label htmlFor="addDishTitle">Title:</label>
            <input
              type="text"
              id="addDishTitle"
              name="title"
              value={addFormData.title}
              onChange={handleChange(setAddFormData)}
            />
            <label htmlFor="addDishDescription">Description:</label>
            <textarea
              id="addDishDescription"
              name="description"
              value={addFormData.description}
              onChange={handleChange(setAddFormData)}
            />
            <label htmlFor="addDishWeekday">Weekday:</label>
            <input
              type="text"
              id="addDishWeekday"
              name="weekday"
              value={addFormData.weekday}
              onChange={handleChange(setAddFormData)}
            />
            <label htmlFor="addDishTime">Time:</label>
            <input
              type="text"
              id="addDishTime"
              name="time"
              value={addFormData.time}
              onChange={handleChange(setAddFormData)}
            />
            <label htmlFor="addDishImage">Image:</label>
            <input
              type="file"
              id="addDishImage"
              name="image"
              onChange={handleChange(setAddFormData)}
            />
            <button type="submit">Add</button>
          </form>
        </section>

        {editingDishId && (
          <section>
            <h2 className={styles.formTitle}>Edit dish</h2>
            <form className={styles.form} onSubmit={handleEditFormSubmit}>
              <label htmlFor="editDishTitle">Title:</label>
              <input
                type="text"
                id="editDishTitle"
                name="title"
                value={editFormData.title}
                onChange={handleChange(setEditFormData)}
              />
              <label htmlFor="editDishDescription">Description:</label>
              <textarea
                id="editDishDescription"
                name="description"
                value={editFormData.description}
                onChange={handleChange(setEditFormData)}
              />
              <label htmlFor="editDishWeekday">Weekday:</label>
              <input
                type="text"
                id="editDishWeekday"
                name="weekday"
                value={editFormData.weekday}
                onChange={handleChange(setEditFormData)}
              />
              <label htmlFor="editDishTime">Time:</label>
              <input
                type="text"
                id="editDishTime"
                name="time"
                value={editFormData.time}
                onChange={handleChange(setEditFormData)}
              />
              <label htmlFor="editDishImage">Image:</label>
              <input
                type="file"
                id="editDishImage"
                name="image"
                onChange={handleChange(setEditFormData)}
              />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditingDishId(null)}>
                Cancel
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default BackofficeDishes;
