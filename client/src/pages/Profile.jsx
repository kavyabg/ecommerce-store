// src/pages/Profile.jsx
import { useAuth } from '../components/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
