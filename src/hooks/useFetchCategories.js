/* import { useEffect, useState } from "react";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/categories");
      const data = await response.json();

      console.log("Fetched categories:", data);

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && typeof data === "object") {
        setCategories([data]);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchCategories();

  const fetchCategoryById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/category/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch,
    fetchCategoryById,
  };
};

export default useFetchCategories;
 */