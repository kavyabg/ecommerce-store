import { useEffect, useState } from "react";
import {
  fetchProducts as fetchAllProducts,
  createProduct as createProductAPI,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
} from "../../services/admin/api.js";

export const useProductCRUD = () => {
  const [products, setProducts] = useState([]);  // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data || []);  // Ensure data is always an array
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);  // Set an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product) => {
    try {
      const newProduct = await createProductAPI(product);
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const updated = await updateProductAPI(id, updatedData);
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? updated : product))
      );
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
