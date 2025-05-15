import { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

const AdminOrders = () => {
  const [orders] = useState([
    {
      _id: "1",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        contact: "1234567890",
        address: "123 Main St, City",
      },
      items: [
        {
          productNumber: "P001",
          name: "Product A",
          price: 30,
          quantity: 2,
        },
      ],
      totalPrice: 60,
      transactionId: "TX12345",
      status: "Confirmed",
      paymentStatus: "Paid",
      createdAt: "2024-05-01T10:30:00Z",
    },
    {
      _id: "2",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        contact: "9876543210",
        address: "456 Park Ave, City",
      },
      items: [
        {
          productNumber: "P002",
          name: "Product B",
          price: 45,
          quantity: 1,
        },
      ],
      totalPrice: 45,
      transactionId: "TX67890",
      status: "Processing",
      paymentStatus: "Unpaid",
      createdAt: "2024-05-05T12:00:00Z",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Email</th>
              <th className="p-3">Total</th>
              <th className="p-3">Transaction</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-3 text-center">
                  No orders available.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order.customer.name}</td>
                  <td className="p-3">{order.customer.email}</td>
                  <td className="p-3">${order.totalPrice}</td>
                  <td className="p-3">{order.transactionId}</td>
                  <td className="p-3">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
