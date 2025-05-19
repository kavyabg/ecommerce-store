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
  const [formErrors, setFormErrors] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setFormValues({
      status: order.status,
      paymentStatus: order.paymentStatus,
      shippedDate: order.shippedDate ? order.shippedDate.split("T")[0] : "",
      estimatedDeliveryDate: order.estimatedDeliveryDate
        ? order.estimatedDeliveryDate.split("T")[0]
        : "",
      deliveredDate: order.deliveredDate ? order.deliveredDate.split("T")[0] : "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const { status, shippedDate, estimatedDeliveryDate, deliveredDate } = formValues;

    if (status === "Shipped" || status === "Delivered") {
      if (!shippedDate) errors.shippedDate = "Shipped Date is required.";
      if (!estimatedDeliveryDate) errors.estimatedDeliveryDate = "Estimated Delivery Date is required.";
    }
    if (status === "Delivered" && !deliveredDate) {
      errors.deliveredDate = "Delivered Date is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    if (!selectedOrder) return;

    const updated = await updateOrder(selectedOrder._id, formValues);
    if (updated && updated._id) {
      const normalizedOrder = {
        ...updated,
        shippedDate: updated.shippedDate ? updated.shippedDate.split("T")[0] : "",
        estimatedDeliveryDate: updated.estimatedDeliveryDate
          ? updated.estimatedDeliveryDate.split("T")[0]
          : "",
        deliveredDate: updated.deliveredDate ? updated.deliveredDate.split("T")[0] : "",
      };
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updated._id ? { ...order, ...normalizedOrder } : order
        )
      );
      setIsModalOpen(false);
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

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
      case "Pending Cancellation":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>

      <div className="flex justify-end mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2"
          aria-label="Filter orders by status"
        >
          <option value="All">All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pending Cancellation">Pending Cancellation</option>
        </select>
      </div>

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
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="p-3 text-center">
                      No orders available.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
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
                          className={`inline-block text-xs font-semibold px-2 py-1 rounded ${getStatusBadgeClass(
                            order.status
                          )}`}
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
                          aria-label={`Edit order ${order._id}`}
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

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Edit Order #{selectedOrder._id}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              noValidate
            >
              <label className="block mb-2">
                Status:
                <select
                  name="status"
                  value={formValues.status}
                  onChange={handleFormChange}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Pending Cancellation">Pending Cancellation</option>
                </select>
              </label>

              <label className="block mb-2">
                Payment Status:
                <select
                  name="paymentStatus"
                  value={formValues.paymentStatus}
                  onChange={handleFormChange}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </label>

              {(formValues.status === "Shipped" || formValues.status === "Delivered") && (
                <>
                  <label className="block mb-2">
                    Shipped Date:
                    <input
                      type="date"
                      name="shippedDate"
                      value={formValues.shippedDate}
                      onChange={handleFormChange}
                      className={`w-full border rounded px-2 py-1 ${
                        formErrors.shippedDate ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.shippedDate && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.shippedDate}</p>
                    )}
                  </label>

                  <label className="block mb-2">
                    Estimated Delivery Date:
                    <input
                      type="date"
                      name="estimatedDeliveryDate"
                      value={formValues.estimatedDeliveryDate}
                      onChange={handleFormChange}
                      className={`w-full border rounded px-2 py-1 ${
                        formErrors.estimatedDeliveryDate ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.estimatedDeliveryDate && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.estimatedDeliveryDate}</p>
                    )}
                  </label>
                </>
              )}

              {formValues.status === "Delivered" && (
                <label className="block mb-2">
                  Delivered Date:
                  <input
                    type="date"
                    name="deliveredDate"
                    value={formValues.deliveredDate}
                    onChange={handleFormChange}
                    className={`w-full border rounded px-2 py-1 ${
                      formErrors.deliveredDate ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.deliveredDate && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.deliveredDate}</p>
                  )}
                </label>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>

              {updateError && (
                <p className="text-red-600 mt-3 text-center">{updateError}</p>
              )}

              {updateSuccess && (
                <p className="text-green-600 mt-3 text-center">Order updated successfully!</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
