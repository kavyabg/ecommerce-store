export const fetchProducts = async () => {
    const response = await fetch('https://api.example.com/products');
    const data = await response.json();
    return data;
  };
  
  export const fetchProductById = async (id) => {
    const response = await fetch(`https://api.example.com/products/${id}`);
    const data = await response.json();
    return data;
  };
  