// services/api.js
const BASE_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export const fetchProductByProductNumber = async (productNumber) => {
  const response = await fetch(`${BASE_URL}/product/${productNumber}`);
  const data = await response.json();
  return data;
};
