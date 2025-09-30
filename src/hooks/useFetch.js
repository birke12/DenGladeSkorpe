import { useState } from "react";
/* import useAuth from "./useAuth"; */

const useFetch = () => {
  /* const { token, isAuthenticated } = useAuth(); */
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const headers = {
    "Content-Type": "application/json",
  };

  const handleRequest = async (url, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { headers, ...options });
      if (!response.ok) {
        throw new Error(`Failed to ${options.method || "fetch"} resource`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // --- CATEGORIES ---
  const get = {
    categories: () => handleRequest(`http://localhost:3042/categories`),
    category: (id) =>
      id
        ? handleRequest(`http://localhost:3042/category/${id}`)
        : setError("No id provided"),

    dishes: () => handleRequest(`http://localhost:3042/dishes`),
    dish: (id) =>
      id
        ? handleRequest(`http://localhost:3042/dish/${id}`)
        : setError("No id provided"),

    employees: () => handleRequest(`http://localhost:3042/employees`), 
  };

  const post = {
    categories: (category) =>
      handleRequest(`http://localhost:3042/categories`, {
        method: "POST",
        body: JSON.stringify(category),
      }),
    dishes: (dish) =>
      handleRequest(`http://localhost:3042/dishes`, {
        method: "POST",
        body: JSON.stringify(dish),
      }),
  };

  const put = {
    categories: (id, category) =>
      id
        ? handleRequest(`http://localhost:3042/category/${id}`, {
            method: "PUT",
            body: JSON.stringify(category),
          })
        : setError("No id provided"),

    dishes: (id, dish) =>
      id
        ? handleRequest(`http://localhost:3042/dishes/${id}`, {
            method: "PUT",
            body: JSON.stringify(dish),
          })
        : setError("No id provided"),
  };

  const del = {
    categories: (id) =>
      id
        ? handleRequest(`http://localhost:3042/categories/${id}`, {
            method: "DELETE",
          })
        : setError("No id provided"),

    dishes: (id) =>
      id
        ? handleRequest(`http://localhost:3042/dishes/${id}`, {
            method: "DELETE",
          })
        : setError("No id provided"),
  };

  return {
    get,
    post,
    put,
    del,
    data,
    error,
    isLoading,
  };
};

export default useFetch;
