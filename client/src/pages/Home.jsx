import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
<section className="relative w-full h-[250px] md:h-[400px] lg:h-[600px] overflow-hidden">
  <img
    src="/Hero-section-blossom.png"
    alt="Blossom Beauty Hero"
    className="absolute inset-0 object-cover w-full h-full"
  />
  <div className="absolute inset-0 bg-black/10"></div>

  {/* ⬇️ Small, elegant box in bottom-left corner */}
<div
  className="absolute bg-white/20 backdrop-blur-md text-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full sm:w-fit sm:h-fit z-10 lg:block hidden"
  style={{ bottom: '80px', right: '90px' }}
>
  <h1 className="text-2xl font-bold mb-2">Welcome to Blossom Beauty</h1>
  <p className="text-base text-gray-600 mb-4">
    Discover elegant, nature-inspired beauty products curated just for you.
  </p>
  <a
    href="/#FeaturedProducts"
    className="inline-block bg-pink-400 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
  >
    Shop Now
  </a>
</div>
</section>

      {/* Featured Products Section */}
      <section className="py-12 md:px-12 bg-gray-50" id="FeaturedProducts">
        <h2 className="lg:text-4xl text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Products
        </h2>
        <ProductList products={products} loading={loading} />
      </section>
    </div>
  );
}

export default Home;
