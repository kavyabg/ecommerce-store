import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    getProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-16 px-8 text-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/1200/600?random=1)' }}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-semibold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-6">Find the best deals on electronics and accessories</p>
          <button className="bg-yellow-500 text-blue-900 py-2 px-6 rounded-full hover:bg-yellow-400 transition duration-300">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-4xl text-center font-semibold mb-8">Featured Products</h2>
        <ProductList products={products} />
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Ecommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
