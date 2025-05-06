import { useSelector } from 'react-redux';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaShieldAlt,
} from 'react-icons/fa';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-lg text-gray-500">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
            alt="avatar"
            className="w-24 h-24 mx-auto rounded-full border-4 border-yellow-400 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4 flex items-center justify-center gap-2">
            <FaUser className="text-yellow-500" />
            {user.username}
          </h2>
          <p className="text-sm text-gray-500">Dashboard Profile</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-4 text-gray-700">
          <ProfileDetail icon={<FaEnvelope className="text-blue-600" />} label="Email" value={user.email} />
          <ProfileDetail icon={<FaPhoneAlt className="text-green-600" />} label="Phone" value={user.phone} />
          <ProfileDetail icon={<FaShieldAlt className="text-purple-600" />} label="Role" value={user.role} />
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
