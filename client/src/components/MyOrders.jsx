import React, { useState } from 'react';
import useOrdersByEmail from '../hooks/useOrder';
import { FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const MyOrders = () => {
  const { orders, loading, error } = useOrdersByEmail();
  const [selectedDate, setSelectedDate] = useState('all');

  const uniqueDates = Array.from(
    new Set(orders.map((order) => formatDate(order.createdAt)))
  );

  const filteredOrders =
    selectedDate === 'all'
      ? orders
      : orders.filter((order) => formatDate(order.createdAt) === selectedDate);

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">📦 My Orders</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-600 rounded shadow mb-6">
          Error: {error}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mb-6">
          <label className="text-blue-700 font-semibold mr-2">Filter by Date:</label>
          <select
            className="border rounded px-3 py-1 text-sm bg-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="all">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map((s) => (
            <div key={s} className="bg-white rounded shadow p-6 h-52">
              <div className="bg-gray-200 h-4 w-3/4 mb-4 rounded"></div>
              <div className="bg-gray-200 h-3 w-1/2 mb-2 rounded"></div>
              <div className="bg-gray-200 h-3 w-2/3 mb-2 rounded"></div>
              <div className="bg-gray-200 h-3 w-1/3 mb-2 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6">
            <FaBoxOpen className="text-7xl text-yellow-500 mb-6 drop-shadow-lg" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-md text-gray-600 mb-6">Looks like you haven't placed any orders yet.</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition duration-300 shadow"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-2xl font-semibold text-gray-700 mb-2">No matching orders found</p>
            <p className="text-gray-500">Try selecting a different date filter.</p>
          </div>
        )
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border-l-4 border-yellow-500 bg-white rounded-xl shadow p-6 mb-6"
          >
            <div className="mb-4 space-y-1 text-sm">
              <p><strong className="text-blue-700">Order ID:</strong> {order._id}</p>
              <p><strong className="text-blue-700">Date:</strong> {formatDate(order.createdAt)}</p>
              <p>
                <strong className="text-blue-700">Status:</strong>{' '}
                <span className="text-green-600 font-medium">{order.status}</span>
              </p>
              <p><strong className="text-blue-700">Transaction ID:</strong> {order.transactionId}</p>
              <p><strong className="text-blue-700">Total:</strong> ₹{order.totalPrice.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-blue-600 font-semibold mb-2">Items:</h3>
              <table className="w-full border text-sm text-gray-800">
                <thead>
                  <tr className="bg-yellow-300 text-blue-800 text-left">
                    <th className="p-2 border">Product No</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Qty</th>
                    <th className="p-2 border">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.productNumber} className="hover:bg-blue-50">
                      <td className="p-2 border">{item.productNumber}</td>
                      <td className="p-2 border">{item.name}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
