import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../services/api';
import { Link } from 'react-router-dom';

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
      <section className="relative bg-blue-900 text-white py-16 px-8 text-center h-[80vh] flex items-center justify-center">
  {/* Background Image */}
  <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: 'url(https://picsum.photos/1200/600?random=1)' }}></div>

  {/* Transparent Gray Overlay */}
  <div className="absolute inset-0 bg-gray-800 opacity-50"></div>

  {/* Content */}
  <div className="relative z-10 text-center text-white px-4">
    <h1 className="text-5xl font-semibold mb-4 text-shadow-md">
      Welcome to Our Store
    </h1>
    <p className="text-xl mb-6 text-shadow-md">
    Discover the finest beauty essentials and irresistible deals
    </p>
    <a
  href="/#FeaturedProducts"
  className="inline-block bg-yellow-500 text-blue-900 py-2 px-6 rounded-full hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
>
  Shop Now
</a>
  </div>
</section>


      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50" id='FeaturedProducts'>
        <h2 className="text-4xl text-center font-semibold mb-8">Featured Products</h2>
        <ProductList products={products} />
      </section>

    </div>
  );
}

export default Home;
