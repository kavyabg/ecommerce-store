import React from 'react';
import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10">
        Cart Items <span className="text-blue-800">({cartItems.length})</span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-lg text-blue-600 hover:text-yellow-500 font-medium">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productNumber}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border p-4 rounded-lg bg-white shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-contain border rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-green-600 mt-1">In Stock</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.productNumber)}
                        className="w-8 h-8 rounded border bg-blue-100 text-blue-700 hover:text-yellow-500"
                      >−</button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.productNumber)}
                        className="w-8 h-8 rounded border bg-blue-100 text-blue-700 hover:text-yellow-500"
                      >+</button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex justify-between md:flex-col items-end space-y-2">
                  <p className="text-lg font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.productNumber)}
                    className="text-red-600 hover:text-yellow-500 text-sm flex items-center"
                  >
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-xl font-bold">Your Order</h3>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span className="text-sm text-gray-500">charges apply</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-yellow-400 text-center font-semibold py-3 rounded hover:bg-yellow-300"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="block text-center text-blue-600 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
