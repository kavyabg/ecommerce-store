import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../components/CartContext';
import { FaShoppingCart, FaCheckCircle, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../redux/slices/wishlistSlice';

function ProductDetail() {
  const { productNumber } = useParams();
  const { product, loading, error } = useProduct(productNumber);
  const { addToCart, cartItems } = useCart();

  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.productNumber === product?.productNumber);
  const isInCart = cartItems?.some(item => item.productNumber === product?.productNumber);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white shadow-2xl rounded-2xl p-8">
          <div className="w-full h-[400px] bg-gray-200 rounded-xl"></div>
          <div className="space-y-5">
            <div className="h-10 bg-gray-200 rounded w-2/3"></div>
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
            <div className="h-12 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6 bg-white shadow-2xl rounded-3xl p-6 sm:p-8">
        {/* Product Image */}
        <div className="relative group w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[350px] sm:h-[450px] object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            NEW
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6 lg:space-y-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 leading-relaxed text-lg sm:text-xl lg:text-lg lg:leading-normal">
              {product.description}
            </p>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-gray-700">₹{product.price.toFixed(2)}</div>

          <div className="flex items-center gap-4 mt-4">
            {/* Wishlist Button */}
            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className={`text-xl p-3 rounded-full shadow-md ${
                isInWishlist ? 'text-red-500 bg-red-100' : 'text-blue-900 bg-yellow-400'
              } hover:scale-110 transition`}
              title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>

            {/* Cart Button */}
            {isInCart ? (
              <>
                <button
                  disabled
                  className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-medium flex items-center gap-2 shadow-md cursor-not-allowed"
                >
                  <FaCheckCircle /> Already in Cart
                </button>
                <Link to="/cart" className="text-blue-600 font-medium hover:underline text-lg">
                  View Cart
                </Link>
              </>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 shadow-md hover:bg-yellow-300 transition"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            )}
          </div>

          <Link to="/" className="mt-6 text-sm text-gray-500 hover:underline">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
