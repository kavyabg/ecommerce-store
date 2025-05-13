// src/admin/AdminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxes,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { label: "Products", icon: <FaBoxes />, path: "/admin/products" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-10">Admin</h2>
        <nav className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center w-full px-4 py-2 text-left rounded-md transition-all duration-200 hover:bg-blue-400 hover:text-white"
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="text-base font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative overflow-auto">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-5 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>

        {/* Render current route inside layout */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
