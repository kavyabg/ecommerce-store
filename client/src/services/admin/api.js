const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUserLists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/userlist`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw new Error("Failed to fetch or parse user list.");
  }
};

// Fetch All Products
export const fetchProducts = async (page = 1, limit = 10) => {
  try {
    // Append the page and limit parameters to the API URL for pagination
    const response = await fetch(
      `${BASE_URL}/products?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Data includes products, totalProducts, totalPages, currentPage
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};

// Create a Product
export const createProduct = async (product) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }
};

// Update a Product
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
};

// Delete a Product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
};

export const fetchOrders = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin/orders?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders.");
  }
};

export const updateOrder = async (orderId, updatedFields) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Contains message and updated order
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order.");
  }
};