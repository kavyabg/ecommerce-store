import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-3xl text-white hover:text-yellow-500 transition duration-300">
            <span className="text-4xl">🔌</span> BlossomBeauty-Shop
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-lg font-medium text-white hover:text-yellow-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="text-lg font-medium text-white hover:text-yellow-500 transition duration-300"
              >
                Admin Dashboard
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>

        {/* Cart Icon (Optional) */}
        <div className="relative">
          <Link
            to="/cart"
            className="text-white text-lg hover:text-yellow-500 transition duration-300"
          >
            🛒
          </Link>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-1s rounded-full p-px">
            1
          </span> {/* Cart item count */}
        </div>
      </div>
    </header>
  );
}

export default Header;
