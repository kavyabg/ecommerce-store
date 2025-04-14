import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // Import useCart hook

function Header() {
  const { cartItems } = useCart(); // Get cartItems from CartContext

  // Calculate cart count (total number of items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

        {/* Cart Icon */}
        <div className="relative">
  <Link
    to="/cart"
    className="text-white text-lg hover:text-yellow-500 transition duration-300"
  >
    🛒
  </Link>
  {cartCount > 0 && (
    <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full p-1 min-w-[20px] text-center">
      {cartCount}
    </span>
  )}
</div>

      </div>
    </header>
  );
}

export default Header;
