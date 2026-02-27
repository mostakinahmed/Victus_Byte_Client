import React, { useState } from "react";
import {
  FiCheckCircle,
  FiTruck,
  FiShield,
  FiShoppingCart,
  FiZap,
} from "react-icons/fi";

const ProductLandingPage = () => {
  // Dummy Data for the landing page
  const product = {
    name: "Ultimate ESP32 Smart Agriculture Kit",
    price: 2450,
    oldPrice: 3200,
    description:
      "Build your own IoT-based smart farming system. This kit includes the ESP32, soil moisture sensors, DHT11, and a solar charging module.",
    features: [
      "ESP32 Dual-Core with WiFi & Bluetooth",
      "Solar Power Management Module",
      "Real-time Data Monitoring App",
      "High-Sensitivity Soil & Temp Sensors",
      "Comprehensive Step-by-Step Guide",
    ],
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1000&auto=format&fit=crop",
  };

  // Order Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* 1. PRODUCT HERO SECTION */}
      <section className="max-w-[1400px] mx-auto pt-15 md:pt-26 md:px-4 px-2 lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="relative group">
          <div className="bg-white rounded overflow-hidden shadow-2xl border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm animate-bounce">
            SAVE 25% OFF
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 lg:mt-0 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-3xl font-black text-emerald-600">
              ৳{product.price}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ৳{product.oldPrice}
            </span>
          </div>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <ul className="mt-8 space-y-3">
            {product.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-slate-700 font-medium"
              >
                <FiCheckCircle className="text-emerald-500 text-xl flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-6 border-t pt-8 border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiTruck className="text-lg text-emerald-500" /> Free Delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiShield className="text-lg text-emerald-500" /> 1 Year Warranty
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORDER FORM SECTION */}
      <section id="order-form" className="max-w-[800px] mx-auto mt-20 px-4">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-emerald-100 overflow-hidden">
          <div className="bg-emerald-600 p-6 text-center text-white">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <FiShoppingCart /> Order Now to Secure Deal
            </h2>
            <p className="text-emerald-100 text-sm mt-1">
              Cash on delivery available all over Bangladesh
            </p>
          </div>

          <form className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Full Address
              </label>
              <textarea
                rows="3"
                placeholder="House no, Area, City"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:outline-none transition-all"
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="font-bold text-slate-700">Select Quantity:</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white border border-emerald-300 flex items-center justify-center font-bold text-emerald-600"
                >
                  -
                </button>
                <span className="font-black text-lg">1</span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <FiZap /> Confirm Order
            </button>
          </form>
        </div>
      </section>

      {/* 3. TRUST BANNER */}
      <div className="mt-20 text-center text-gray-400">
        <p className="text-sm">Trusted by 5000+ Tech Enthusiasts</p>
        <div className="flex justify-center gap-8 mt-4 opacity-50 grayscale">
          <span className="font-bold">VICTUS BYTE</span>

        </div>
      </div>
    </div>
  );
};

export default ProductLandingPage;
