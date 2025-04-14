// src/hooks/useProduct.js
import { useEffect, useState } from 'react';
import { fetchProductByProductNumber } from '../services/api';

export function useProduct(productNumber) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductByProductNumber(productNumber);
        if (!productData || productData.message === 'Product not found') {
          setError('Product not found.');
        } else {
          setProduct(productData);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product data.');
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productNumber]);

  return { product, loading, error };
}
