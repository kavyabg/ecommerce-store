import { useEffect, useState } from 'react';
import { getOrdersByEmail } from '../services/api';

const useOrdersByEmail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.email) {
          throw new Error('User email not found in localStorage');
        }

        const orderData = await getOrdersByEmail(user.email);
        setOrders(orderData);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrdersByEmail;
