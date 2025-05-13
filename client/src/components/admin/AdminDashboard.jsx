import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxes,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");

    // Redirect to login page
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Admin Dashboard</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center text-white hover:bg-blue-700 p-2 rounded-md">
            <FaTachometerAlt className="mr-3" /> Dashboard
          </button>
          <button className="w-full flex items-center text-white hover:bg-blue-700 p-2 rounded-md">
            <FaUsers className="mr-3" /> Users
          </button>
          <button className="w-full flex items-center text-white hover:bg-blue-700 p-2 rounded-md">
            <FaBoxes className="mr-3" /> Products
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Top Right Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <FaSignOutAlt className="mr-2 text-xl font-bold" />
          Logout
        </button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome, Admin!
          </h2>
          <p className="text-gray-600 mb-6">
            Manage products, users, and orders here.
          </p>

          {/* Dashboard Stats or Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-900">
                Total Products
              </h3>
              <p className="text-3xl text-blue-900">250</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-900">
                Total Users
              </h3>
              <p className="text-3xl text-green-900">1,500</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-yellow-900">
                Pending Orders
              </h3>
              <p className="text-3xl text-yellow-900">75</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
