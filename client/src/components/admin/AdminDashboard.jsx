import { FaBoxOpen, FaUsers, FaShoppingCart } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-10">
      {/* Page Header */}
      <header className="mb-12 text-center text-white max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Dashboard Overview
        </h1>
        <p className="mt-3 text-xl text-indigo-200 font-light">
          Manage your platform efficiently with real-time insights and stats.
        </p>
      </header>

      {/* Dashboard Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Total Products */}
        <div className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer p-8 flex flex-col items-center text-white">
          <FaBoxOpen className="text-6xl mb-5 drop-shadow-md" />
          <h3 className="text-2xl font-semibold mb-2 tracking-wide">Total Products</h3>
          <p className="text-5xl font-extrabold tracking-wider">12</p>
          <span className="mt-3 text-blue-200 font-light text-sm uppercase tracking-wide">
            Updated just now
          </span>
        </div>

        {/* Card 2: Total Users */}
        <div className="bg-gradient-to-tr from-green-600 to-green-400 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer p-8 flex flex-col items-center text-white">
          <FaUsers className="text-6xl mb-5 drop-shadow-md" />
          <h3 className="text-2xl font-semibold mb-2 tracking-wide">Total Users</h3>
          <p className="text-5xl font-extrabold tracking-wider">4</p>
          <span className="mt-3 text-green-200 font-light text-sm uppercase tracking-wide">
            Active this month
          </span>
        </div>

        {/* Card 3: Pending Orders */}
        <div className="bg-gradient-to-tr from-yellow-500 to-yellow-300 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer p-8 flex flex-col items-center text-white">
          <FaShoppingCart className="text-6xl mb-5 drop-shadow-md" />
          <h3 className="text-2xl font-semibold mb-2 tracking-wide">Pending Orders</h3>
          <p className="text-5xl font-extrabold tracking-wider">5</p>
          <span className="mt-3 text-yellow-100 font-light text-sm uppercase tracking-wide">
            Needs your attention
          </span>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
