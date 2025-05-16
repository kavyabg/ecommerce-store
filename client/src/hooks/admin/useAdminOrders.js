import { useEffect, useState } from "react";
import { fetchOrders } from "../../services/admin/api.js";

export function useAdminOrders(page = 1, limit = 10) {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
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

  return {
    orders,
    totalOrders,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
  };
}
