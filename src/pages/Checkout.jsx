import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";

import toast from "react-hot-toast";
import UserNavbar from "../components/UserNavbar";

export default function Checkout() {
  const { total, placeOrder, cart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    placeOrder();

   
    window.dispatchEvent(new Event("ordersUpdated"));

    toast.success("Order placed successfully! Redirecting...", {
      duration: 2000,
    });

    
    setTimeout(() => navigate("/order-history"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <UserNavbar />
      <motion.div
        className="flex flex-col items-center justify-center flex-1"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Confirm Your Order 🧾
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          Total Amount: <span className="font-bold text-blue-600">₹{total}</span>
        </p>
        <button
          onClick={handleCheckout}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg transition-all"
        >
          Place Order
        </button>
      </motion.div>
    </div>
  );
}
