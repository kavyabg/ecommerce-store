import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </div>
  );
}

export default NotFound;
