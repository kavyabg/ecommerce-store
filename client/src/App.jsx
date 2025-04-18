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
import { AuthProvider } from './components/AuthContext'; // ✅ Import AuthProvider
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <main className="min-h-screen bg-gray-50 px-4 sm:px-8 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productNumber" element={<ProductDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
