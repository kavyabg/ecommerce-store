// api.js

const BASE_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data;
};
