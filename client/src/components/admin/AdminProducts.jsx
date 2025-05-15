import { HiFolderAdd } from "react-icons/hi"; 
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductCRUD } from "../../hooks/admin/useProductCRUD";

const PRODUCTS_PER_PAGE = 10;

const AdminProduct = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductCRUD();

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    productNumber: "",
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      setInitialLoaded(true);
    };
    loadData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }
      setForm({
        productNumber: "",
        name: "",
        description: "",
        price: "",
        image: "",
        stock: "",
      });
      setEditingId(null);
      setShowModal(false);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (err) {
        console.error(err);
        alert("Failed to delete product");
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    [p.name, p.productNumber].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Product Management
      </h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by name or number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          onClick={() => {
            setForm({
              productNumber: "",
              name: "",
              description: "",
              price: "",
              image: "",
              stock: "",
            });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          <HiFolderAdd className="text-3xl" /> Add Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {!initialLoaded ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            {loading && initialLoaded && (
              <p className="text-sm text-gray-500 italic mb-2">
                Refreshing products...
              </p>
            )}
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-3">#</th>
                  <th className="p-3">Number</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-3">
                      No products available.
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product, i) => (
                    <tr
                      key={product._id}
                      className="hover:bg-blue-50 transition-all"
                    >
                      <td className="p-3">
                        {(currentPage - 1) * PRODUCTS_PER_PAGE + i + 1}
                      </td>
                      <td className="p-3">{product.productNumber}</td>
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">${product.price}</td>
                      <td className="p-3">{product.stock}</td>
                      <td className="p-3 space-x-2">
                        <button
                          className="text-yellow-600 hover:underline"
                          onClick={() => handleEdit(product)}
                        >
                          <FaEdit className="inline mr-1" />
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(product._id)}
                        >
                          <FaTrash className="inline mr-1" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* ✅ Pagination */}
            <div className="mt-4 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === idx + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-xl relative">
            <h2 className="text-2xl font-bold mb-4">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="productNumber"
                placeholder="Product Number"
                value={form.productNumber}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="stock"
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </form>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
