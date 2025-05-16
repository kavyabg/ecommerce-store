import Order from "../../models/Order.js"; 

export const getAdminOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // Get orders with pagination
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(Number(limit));

    // Get total count of orders
    const totalOrders = await Order.countDocuments();

    // Send paginated orders and metadata
    res.json({
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Get Admin Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};
