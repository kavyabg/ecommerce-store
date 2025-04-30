import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { FaSignOutAlt, FaUserCog, FaBoxOpen, FaClipboardList, FaHeart, FaHistory, FaHome } from 'react-icons/fa';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-6 py-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 mb-10">Chemikart</h1>
          <nav className="space-y-4">
            <Link to="/dashboard" className="flex items-center space-x-3 text-yellow-500 font-semibold">
              <FaHome /> <span>Dashboard</span>
            </Link>
            <Link to="/dashboard/profile" className="flex items-center space-x-3 text-gray-600 hover:text-yellow-500">
              <FaUserCog /> <span>Profile</span>
            </Link>

            <h4 className="mt-6 mb-2 text-gray-500 text-sm uppercase">Orders and List</h4>
            <Link to="/my-orders" className="flex items-center space-x-3 text-gray-600 hover:text-yellow-500">
              <FaBoxOpen /> <span>My Orders</span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-3 text-gray-600 hover:text-yellow-500">
              <FaClipboardList /> <span>My Cart</span>
            </Link>
            <Link to="/dashboard/favourites" className="flex items-center space-x-3 text-gray-600 hover:text-yellow-500">
              <FaHeart /> <span>My Favourites</span>
            </Link>
            <Link to="/dashboard/returns" className="flex items-center space-x-3 text-gray-600 hover:text-yellow-500">
              <FaHistory /> <span>Return History</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-blue-800">Welcome, <span className="text-yellow-600">{user?.name}</span></h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-yellow-500">Profile Settings</h3>
              <FaUserCog className="text-yellow-500" />
            </div>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>✅ Store and manage multiple shipping/billing addresses</li>
              <li>✅ Ensure accurate deliveries with correct info</li>
              <li>✅ Quickly select saved addresses at checkout</li>
              <li>✅ Reset or recover login credentials securely</li>
            </ul>
          </div>

          {/* My Cart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-blue-600">My Cart</h3>
              <FaClipboardList className="text-blue-500" />
            </div>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>✅ Track what's needed and purchased</li>
              <li>✅ Save & organize for future reordering</li>
              <li>✅ Share with team for coordination</li>
              <li>✅ Simplify bulk ordering</li>
            </ul>
          </div>

          {/* My Quotes */}
          <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-yellow-500">My Orders</h3>
            <FaClipboardList className="text-yellow-500" />
          </div>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>📦 View and track your placed orders</li>
            <li>🔄 Reorder items from previous purchases</li>
            <li>📅 Check estimated delivery timelines</li>
          </ul>
        </div>
        </div>
      </main>
    </div>
  );
}
