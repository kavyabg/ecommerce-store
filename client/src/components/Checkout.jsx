import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { addOrder } from '../services/api';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data = formData) => {
    const { name, email, contact, address } = data;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";

    if (!contact.trim()) newErrors.contact = "Contact number is required.";
    else if (!/^\d{10}$/.test(contact)) newErrors.contact = "Enter a valid 10-digit number.";

    if (!address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    setSubmitted(true);
    if (!validateForm()) return;

    const { name, email, contact, address } = formData;

    const options = {
      key: "rzp_test_DfEz8bwD88YbJ9",
      amount: totalPrice * 100,
      currency: "INR",
      name: "BlossomBeauty",
      description: "Checkout Payment",
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;
        setTransactionId(paymentId);
        setShowModal(true);

        // Add order API call
        const orderPayload = {
          customer: {
            name,
            email,
            contact,
            address,
          },
          items: cartItems.map(item => ({
            productNumber: item.productNumber,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalPrice,
          transactionId: paymentId,
        };
        
        
        console.log("Order Payload:", orderPayload);

        try {
          await addOrder(orderPayload);
          clearCart();
        } catch (error) {
          console.error("Order creation failed:", error.message);
        }
      },
      prefill: { name, email, contact },
      notes: { address },
      theme: { color: "#FDE047" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const inputClass = (field) =>
    `w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
      errors[field] ? 'border-red-500 ring-red-300' : 'focus:ring-yellow-400'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping Form */}
        <div className="bg-white p-8 rounded-xl shadow-md flex-1">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Address</h3>
          <form className="flex flex-col gap-5">
            {["name", "email", "contact", "address"].map((field) => (
              <div key={field}>
                {field === "address" ? (
                  <textarea
                    name={field}
                    placeholder="Full Address"
                    rows="4"
                    value={formData[field]}
                    onChange={handleChange}
                    className={inputClass(field)}
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : field === "contact" ? "tel" : "text"}
                    name={field}
                    placeholder={
                      field === "name"
                        ? "Full Name"
                        : field === "email"
                        ? "Email"
                        : field === "contact"
                        ? "Phone Number"
                        : "Address"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className={inputClass(field)}
                  />
                )}
                {submitted && errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-xl shadow-md flex-1">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h3>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.productNumber} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-800">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-4 border-t font-bold text-xl">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-colors mt-6"
            >
              Pay Now ₹{totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Payment Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl text-center max-w-md w-full animate-fadeIn scale-95">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 text-green-600 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-green-700">Payment Successful!</h2>
            <p className="text-gray-700 mb-1">Your order has been confirmed.</p>
            <p className="text-gray-600 mb-4 font-medium">Transaction ID:</p>
            <p className="text-sm bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-gray-800 break-all">
              {transactionId}
            </p>

            <button
              className="mt-6 bg-yellow-400 text-black px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-yellow-300 transition duration-200"
              onClick={() => setShowModal(false)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
