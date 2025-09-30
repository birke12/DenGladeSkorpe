import { createContext, useContext, useState, useEffect } from "react";

// Laver en context til kurven, så jeg kan dele den mellem sider
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Starter kurven med data fra localStorage, hvis der er noget gemt
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Hver gang kurven ændrer sig, gemmer jeg den i localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Tilføjer en ret til kurven
  // Hvis retten allerede er der med samme størrelse, lægger jeg bare én til quantity
  // Ellers tilføjer jeg den som ny
  const addToCart = (dish, size, price) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === dish._id && item.size === (size || "standard")
      );

      if (existingItem) {
        // Hvis varen findes, opdaterer jeg antallet
        return prevCart.map((item) =>
          item.id === dish._id && item.size === (size || "standard")
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ellers tilføjer jeg den som ny vare
        return [
          ...prevCart,
          {
            id: dish._id,
            title: dish.title,
            size: size || "standard",
            price,
            image: dish.image,
            quantity: 1,
          },
        ];
      }
    });
  };

  // Fjerner en vare fra kurven ud fra id og størrelse
  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Tømmer hele kurven
  const clearCart = () => setCart([]);

  // Gør kurven og funktionerne tilgængelige for resten af appen
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Bruges til at få fat i kurven i andre komponenter
export const useCart = () => useContext(CartContext);
