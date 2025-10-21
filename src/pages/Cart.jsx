import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import UserNavbar from "../components/UserNavbar";
import { motion } from "framer-motion";

export default function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();
  const [localCart, setLocalCart] = useState(cart);

  
  useEffect(() => {
    const updateCart = () => {
      setLocalCart([...cart]);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />

      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Your Shopping Cart
        </h1>

        {localCart.length === 0 ? (
          <motion.div
            className="text-center text-gray-600 mt-20 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty cart"
              className="w-28 mx-auto opacity-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-lg">Your cart is empty 😔</p>
            <button
              onClick={() => navigate("/UserHome")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
            >
              Continue Shopping 🛍️
            </button>
          </motion.div>
        ) : (
          <>
            
            <div className="space-y-6">
              {localCart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-2xl overflow-hidden border border-yellow-200 hover:shadow-lg transition-all"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/200"}
                    alt={item.name}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                  <div className="flex-1 p-4 md:p-6 space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 capitalize">{item.category}</p>
                    <p className="text-lg font-bold text-blue-700">
                      ₹{item.price}
                    </p>
                  </div>
                  <div className="p-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center mt-10 border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Total:{" "}
                <span className="text-blue-600 font-bold">₹{total}</span>
              </h2>
              <div className="mt-4 md:mt-0 flex gap-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-lg transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
                >
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
