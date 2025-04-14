import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct'; // Custom hook
import { useCart } from '../components/CartContext';

function ProductDetail() {
  const { productNumber } = useParams();
  const { product, loading, error } = useProduct(productNumber);
  const { addToCart, cartItems } = useCart();

  const isInCart = cartItems?.some(item => item.productNumber === product?.productNumber);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white shadow-xl rounded-xl p-6 animate-pulse">
          <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div>

          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-12 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white shadow-xl rounded-xl p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-base leading-relaxed">{product.description}</p>
          <div className="text-2xl font-semibold text-blue-700">${product.price}</div>

          {isInCart ? (
            <>
              <button
                disabled
                className="mt-4 bg-green-500 text-white py-3 px-6 rounded-full text-lg font-medium cursor-not-allowed"
              >
                Already in Cart
              </button>
              <Link
                to="/cart"
                className="ml-4 inline-block mt-4 text-blue-600 hover:underline text-lg font-medium"
              >
                View Cart
              </Link>
            </>
          ) : (
            <button
              className="mt-4 bg-yellow-500 text-blue-900 py-3 px-6 rounded-full text-lg font-medium hover:bg-yellow-400 transition duration-300"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
