// services/api.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
};

export const fetchProductByProductNumber = async (productNumber) => {
  const response = await fetch(`${BASE_URL}/products/${productNumber}`);
  const data = await response.json();
  return data;
};

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
  try {
     if (!orderData || !orderData.customer || !orderData.items || orderData.items.length === 0) {
        throw new Error("Invalid order data: Missing customer or items.");
     }

     const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
     });

     const textResponse = await response.text();

     if (!response.ok) {
        const errorData = JSON.parse(textResponse); 
        console.error("Order creation failed with response:", errorData);
        throw new Error(errorData.message || 'Failed to place order');
     }

     const data = JSON.parse(textResponse); 
     return data;
  } catch (error) {
     console.error("Error while placing order:", error);
     throw new Error(`Order placement failed: ${error.message || 'Unknown error'}`);
  }
};

export const getOrdersByEmail = async (email) => {
  const response = await fetch(`${BASE_URL}/orders/${email}`);
  const data = await response.json();
  return data;
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send reset link');
  }

  return data;
};

export const resetPassword = async (token, password) => {
  const response = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }), 
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Password reset failed');
  }

  return data;
};

export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(email)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error(error.message || 'Failed to fetch user');
  }
};
