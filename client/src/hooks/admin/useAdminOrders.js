import { useEffect, useState } from "react";
import { fetchOrders, updateOrder } from "../../services/admin/api.js";

export function useAdminOrders(page = 1, limit = 10) {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  // Fetch Orders
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchOrders(currentPage, limit);
        if (!data || data.orders.length === 0) {
          setError("No orders found.");
        } else {
          setOrders(data.orders);
          setTotalOrders(data.totalOrders);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
        }
      } catch (err) {
        console.error("Error fetching order list:", err);
        setError("Failed to load order list.");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [currentPage, limit]);

  // Update Order
  const handleUpdateOrder = async (orderId, updatedFields) => {
    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      const response = await updateOrder(orderId, updatedFields);

      const updatedOrder = response?.updatedOrder || {
        _id: orderId,
        ...updatedFields,
      };
      const message = response?.message || "Order updated successfully.";

      setUpdateSuccess(message);

      // Optional: update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, ...updatedOrder } : order
        )
      );

      return updatedOrder;
    } catch (error) {
      console.error("Error updating order:", error);
      setUpdateError(error.message || "Failed to update order.");
    } finally {
      setUpdating(false);
    }
  };

  return {
    orders,
    setOrders,
    totalOrders,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
    updating,
    updateError,
    updateSuccess,
    updateOrder: handleUpdateOrder,
  };
}
