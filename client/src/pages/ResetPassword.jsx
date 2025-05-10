import { useState } from 'react';
import { useLocation } from 'react-router-dom';  
import { resetPassword } from '../services/api'; 

function ResetPassword() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token'); 

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await resetPassword(token, password);
      setMessage(response.message);  
    } catch (err) {
      setError(err.message);  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your new password"
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm !mt-1">{error}</p>}
          {/* Success message */}
          {message && <p className="text-green-500 text-sm !mt-1">{message}</p>}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading} 
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
