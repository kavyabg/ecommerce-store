import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
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
      enum: ["Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    shippedDate: {
      type: Date,
    },
    estimatedDeliveryDate: {
      type: Date,
    },
    deliveredDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
