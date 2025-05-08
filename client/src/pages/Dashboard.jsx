import { Link, useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBox,
  FaShoppingCart,
  FaHeart,
  FaHistory,
  FaHome,
} from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-200 to-purple-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-lg shadow-xl rounded-r-3xl py-8 px-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pink-600 mb-10 text-center">BlossomBeauty</h1>
          <nav className="space-y-6">
            <NavItem to="/dashboard" icon={<FaHome />} label="Home" />
            <NavItem to="/profile" icon={<FaUserCircle />} label="Profile" />
            <NavItem to="/my-orders" icon={<FaBox />} label="Orders" />
            <NavItem to="/cart" icon={<FaShoppingCart />} label="Cart" />
            <NavItem to="/wishlists" icon={<FaHeart />} label="Favourites" />
            <NavItem to="/returns" icon={<FaHistory />} label="Returns" />
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
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Hello, <span className="text-pink-500">{user?.username}</span>
          </h2>
          <p className="text-lg text-gray-600">{user?.email}</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="Quick Settings" icon={<FaUserCircle className="text-pink-500" />}>Manage account, update info, and secure settings.</Card>
          <Card title="Orders Overview" icon={<FaBox className="text-yellow-500" />}>Track, reorder, and manage your past purchases.</Card>
          <Card title="Your Cart" icon={<FaShoppingCart className="text-blue-500" />}>View and adjust your current shopping list.</Card>
          <Card title="Favourites" icon={<FaHeart className="text-red-400" />}>View and manage your saved products.</Card>
          <Card title="Return History" icon={<FaHistory className="text-purple-500" />}>Track your returns and get support.</Card>
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
      <span>{label}</span>
    </Link>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm shadow-md rounded-2xl p-6 hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  );
}
