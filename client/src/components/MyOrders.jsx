import { FcShipped } from "react-icons/fc"; 
import { FaShippingFast } from "react-icons/fa"; 
import React, { useState } from "react";
import useOrdersByEmail from "../hooks/useOrder";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const getStatusStyle = (status) => {
  const map = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    "Out for Delivery": "bg-indigo-100 text-indigo-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Returned: "bg-gray-200 text-gray-800",
  };
  return map[status] || "bg-gray-100 text-gray-700";
};

const MyOrders = () => {
  const { orders, loading, error } = useOrdersByEmail();
  const [selectedDate, setSelectedDate] = useState("all");

  const uniqueDates = Array.from(
    new Set(orders.map((order) => formatDate(order.createdAt)))
  );

  const filteredOrders =
    selectedDate === "all"
      ? orders
      : orders.filter((order) => formatDate(order.createdAt) === selectedDate);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-yellow-600 mb-8 border-b border-yellow-300 pb-4">
       <FcShipped className="inline text-6xl" /> My Orders
      </h1>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md shadow-md mb-8">
          <strong>Error:</strong> {error}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mb-8 flex items-center space-x-4">
          <label className="text-gray-700 font-semibold">Filter by Date:</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="all">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="bg-white rounded-lg shadow-lg p-8 h-56 flex flex-col justify-center"
            >
              <div className="bg-gray-200 h-6 w-1/2 mb-4 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/3 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <FaBoxOpen className="text-8xl text-yellow-500 mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              No Orders Yet
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-md">
              Looks like you haven't placed any orders yet. Start shopping to see
              your orders here.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow-md transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-3xl font-semibold text-gray-700 mb-3">
              No matching orders found
            </p>
            <p className="text-gray-500">
              Try selecting a different date filter.
            </p>
          </div>
        )
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-lg mb-8 border border-gray-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="space-y-2 mb-4 md:mb-0">
                <p className="text-sm text-gray-500 font-medium">
                  Order ID:{" "}
                  <span className="text-gray-900 font-semibold break-all">
                    {order._id}
                  </span>
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Date:{" "}
                  <span className="text-gray-900">{formatDate(order.createdAt)}</span>
                </p>
              </div>
              <div>
                <span
                  className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${getStatusStyle(
                    order.status
                  )} shadow-sm`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100">
                            <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Transaction ID:</strong> {order.transactionId}
                </p>
                <p>
                  <strong>Total Amount:</strong>{" "}
                  <span className="text-yellow-600 font-semibold text-lg">
                    ₹{order.totalPrice.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="space-y-2 text-gray-700 text-sm">
                {order.shippedDate && (
                  <p>
                    <strong>Shipped Date:</strong>{" "}
                    {formatDate(order.shippedDate)}
                  </p>
                )}
                {order.estimatedDeliveryDate && (
                  <p>
                    <strong>Estimated Delivery:</strong>{" "}
                    {formatDate(order.estimatedDeliveryDate)}
                  </p>
                )}
                {order.deliveredDate && (
                  <p>
                    <strong>Delivered Date:</strong>{" "}
                    {formatDate(order.deliveredDate)}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Order Items
              </h3>
              <table className="min-w-full border-collapse text-gray-700">
                <thead>
                  <tr className="bg-yellow-100 text-yellow-900 uppercase text-sm font-semibold tracking-wide">
                    <th className="p-3 text-left border border-yellow-300">
                      Product No
                    </th>
                    <th className="p-3 text-left border border-yellow-300">Name</th>
                    <th className="p-3 text-center border border-yellow-300">Qty</th>
                    <th className="p-3 text-right border border-yellow-300">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr
                      key={item.productNumber}
                      className="hover:bg-yellow-50 transition"
                    >
                      <td className="p-3 border border-gray-300">{item.productNumber}</td>
                      <td className="p-3 border border-gray-300">{item.name}</td>
                      <td className="p-3 text-center border border-gray-300">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right border border-gray-300">
                        ₹{item.price}
                      </td>
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
