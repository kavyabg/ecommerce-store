import { useState } from 'react';
import { login as loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await loginUser(formData);
      setResponseData(data);

      // Save token and user info to context (e.g., AuthContext)
      login({
        token: data.token,
        email: data.email,
        name: data.name, // optional
      });

      // Redirect to dashboard or wherever needed
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, responseData };
}
