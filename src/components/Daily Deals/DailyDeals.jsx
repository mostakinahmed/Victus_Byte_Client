import React, { useState, useEffect } from "react";
import { ShoppingCart, Zap, Clock, ShieldCheck, Cpu } from "lucide-react";

const DailyDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  // Countdown logic for the "Deal of the Day"
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft({
        hours: 23 - now.getHours(),
        minutes: 59 - now.getMinutes(),
        seconds: 59 - now.getSeconds(),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: 1,
      name: "ESP32-WROOM-32D Development Board",
      category: "Microcontrollers",
      discount: "30% OFF",
      originalPrice: 750,
      dealPrice: 525,
      stock: 14,
      image: "https://via.placeholder.com/200?text=ESP32",
    },
    {
      id: 2,
      name: "60W Digital Soldering Iron Kit",
      category: "Tools",
      discount: "15% OFF",
      originalPrice: 1800,
      dealPrice: 1530,
      stock: 5,
      image: "https://via.placeholder.com/200?text=Soldering+Iron",
    },
    {
      id: 3,
      name: "Ultrasonic Sensor HC-SR04 (Bulk Pack)",
      category: "Sensors",
      discount: "50% OFF",
      originalPrice: 450,
      dealPrice: 225,
      stock: 42,
      image: "https://via.placeholder.com/200?text=Sensors",
    },
  ];

  return (
    <div className="max-w-[1400px] md:px-4 px-2 mx-auto min-h-screen pb-12 md:mt-[104px] mt-15 font-sans ">
      {/* Promo Header */}
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between bg-slate-900 rounded md:p-8 p-4 mb-12 text-white shadow-2xl">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <Zap size={24} fill="currentColor" />
            <span className="font-bold tracking-widest uppercase text-sm">
              Lightning Deals
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black italic">
            VICTUS <span className="text-blue-500">BYTE</span> DEALS
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-md">
            Next-gen IoT components. Limited time prices.
          </p>
        </div>

        <div className="bg-slate-800 md:p-6 px-4 py-2 md:px-0 md:py-0 rounded-xl border border-zinc-700 text-center">
          <p className="text-xs uppercase text-gray-400 mb-2 flex items-center justify-center gap-2">
            <Clock size={14} /> Ends In
          </p>
          <div className="flex gap-4 md:text-3xl text-xl font-mono font-bold text-blue-400">
            <div>
              {String(timeLeft.hours).padStart(2, "0")}
              <span className="text-xs text-white ml-1">H</span>
            </div>
            <div>
              {String(timeLeft.minutes).padStart(2, "0")}
              <span className="text-xs text-white ml-1">M</span>
            </div>
            <div>
              {String(timeLeft.seconds).padStart(2, "0")}
              <span className="text-xs text-white ml-1">S</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-500 transition-all group shadow-sm hover:shadow-xl"
          >
            {/* Image & Badge */}
            <div className="relative h-56 bg-gray-100 flex items-center justify-center p-4">
              <img
                src={deal.image}
                alt={deal.name}
                className="max-h-full transition-transform group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {deal.discount}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-tighter">
                {deal.category}
              </span>
              <h3 className="text-lg font-bold text-zinc-800 mt-1 line-clamp-1">
                {deal.name}
              </h3>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-2xl font-black text-zinc-900">
                  ৳{deal.dealPrice}
                </span>
                <span className="text-sm text-gray-400 line-through mb-1">
                  ৳{deal.originalPrice}
                </span>
              </div>

              {/* Progress Bar (Stock) */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Available: {deal.stock}</span>
                  <span className="text-red-500 font-bold">Almost Gone!</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: `${(deal.stock / 50) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart size={18} /> Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className=" mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-8">
        <div className="flex items-center gap-3 text-gray-600">
          <ShieldCheck className="text-blue-500" />
          <span className="text-sm">Verified QC Tested Products</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Cpu className="text-blue-500" />
          <span className="text-sm">Technical Support Included</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Zap className="text-blue-500" />
          <span className="text-sm">Same Day Dispatch (Dhaka)</span>
        </div>
      </div>
    </div>
  );
};

export default DailyDeals;
