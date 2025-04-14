import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50 text-center px-4">
      <h1 className="text-7xl font-extrabold text-pink-600 mb-4 drop-shadow-md">404</h1>
      <p className="text-2xl text-gray-700 mb-4 font-medium">Oops! This beauty page is missing.</p>
      <p className="text-lg text-gray-500 mb-8">We couldn’t find the page you’re looking for. But we have fabulous beauty picks waiting for you!</p>
      <Link
        to="/"
        className="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
