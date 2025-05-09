import { useState } from 'react';
import { forgotPassword } from '../services/api';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitForgotPassword = async (email) => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const data = await forgotPassword(email);
      setMessage(data.message || 'Password reset link sent to your email.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    error,
    submitForgotPassword,
  };
};
