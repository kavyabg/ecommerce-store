import { FaEye, FaEdit } from "react-icons/fa";
import { useAdminOrders } from "../../hooks/admin/useAdminOrders";
const AdminOrders = () => {
  const {
    orders,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useAdminOrders();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
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
                      <td className="p-3">{index + 1 + (currentPage - 1) * 10}</td>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminOrders;
