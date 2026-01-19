import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiTruck, FiPackage, FiClock, FiSearch } from "react-icons/fi";

const statuses = [
  { title: "Pending", icon: <FiClock size={20} />, desc: "Awaiting confirmation" },
  { title: "Confirmed", icon: <FiPackage size={20} />, desc: "Order is being prepared" },
  { title: "Shipped", icon: <FiTruck size={20} />, desc: "On the way to you" },
  { title: "Delivered", icon: <FiCheckCircle size={20} />, desc: "Successfully received" },
];

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);

  const handleTrack = () => {
    if (!orderId) return;
    // Logic remains same - simulating API
    const randomIndex = Math.floor(Math.random() * statuses.length);
    setCurrentStatus(randomIndex);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-[1400px] lg:mt-[73px] mt-[47px] px-2 lg:px-4 mx-auto md:py-8 py-4"
    >
      <div className="bg-white shadow-sm p-6 min-h-[70vh]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Track Your Order
          </h1>
          <p className="text-slate-500 text-sm">Enter your order ID to see real-time updates</p>
        </div>

        {/* Input Section */}
        <div className="relative flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto mb-16">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. #ORD-77210"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button
            onClick={handleTrack}
            className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-colors active:scale-95 shadow-lg shadow-slate-200"
          >
            Track Now
          </button>
        </div>

        {/* Status Tracker */}
        <AnimatePresence mode="wait">
          {currentStatus !== null && (
            <motion.div
              key="status-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl mx-auto"
            >
              {/* Progress Line Container */}
              <div className="relative flex justify-between items-start mb-20 px-4">
                
                {/* Background Line */}
                <div className="absolute top-7 left-0 w-full h-[2px] bg-slate-100 z-0"></div>
                
                {/* Animated Filling Line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStatus / (statuses.length - 1)) * 100}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute top-7 left-0 h-[2px] bg-orange-500 z-0"
                ></motion.div>

                {statuses.map((status, index) => {
                  const isActive = index <= currentStatus;
                  return (
                    <div key={status.title} className="relative z-10 flex flex-col items-center flex-1">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-14 h-14 flex justify-center items-center rounded-2xl border-2 transition-all duration-500 ${
                          isActive
                            ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-200"
                            : "border-slate-200 bg-white text-slate-300"
                        }`}
                      >
                        {status.icon}
                      </motion.div>
                      <div className="mt-4 text-center">
                        <p className={`text-xs md:text-sm font-bold uppercase tracking-tighter ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                          {status.title}
                        </p>
                        <p className="hidden md:block text-[10px] text-slate-400 font-medium">{status.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-8 max-w-md mx-auto text-center"
              >
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase mb-4">
                  Live Update
                </div>
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Order #{orderId}</h2>
                <p className="text-2xl font-black text-slate-900 mb-4">
                  {statuses[currentStatus].title}
                </p>
                <div className="w-full h-px bg-slate-200 mb-4"></div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your package is currently in the <b>{statuses[currentStatus].title.toLowerCase()}</b> stage. 
                  We'll notify you via email as soon as the status changes.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TrackOrderPage;