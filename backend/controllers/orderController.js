import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalPrice, transactionId } = req.body;

    if (!customer || !items || !totalPrice || !transactionId) {
      const missingFields = [];
      if (!customer?.name) missingFields.push("name");
      if (!customer?.email) missingFields.push("email");
      if (!customer?.contact) missingFields.push("contact");
      if (!customer?.address) missingFields.push("address");
      if (!items?.length) missingFields.push("cartItems");

      return res
        .status(400)
        .json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }

    const newOrder = new Order({
      customer: {
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
        address: customer.address,
      },
      items: items.map((item) => ({
        productNumber: item.productNumber,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
      transactionId,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order creation error:", error);
    res
      .status(500)
      .json({ message: "Order creation failed", error: error.message });
  }
};

export const getOrdersByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const orders = await Order.find({ "customer.email": email }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by email:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};
