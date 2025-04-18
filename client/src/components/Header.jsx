import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { FaCartShopping } from "react-icons/fa6";
import { FaBluesky } from "react-icons/fa6";

function Header() {
  const { cartItems } = useCart();
  const cartCount = cartItems.length;

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center text-2xl sm:text-3xl font-extrabold text-white hover:text-yellow-300 transition duration-300"
            >
              <FaBluesky className="mr-2 text-5xl sm:text-4xl text-yellow-400" /> BlossomBeauty
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Admin
            </Link>
            <Link
              to="/dashboard"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Register
            </Link>
          </nav>

          {/* Cart */}
          <div className="relative">
            <Link
              to="/cart"
              className="text-white text-2xl hover:text-yellow-300 transition"
            >
              <FaCartShopping size={28} />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
