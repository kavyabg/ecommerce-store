import React from 'react';
import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty. Start shopping now!</p>
          <Link to="/" className="text-lg text-blue-600 hover:underline font-medium">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.productNumber}
              className="flex items-center justify-between border-b pb-6 pt-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-gray-800 font-medium">${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.productNumber)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Total Price</h3>
            <p className="text-2xl font-semibold text-blue-600">${totalPrice.toFixed(2)}</p>
          </div>

          <div className="mt-6 flex justify-between space-x-4">
            <Link
              to="/"
              className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg text-center font-medium hover:bg-gray-400 transition duration-300"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
