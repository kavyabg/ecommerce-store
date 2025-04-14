import React from 'react';
import { useSelector } from 'react-redux';

function Cart() {
  const cart = useSelector((state) => state.cart.items);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
