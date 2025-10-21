import React from "react";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-4 hover:shadow-lg transition transform hover:-translate-y-1">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{product.category}</p>
      <p className="text-yellow-500 font-semibold text-lg mt-2">
        ₹{product.price}
      </p>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-3 w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}
