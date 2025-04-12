import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const productData = await fetchProductById(id);
      setProduct(productData);
    };
    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

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
