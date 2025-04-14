// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, name: 'Kavya B G' }); // Mocked user
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
