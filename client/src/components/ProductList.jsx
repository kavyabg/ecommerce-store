import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
        >
          <Link to={`/product/${product.productNumber}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </Link>
          <div className="p-4">
            <Link to={`/product/${product.productNumber}`}>
              <h3 className="text-xl font-semibold text-gray-800 hover:underline">
                {product.name}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl text-gray-800 font-bold">${product.price}</span>
              <button className="bg-yellow-500 text-blue-900 py-2 px-4 rounded-full hover:bg-yellow-400 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
