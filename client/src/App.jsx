import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import { CartProvider } from './components/CartContext';
import CartPage from './pages/CartPage';
import Checkout from './components/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './components/AdminLogin';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import MyOrders from './components/MyOrders';
import Profile from './pages/Profile';
import Wishlist from './components/Wishlist';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if we're on an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Apply different padding if it's an admin route
  const paddingClass = isAdminRoute ? 'px-0 py-0' : 'px-4 sm:px-8 py-4';

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={`min-h-screen bg-gray-50 ${paddingClass}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />} {/* Only show Footer if not on admin route */}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productNumber" element={<ProductDetail />} />

            {/* Admin-only protected route */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Admin login accessible by anyone */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/wishlists"
              element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
