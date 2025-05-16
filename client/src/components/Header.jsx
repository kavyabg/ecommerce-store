import { CgClose } from "react-icons/cg";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import {
  FaCartShopping,
  FaBluesky,
  FaBars,
  FaUser,
  FaBox,
} from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";

function Header() {
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // If dropdown is open, and click is outside both dropdown refs, close it
      if (
        showDropdown &&
        !(
          (desktopDropdownRef.current &&
            desktopDropdownRef.current.contains(event.target)) ||
          (mobileDropdownRef.current &&
            mobileDropdownRef.current.contains(event.target))
        )
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl sm:text-3xl font-extrabold text-white hover:text-yellow-300 transition duration-300"
          >
            <FaBluesky className="mr-2 text-5xl sm:text-4xl text-yellow-400" />
            BlossomBeauty
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/login"
              className="text-base font-semibold hover:text-yellow-300 transition"
            >
              Admin
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-base font-semibold hover:text-yellow-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-base font-semibold hover:text-yellow-300 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center text-yellow-300 font-medium hover:text-white transition duration-200"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-yellow-400 shadow-md"
                  />

                  <div className="flex items-center bg-white/30 text-white px-2 py-1 rounded-lg ml-1">
                    <span className="capitalize">
                      {user?.username || "Guest"}
                    </span>
                    <IoMdArrowDropdown
                      className={`w-6 h-6 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute left-0 mt-1 min-w-[150px] bg-white text-gray-800 rounded-md shadow-xl border border-gray-200 overflow-hidden z-50 animate-fade-in">
                    <Link
                      to="/profile"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 transition flex items-center gap-2"
                    >
                      <FaUser className="text-gray-600" />
                      Profile
                    </Link>

                    <Link
                      to="/cart"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 transition flex items-center gap-2"
                    >
                      <FaCartShopping className="text-gray-600" />
                      My Cart
                    </Link>

                    <Link
                      to="/my-orders"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 transition flex items-center gap-2"
                    >
                      <FaBox className="text-gray-600" />
                      My Orders
                    </Link>

                    <Link
                      to="/wishlists"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 transition flex items-center gap-2"
                    >
                      <MdFavorite className="text-gray-600 text-base" />
                      My Favorites
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 transition flex items-center gap-2"
                    >
                      <IoLogOut className="text-gray-600 text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          <div className="flex gap-2">
            {/* Cart Icon */}
            <div className="relative ml-1">
              <Link
                to="/cart"
                className="text-white text-2xl hover:text-yellow-300 transition"
              >
                <FaCartShopping size={28} />
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center ml-2">
              <button
                onClick={toggleMenu}
                className="text-white text-xl focus:outline-none"
              >
                {mobileMenuOpen ? <CgClose className="text-2xl" /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-700 to-blue-500 px-6 pb-4 space-y-3">
          <Link
            onClick={closeMenu}
            to="/"
            className="block text-white font-medium hover:text-yellow-300"
          >
            Home
          </Link>
          <Link
            onClick={closeMenu}
            to="/dashboard"
            className="block text-white font-medium hover:text-yellow-300"
          >
            Dashboard
          </Link>
          <Link
            onClick={closeMenu}
            to="/admin/login"
            className="block text-white font-medium hover:text-yellow-300"
          >
            Admin
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                onClick={closeMenu}
                to="/login"
                className="block text-white font-medium hover:text-yellow-300"
              >
                Login
              </Link>
              <Link
                onClick={closeMenu}
                to="/register"
                className="block text-white font-medium hover:text-yellow-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div ref={mobileDropdownRef}>
                <div
                  className="flex items-center justify-between text-white font-medium space-x-2 cursor-pointer"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border-2 border-yellow-400 shadow-md"
                    />
                    <span className="capitalize">{user?.username}</span>
                  </div>
                  <IoMdArrowDropdown
                    className={`w-6 h-6 transition-transform duration-300 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown && (
                  <div className="mt-1 bg-white text-gray-800 rounded-md shadow-md overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm hover:bg-yellow-50 flex items-center gap-2"
                    >
                      <FaUser className="text-gray-600" />
                      Profile
                    </Link>
                    <Link
                      to="/cart"
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm hover:bg-yellow-50 flex items-center gap-2"
                    >
                      <FaCartShopping className="text-gray-600" />
                      My Cart
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm hover:bg-yellow-50 flex items-center gap-2"
                    >
                      <FaBox className="text-gray-600" />
                      My Orders
                    </Link>
                    <Link
                      to="/wishlists"
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm hover:bg-yellow-50 flex items-center gap-2"
                    >
                      <MdFavorite className="text-gray-600" />
                      My Favorites
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 flex items-center gap-2"
                    >
                      <IoLogOut className="text-gray-600" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
