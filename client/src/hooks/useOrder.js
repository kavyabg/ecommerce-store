import { useEffect, useState, useCallback } from "react";
import { getOrdersByEmail } from "../services/api";
import { useSelector } from "react-redux";

const useOrdersByEmail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  // useCallback to memoize fetchOrders function
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user?.email) {
        throw new Error("User email not found");
      }

      const orderData = await getOrdersByEmail(user.email);
      setOrders(orderData);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
};

export default useOrdersByEmail;
