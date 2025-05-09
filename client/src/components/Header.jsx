import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { FaCartShopping, FaBluesky, FaBars } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';

function Header() {
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl sm:text-3xl font-extrabold text-white hover:text-yellow-300 transition duration-300"
          >
            <FaBluesky className="mr-2 text-5xl sm:text-4xl text-yellow-400" />
            BlossomBeauty
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-base font-semibold hover:text-yellow-300 transition">Home</Link>
            <Link to="/dashboard" className="text-base font-semibold hover:text-yellow-300 transition">Dashboard</Link>
            <Link to="/login" className="text-base font-semibold hover:text-yellow-300 transition">Login</Link>
            <Link to="/register" className="text-base font-semibold hover:text-yellow-300 transition">Register</Link>
            <Link to="/admin/login" className="text-base font-semibold hover:text-yellow-300 transition">Admin</Link>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center ml-2">
            <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Cart Icon */}
          <div className="relative ml-1">
            <Link to="/cart" className="text-white text-2xl hover:text-yellow-300 transition">
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

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-600 px-6 pb-4 space-y-3">
          <Link onClick={closeMenu} to="/" className="block text-white font-medium hover:text-yellow-300">Home</Link>
          <Link onClick={closeMenu} to="/admin/login" className="block text-white font-medium hover:text-yellow-300">Admin</Link>
          <Link onClick={closeMenu} to="/dashboard" className="block text-white font-medium hover:text-yellow-300">Dashboard</Link>
          <Link onClick={closeMenu} to="/login" className="block text-white font-medium hover:text-yellow-300">Login</Link>
          <Link onClick={closeMenu} to="/register" className="block text-white font-medium hover:text-yellow-300">Register</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
