import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
         
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
            onClick={onClose}
          >
            <X size={22} />
          </button>

         
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />

         
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-500 text-sm mb-3">{product.category}</p>
          <p className="text-gray-700 mb-4">
            {product.description || "No description available."}
          </p>

          <p className="text-yellow-500 font-semibold text-xl mb-4">
            ₹{product.price}
          </p>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Add to Cart 🛒
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
