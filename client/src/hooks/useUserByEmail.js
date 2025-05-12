import { useState, useEffect } from 'react';
import { getUserByEmail } from '../services/api';

export const useUserByEmail = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchUser = async () => {
      try {
            const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.email) {
          throw new Error('User email not found in localStorage');
        }
        const data = await getUserByEmail(user.email);
        setUserData(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { userData, loading, error };
};
