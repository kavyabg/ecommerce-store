import React from 'react';
import useAdminLogin from '../hooks/useAdminLogin';

const AdminLogin = () => {
  const { formData, error, handleChange, handleLogin } = useAdminLogin();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="w-1/2 hidden lg:block">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=800"
          alt="Admin Login"
          className="object-cover w-full h-full rounded"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg border border-gray-200 rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Admin Login</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
