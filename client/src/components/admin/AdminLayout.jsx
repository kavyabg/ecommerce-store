import { HiShoppingBag } from "react-icons/hi";
// src/components/admin/AdminLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaShippingFast,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <MdSpaceDashboard />,
      path: "/admin/dashboard",
    },
    { label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { label: "Products", icon: <HiShoppingBag />, path: "/admin/products" },
    { label: "Orders", icon: <FaShippingFast />, path: "/admin/orders" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-black overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-md border-r border-gray-200 p-6 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-10">
          {isSidebarOpen ? "Admin" : "A"}
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full px-2 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-300 text-white shadow font-semibold"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                <span
                  className={`text-xl flex-shrink-0 ${
                    isActive ? "text-white" : "text-blue-700"
                  }`}
                >
                  {item.icon}
                </span>
                {isSidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md border-b">
          <div className="flex items-center space-x-4">
            <button
              className="text-xl text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Admin Overview
            </h1>
          </div>

          {/* User Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <FaUserCircle className="text-2xl text-gray-700" />
              <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-1 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="p-1 rounded">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-red-100 text-red-700" : "text-red-600"
                        } block w-full rounded px-3 py-2 text-left text-sm font-semibold`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-auto h-full bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
