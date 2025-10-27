import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import UserNavbar from "../components/UserNavbar";
import toast from "react-hot-toast";

export default function Profile() {
  const { currentUser, users, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [password, setPassword] = useState(currentUser?.password || "");

  if (!currentUser) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">User not logged in</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const userOrders =
    JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];

  const handleSave = () => {
    if (!name.trim() || !password.trim()) {
      toast.error("Fields cannot be empty!");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? { ...u, name, password } : u
    );
    localStorage.setItem("react-ecom-users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "react-ecom-current-user",
      JSON.stringify({ ...currentUser, name, password })
    );

    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />

      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=FACC15&color=000`}
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full mx-auto mb-4 shadow-md border-4 border-yellow-400"
          />

          {isEditing ? (
            <div className="space-y-4 text-left max-w-sm mx-auto">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {currentUser.name}
              </h2>
              <p className="text-gray-500">{currentUser.email}</p>

              

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => navigate("/order-history")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
                >
                  View Orders
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Edit Profile
                </button>
              </div>

              <hr className="my-6 border-gray-300" />

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
