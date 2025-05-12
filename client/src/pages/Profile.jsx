import { useUserByEmail } from '../hooks/useUserByEmail';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaShieldAlt,
  FaExclamationTriangle,
} from 'react-icons/fa';

export default function Profile() {
  const { userData, loading, error } = useUserByEmail();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-16 px-6 animate-pulse">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />
            <div className="h-6 w-1/2 mx-auto bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/3 mx-auto bg-gray-100 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 mb-2 rounded" />
                  <div className="h-5 w-full bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <p className="text-lg text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <FaUser className="text-gray-400 text-5xl mb-4" />
        <p className="text-lg text-gray-500 font-medium">No user data found.</p>
        <p className="text-sm text-gray-400">We couldn’t find any profile details for this account.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.username}`}
            alt="avatar"
            className="w-24 h-24 mx-auto rounded-full border-4 border-yellow-400 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4 flex items-center justify-center gap-2">
            <FaUser className="text-yellow-500" />
            {userData.username}
          </h2>
          <p className="text-sm text-gray-500">Dashboard Profile</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-4 text-gray-700">
          <ProfileDetail icon={<FaEnvelope className="text-blue-600" />} label="Email" value={userData.email} />
          <ProfileDetail icon={<FaPhoneAlt className="text-green-600" />} label="Phone" value={userData.phone} />
          <ProfileDetail icon={<FaShieldAlt className="text-purple-600" />} label="Role" value={userData.role} />
        </div>
      </div>
    </div>
  );
}

function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
      <div className="text-xl">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}
