// services/api.js
const BASE_URL = 'http://localhost:5000/api';

// PRODUCTS
export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
};

export const fetchProductByProductNumber = async (productNumber) => {
  const response = await fetch(`${BASE_URL}/products/product/${productNumber}`);
  const data = await response.json();
  return data;
};

// AUTH
export const register = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return await response.json();
};


export const login = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json();
};

export const addOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to place order');
  }

  return await response.json();
};
