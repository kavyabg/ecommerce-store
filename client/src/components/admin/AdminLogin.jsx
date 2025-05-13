import { useNavigate } from "react-router-dom";
import useAdminLogin from "../../hooks/admin/useAdminLogin";
import { FaSignInAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const AdminLogin = () => {
  const { formData, error, handleChange, handleLogin } = useAdminLogin();
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-300">
      {/* Left Side Image */}
      <div className="w-1/2 hidden lg:block relative">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=800"
          alt="Admin Login"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
        <div className="absolute top-4 left-4 text-white text-4xl font-bold bg-red-600 rounded-md shadow-lg p-1">
          <IoMdLogOut
            onClick={handleExit}
            className="cursor-pointer hover:text-gray-300 transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Side Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-700">
            Admin Login
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-8 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </button>

            <button
              type="button"
              onClick={handleExit}
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <IoMdLogOut className="mr-2 text-xl font-bold" />
              Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
