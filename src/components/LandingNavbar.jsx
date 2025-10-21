import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

export default function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 w-full z-10 flex justify-between items-center px-10 py-5 bg-black/30 backdrop-blur-md">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaShoppingBag className="text-3xl text-yellow-400" />
        <h1 className="text-2xl font-bold tracking-wide text-white">
          React<span className="text-yellow-400">Store</span>
        </h1>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-lg font-medium bg-white/20 hover:bg-yellow-400 hover:text-black transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-5 py-2 rounded-lg font-medium bg-yellow-400 text-black hover:bg-yellow-500 transition"
        >
          Register
        </button>
      </div>
    </nav>
  );
}
