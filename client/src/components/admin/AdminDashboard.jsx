const AdminDashboard = () => {  
  return (
    <div>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Manage your platform efficiently.</p>
      </div>

      {/* Dashboard Cards */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 hover:bg-blue-200 transition-all p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-900 mb-1">
              Total Products
            </h3>
            <p className="text-3xl font-bold text-blue-900">250</p>
          </div>
          <div className="bg-green-100 hover:bg-green-200 transition-all p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-green-900 mb-1">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-green-900">1,500</p>
          </div>
          <div className="bg-yellow-100 hover:bg-yellow-200 transition-all p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-yellow-900 mb-1">
              Pending Orders
            </h3>
            <p className="text-3xl font-bold text-yellow-900">75</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
