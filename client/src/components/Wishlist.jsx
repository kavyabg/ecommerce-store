import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart } from '../components/CartContext';
import { removeFromWishlist, clearWishlist } from '../redux/slices/wishlistSlice';
import { FaShoppingCart, FaTrash, FaPlus, FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000); // Simulated loading
    return () => clearTimeout(timeout);
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    dispatch(removeFromWishlist(item.productNumber));
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item));
    dispatch(clearWishlist());
  };

  const handleClearAllWishlist = () => {
    dispatch(clearWishlist());
  };

  const handleDelete = (productNumber) => {
    dispatch(removeFromWishlist(productNumber));
  };

  const filteredItems = useMemo(() => {
    return wishlistItems
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item => {
        if (!dateFilter) return true;
        const addedDate = new Date(item.addedAt).toISOString().slice(0, 10);
        return addedDate === dateFilter;
      });
  }, [wishlistItems, searchTerm, dateFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Wishlist</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by product name..."
          className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-yellow-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-yellow-400"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <button
          className="bg-yellow-500 text-white font-semibold px-5 py-2 rounded hover:bg-yellow-500 flex items-center gap-2 transition duration-300 shadow"
          onClick={handleAddAllToCart}
          disabled={wishlistItems.length === 0}
        >
          <FaPlus /> Add All to Cart
        </button>
                <button
          className="bg-red-500 text-white font-semibold px-5 py-2 rounded hover:bg-red-400 flex items-center gap-2 transition duration-300 shadow"
          onClick={handleClearAllWishlist}
          disabled={wishlistItems.length === 0}
        >
          <FaTrash /> Delete All Wishlists
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(skeleton => (
            <div key={skeleton} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
        </div>
        ) : wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6">
            <FaCartPlus className="text-7xl text-yellow-500 mb-6 drop-shadow-lg" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h2>
            <p className="text-md text-gray-600 mb-6">Looks like you haven't added anything yet.</p>
            <Link
            to="/"
            className="inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition duration-300 shadow"
            >
            Start Shopping
            </Link>
        </div>
        ) : filteredItems.length === 0 ? (
        <div className="text-center py-24">
            <p className="text-2xl font-semibold text-gray-700 mb-2">No matching wishlist records found</p>
            <p className="text-gray-500">Try adjusting your search or date filter.</p>
        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
            <div
                key={item.productNumber}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                <p className="text-gray-700 font-medium mb-1">₹{item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400 mb-4">Added: {formatDate(item.addedAt)}</p>

                <div className="flex gap-2">
                <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-yellow-400 text-sm text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-300 flex items-center gap-2 shadow"
                >
                    <FaShoppingCart /> Add to Cart
                </button>
                <button
                    onClick={() => handleDelete(item.productNumber)}
                    className="bg-red-500 text-sm text-white px-4 py-2 rounded-lg hover:bg-red-400 flex items-center gap-2 shadow"
                >
                    <FaTrash /> Delete
                </button>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
  );
};

export default Wishlist;
