import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import UserNavbar from "../components/UserNavbar";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          Product not found ⚠️
        </h1>
        <button
          onClick={() => navigate("/UserHome")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />

      {
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {product.name}
          </h1>
          <p className="text-sm uppercase text-gray-500 tracking-wide">
            {product.category}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {product.description ||
              "This premium product is part of our best-selling collection. Designed with care, built for performance, and priced to perfection."}
          </p>
          <p className="text-3xl font-bold text-blue-600">₹{product.price}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                addToCart(product);
                toast.success("Added to cart!", { position: "top-right" });
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={() => navigate("/UserHome")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-5 rounded-lg transition"
            >
              ← Back
            </button>
          </div>
        </motion.div>
      </div>

     
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You might also like 👇
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img
                  src={p.image || "https://via.placeholder.com/200"}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-700 truncate">
                    {p.name}
                  </h3>
                  <p className="text-blue-600 font-bold mt-1">₹{p.price}</p>
                  <button onClick={() => buyNow(product)}>Buy Now</button>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
