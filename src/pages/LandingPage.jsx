import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { FaShoppingBag } from "react-icons/fa";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
     
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="absolute inset-0 z-0"
      >
        {[slide1, slide2].map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              <div className="w-full h-full bg-black/50"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     *
      <nav className="absolute top-0 left-0 w-full z-10 flex justify-between items-center px-10 py-5 bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <FaShoppingBag className="text-3xl text-yellow-400" />
          <h1 className="text-2xl font-bold tracking-wide">
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

     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4"
      >
        <h1 className="text-5xl text-yellow-400 sm:text-6xl font-extrabold drop-shadow-lg mb-4">
          Shop Smart. Live Better.
        </h1>
        <p className="text-lg sm:text-xl text-yellow-400  max-w-xl mb-8">
          Discover amazing products at unbeatable prices. Join our growing
          community today.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-white/20 border border-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white/40 transition"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
