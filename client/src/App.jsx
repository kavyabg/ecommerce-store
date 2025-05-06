import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import { CartProvider } from './components/CartContext';
// import { AuthProvider } from './components/AuthContext';
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

function App() {
  return (
    // <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <main className="min-h-screen bg-gray-50 px-4 sm:px-8 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productNumber" element={<ProductDetail />} />
              
              {/* Admin-only protected route */}
              <Route
                path="/admin"
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
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    // </AuthProvider>
  );
}

export default App;
