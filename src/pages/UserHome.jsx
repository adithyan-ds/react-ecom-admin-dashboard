import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import UserNavbar from "../components/UserNavbar";
import { useProducts } from "../Contexts/ProductContext";
import { useCart } from "../Contexts/CartContext";

export default function UserHome() {
  const { products } = useProducts();
  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const navigate = useNavigate();

  
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  let sortedProducts = [...filteredProducts];
  if (sortOption === "price-low") sortedProducts.sort((a, b) => a.price - b.price);
  else if (sortOption === "price-high") sortedProducts.sort((a, b) => b.price - a.price);
  else if (sortOption === "name") sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

  
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
  };

 
  const categories = ["All", "electronics", "home", "groceries", "fashion"];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <UserNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

     
      <section
        className="relative h-[60vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Welcome to <span className="text-yellow-400">ReactStore</span>
          </h1>
          <p className="text-lg text-gray-200">
            Explore our latest collection of trending products 🛍️
          </p>
        </motion.div>
      </section>

      
      <div className="flex flex-wrap justify-center items-center gap-4 mt-10 px-4">
       
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                category === cat
                  ? "bg-yellow-400 text-black shadow-md"
                  : "bg-white text-gray-700 hover:bg-yellow-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-yellow-400 outline-none"
          >
            <option value="none">None</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {sortedProducts.length === 0 ? (
          <motion.div
            className="text-center text-gray-600 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
              alt="No results"
              className="w-24 mx-auto mb-4 opacity-70"
            />
            <p className="text-lg">No matching products found 😢</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {sortedProducts.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.04 }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img
                  src={p.image || "https://via.placeholder.com/300x200"}
                  alt={p.name}
                  className="w-full h-48 object-cover product-image"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{p.category}</p>
                  <p className="text-xl font-bold text-blue-600 mt-2">
                    ₹{p.price}
                  </p>

                  {cart.some((item) => item.id === p.id) ? (
                    <button
                      disabled
                      className="mt-4 w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg cursor-not-allowed"
                    >
                      Added to Cart ✓
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCart(p, e)}
                      className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
