import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useForgotPassword } from "../hooks/useForgotPassword"; // adjust path as needed

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { loading, message, error, submitForgotPassword } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForgotPassword(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Forgot Your Password?
        </h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Go back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
