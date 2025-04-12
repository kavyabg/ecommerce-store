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
      <h1 className="text-3xl text-center mt-8">Welcome to Our Store</h1>
      <ProductList products={products} />
    </div>
  );
}

export default Home;
