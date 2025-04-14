import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer'; // Optional
import ScrollToTop from './components/ScrollToTop'; // Optional
import NotFound from './pages/NotFound';
import { CartProvider } from './components/CartContext'; // ✅ CartProvider import
import CartPage from './pages/CartPage';

function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
