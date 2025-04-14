import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border p-4 m-2 rounded-lg shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <Link
        to={`/product/${product.id}`}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
