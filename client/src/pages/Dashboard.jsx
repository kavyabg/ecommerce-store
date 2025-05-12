import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBox,
  FaShoppingCart,
  FaHeart,
  // FaHistory,
  FaHome,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = !user;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-pink-600">BlossomBeauty</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-white/80 backdrop-blur-lg shadow-xl md:rounded-r-3xl py-8 px-6 flex flex-col justify-between z-20`}
      >
        <div>
          <h1 className="hidden md:block text-3xl font-bold text-pink-600 mb-10 text-center">
            BlossomBeauty
          </h1>
          <nav className="space-y-6">
            <NavItem to="/dashboard" icon={<FaHome />} label="Home" />
            <NavItem to="/profile" icon={<FaUserCircle />} label="Profile" />
            <NavItem to="/my-orders" icon={<FaBox />} label="Orders" />
            <NavItem to="/cart" icon={<FaShoppingCart />} label="Cart" />
            <NavItem to="/wishlists" icon={<FaHeart />} label="Favourites" />
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-2 bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition shadow"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 md:p-12 overflow-y-auto">
        <header className="mb-10">
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-8 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                Hello, <span className="text-pink-500">{user?.username}</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600">{user?.email}</p>
            </>
          )}
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          ) : (
            <>
              <Card title="Quick Settings" icon={<FaUserCircle className="text-pink-500" />}>
                Manage account, update info, and secure settings.
              </Card>
              <Card title="Orders Overview" icon={<FaBox className="text-yellow-500" />}>
                Track, reorder, and manage your past purchases.
              </Card>
              <Card title="Your Cart" icon={<FaShoppingCart className="text-blue-500" />}>
                View and adjust your current shopping list.
              </Card>
              <Card title="Favourites" icon={<FaHeart className="text-red-400" />}>
                View and manage your saved products.
              </Card>
              {/* <Card title="Return History" icon={<FaHistory className="text-purple-500" />}>
                Track your returns and get support.
              </Card> */}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-100 transition"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-base">{label}</span>
    </Link>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm shadow-md rounded-2xl p-6 hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm md:text-base">{children}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 animate-pulse shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="h-5 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}
