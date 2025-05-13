import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    contact: String,
    address: String,
  },
  items: [
    {
      productNumber: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  transactionId: String,
  status: {
    type: String,
    default: "Confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
