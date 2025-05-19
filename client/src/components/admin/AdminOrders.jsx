import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useAdminOrders } from "../../hooks/admin/useAdminOrders";

const AdminOrders = () => {
  const {
    orders,
    setOrders,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    updateOrder,
    updating,
    updateError,
    updateSuccess,
  } = useAdminOrders();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formValues, setFormValues] = useState({
    status: "",
    paymentStatus: "",
    shippedDate: "",
    estimatedDeliveryDate: "",
    deliveredDate: "",
  });

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setFormValues({
      status: order.status,
      paymentStatus: order.paymentStatus,
      shippedDate: order.shippedDate ? order.shippedDate.split("T")[0] : "",
      estimatedDeliveryDate: order.estimatedDeliveryDate
        ? order.estimatedDeliveryDate.split("T")[0]
        : "",
      deliveredDate: order.deliveredDate
        ? order.deliveredDate.split("T")[0]
        : "",
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const { status, shippedDate, estimatedDeliveryDate, deliveredDate } =
      formValues;

    if (
      (status === "Shipped" || status === "Delivered") &&
      (!shippedDate || !estimatedDeliveryDate)
    ) {
      alert(
        "Shipped Date and Estimated Delivery Date are required for Shipped or Delivered status."
      );
      return;
    }

    if (status === "Delivered" && !deliveredDate) {
      alert("Delivered Date is required for Delivered status.");
      return;
    }

    if (!selectedOrder) return;

    const updated = await updateOrder(selectedOrder._id, formValues);

    if (updated && updated._id) {
      // Normalize dates before setting state to ensure UI renders correctly
      const normalizedOrder = {
        ...updated,
        shippedDate: updated.shippedDate
          ? updated.shippedDate.split("T")[0]
          : "",
        estimatedDeliveryDate: updated.estimatedDeliveryDate
          ? updated.estimatedDeliveryDate.split("T")[0]
          : "",
        deliveredDate: updated.deliveredDate
          ? updated.deliveredDate.split("T")[0]
          : "",
      };

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updated._id ? { ...order, ...normalizedOrder } : order
        )
      );
      setIsModalOpen(false);
    }
  };

  // Status badge colors
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-indigo-100 text-indigo-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Order Management
      </h1>

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
                      <td className="p-3">
                        {index + 1 + (currentPage - 1) * 10}
                      </td>
                      <td className="p-3">{order.customer.name}</td>
                      <td className="p-3">{order.customer.email}</td>
                      <td className="p-3">₹{order.totalPrice}</td>
                      <td className="p-3">{order.transactionId}</td>
                      <td className="p-3">
                        <span
                          className={`inline-block text-xs font-semibold px-2 py-1 rounded ${getStatusBadgeClass(order.status)}`}
                        >
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
                        <button
                          className="text-yellow-600 hover:text-yellow-800"
                          onClick={() => handleEditClick(order)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Edit Order</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formValues.status}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending Cancellation">Pending Cancellation</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Payment Status
              </label>
              <select
                name="paymentStatus"
                value={formValues.paymentStatus}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            {/* Date fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Shipped Date
              </label>
              <input
                type="date"
                name="shippedDate"
                value={formValues.shippedDate}
                onChange={handleFormChange}
                required={
                  formValues.status === "Shipped" ||
                  formValues.status === "Delivered"
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Estimated Delivery Date
              </label>
              <input
                type="date"
                name="estimatedDeliveryDate"
                value={formValues.estimatedDeliveryDate}
                onChange={handleFormChange}
                required={
                  formValues.status === "Shipped" ||
                  formValues.status === "Delivered"
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Delivered Date
              </label>
              <input
                type="date"
                name="deliveredDate"
                value={formValues.deliveredDate}
                onChange={handleFormChange}
                required={formValues.status === "Delivered"}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {updateError && (
              <p className="text-red-500 text-sm">{updateError}</p>
            )}
            {updateSuccess && (
              <p className="text-green-500 text-sm">{updateSuccess}</p>
            )}

            <div className="flex justify-end mt-6 space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
