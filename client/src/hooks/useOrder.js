import { useEffect, useState } from "react";
import { getOrdersByEmail } from "../services/api";
import { useSelector } from "react-redux";

const useOrdersByEmail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.email) {
          throw new Error("User email not found in localStorage");
        }

        const orderData = await getOrdersByEmail(user.email);
        setOrders(orderData);
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrdersByEmail;
