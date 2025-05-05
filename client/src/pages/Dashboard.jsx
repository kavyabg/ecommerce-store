import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCog, FaBoxOpen, FaClipboardList, FaHeart, FaHistory, FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; 

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen rounded bg-blue-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl rounded-lg px-6 py-8 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-12">BlossomBeauty</h1>
          <nav className="space-y-6">
            <Link to="/dashboard" className="flex items-center space-x-3 text-yellow-500 font-semibold hover:text-yellow-600 transition duration-300">
              <FaHome className="text-lg" /> <span>Dashboard</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-3 text-gray-700 hover:text-yellow-500 transition duration-300">
              <FaUserCog className="text-lg" /> <span>Profile</span>
            </Link>

            <h4 className="mt-8 mb-2 text-gray-500 text-sm uppercase">Orders and List</h4>
            <Link to="/my-orders" className="flex items-center space-x-3 text-gray-700 hover:text-yellow-500 transition duration-300">
              <FaBoxOpen className="text-lg" /> <span>My Orders</span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-3 text-gray-700 hover:text-yellow-500 transition duration-300">
              <FaClipboardList className="text-lg" /> <span>My Cart</span>
            </Link>
            <Link to="/favourites" className="flex items-center space-x-3 text-gray-700 hover:text-yellow-500 transition duration-300">
              <FaHeart className="text-lg" /> <span>My Favourites</span>
            </Link>
            <Link to="/returns" className="flex items-center space-x-3 text-gray-700 hover:text-yellow-500 transition duration-300">
              <FaHistory className="text-lg" /> <span>Return History</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition duration-300 mt-8"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-800">
              Welcome, <span className="text-yellow-600">{user?.name}</span>
            </h2>
            <p className="text-lg text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-yellow-500">Profile Settings</h3>
              <FaUserCog className="text-yellow-500 text-2xl" />
            </div>
            <ul className="text-gray-700 space-y-4 text-sm">
              <li className="flex items-center space-x-3"><FaBoxOpen className="text-yellow-500 text-2xl" /> <span>Store and manage multiple shipping/billing addresses</span></li>
              <li className="flex items-center space-x-3"><FaClipboardList className="text-yellow-500" /> <span>Ensure accurate deliveries with correct info</span></li>
              <li className="flex items-center space-x-3"><FaHeart className="text-yellow-500" /> <span>Quickly select saved addresses at checkout</span></li>
              <li className="flex items-center space-x-3"><FaSignOutAlt className="text-yellow-500" /> <span>Reset or recover login credentials securely</span></li>
            </ul>
          </div>

          {/* My Cart */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-blue-600">My Cart</h3>
              <FaClipboardList className="text-blue-500 text-2xl" />
            </div>
            <ul className="text-gray-700 space-y-4 text-sm">
              <li className="flex items-center space-x-3"><FaBoxOpen className="text-blue-500" /> <span>Track what's needed and purchased</span></li>
              <li className="flex items-center space-x-3"><FaClipboardList className="text-blue-500" /> <span>Save & organize for future reordering</span></li>
              <li className="flex items-center space-x-3"><FaHeart className="text-blue-500" /> <span>Share with team for coordination</span></li>
              <li className="flex items-center space-x-3"><FaBoxOpen className="text-blue-500" /> <span>Simplify bulk ordering</span></li>
            </ul>
          </div>

          {/* My Orders */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-yellow-500">My Orders</h3>
              <FaClipboardList className="text-yellow-500 text-2xl" />
            </div>
            <ul className="text-gray-700 space-y-4 text-sm">
              <li className="flex items-center space-x-3"><FaBoxOpen className="text-yellow-500" /> <span>View and track your placed orders</span></li>
              <li className="flex items-center space-x-3"><FaHistory className="text-yellow-500" /> <span> Reorder items from previous purchases</span></li>
              <li className="flex items-center space-x-3"><FaClipboardList className="text-yellow-500" /> <span> Check estimated delivery timelines</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
