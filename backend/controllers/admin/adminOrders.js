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

export const updateAdminOrder = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    paymentStatus,
    shippedDate,
    estimatedDeliveryDate,
    deliveredDate,
  } = req.body;

  try {
    // Build update data object based on provided fields
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (shippedDate) updateData.shippedDate = new Date(shippedDate);
    if (estimatedDeliveryDate) updateData.estimatedDeliveryDate = new Date(estimatedDeliveryDate);
    if (deliveredDate) updateData.deliveredDate = new Date(deliveredDate);

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Enforce schema validation
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Update Admin Order Error:", error);
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};
