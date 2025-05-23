import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./components/admin/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./components/CartContext";
import CartPage from "./pages/CartPage";
import Checkout from "./components/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/admin/AdminRoute";
import MyOrders from "./components/MyOrders";
import Profile from "./pages/Profile";
import Wishlist from "./components/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SessionManager from "./components/SessionManager";

// Admin layout and pages
import AdminLayout from "./components/admin/AdminLayout";
import UserList from "./components/admin/UserList";
import AdminProducts from "./components/admin/AdminProducts";
import AdminOrders from "./components/admin/AdminOrders";

// Layout for non-admin pages
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const paddingClass = isAdminRoute ? "px-0 py-0" : "px-4 sm:px-8 py-4";

  return (
    <>
      <SessionManager />
      {!isAdminRoute && <Header />}
      <main className={`min-h-screen bg-gray-50 ${paddingClass}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
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
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:productNumber" element={<ProductDetail />} />
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

            {/* Admin login (standalone) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes with Sidebar Layout */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserList />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
