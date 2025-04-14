// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
      <div className="space-x-4">
        <Link to="/dashboard/profile" className="bg-green-500 text-white px-4 py-2 rounded">Profile</Link>
        <Link to="/dashboard/orders" className="bg-blue-500 text-white px-4 py-2 rounded">My Orders</Link>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
}
