import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductByProductNumber } from '../services/api';  // Use the correct import

function ProductDetail() {
  const { id } = useParams();  // `id` will be the product number
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductByProductNumber(id);  // Use the correct function
        setProduct(productData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError('Failed to load product data.'); // Set error message if there's an error
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>; // Show loading state while fetching
  if (error) return <p>{error}</p>; // Show error message if something goes wrong

  if (!product) return <p>Product not found</p>; // Handle case when the product is not found

  return (
    <div className="p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
    </div>
  );
}

export default ProductDetail;
