import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function UserNavbar({ searchTerm, setSearchTerm }) {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-md bg-white/90 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-6 py-3 gap-4">
        
        
        <h1
          onClick={() => navigate("/UserHome")}
          className="text-2xl font-bold text-blue-700 cursor-pointer flex items-center gap-2"
        >
          🛍️ React E-Shop
        </h1>

        
        <div className="flex-1 max-w-md mx-6 w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

       
        <div className="flex items-center flex-wrap gap-4">
          <button
            onClick={() => navigate("/UserHome")}
            className="bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
          >
            Home
          </button>

          
          <button
            onClick={() => navigate("/cart")}
            className="relative bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/order-history")}
            className="bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
          >
            Orders
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
