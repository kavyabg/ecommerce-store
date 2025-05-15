import React from "react";
import { Link } from "react-router-dom";

function ProductList({ products, loading }) {
  const skeletonArray = new Array(8).fill(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
      {loading
        ? skeletonArray.map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-2">
                <div className="h-6 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-10 bg-gray-300 rounded w-1/2 mt-4" />
              </div>
            </div>
          ))
        : products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <Link to={`/product/${product.productNumber}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-t-lg p-3"
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
                  <span className="text-xl text-gray-800 font-bold">
                    ₹{product.price}
                  </span>
                  <Link to={`/product/${product.productNumber}`}>
                    <button className="bg-yellow-500 text-black py-2 px-4 rounded-full hover:bg-yellow-400 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ProductList;
