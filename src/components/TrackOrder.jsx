import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiClock,
  FiSearch,
  FiInfo,
} from "react-icons/fi";

const statuses = [
  {
    title: "Pending",
    icon: <FiClock size={22} />,
    desc: "Awaiting confirmation",
  },
  {
    title: "Confirmed",
    icon: <FiPackage size={22} />,
    desc: "Order is being prepared",
  },
  {
    title: "Shipped",
    icon: <FiTruck size={22} />,
    desc: "On the way to you",
  },
  {
    title: "Delivered",
    icon: <FiCheckCircle size={22} />,
    desc: "Successfully received",
  },
];

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);

  const handleTrack = () => {
    if (!orderId) return;
    // Simulating API response delay
    const randomIndex = Math.floor(Math.random() * statuses.length);
    setCurrentStatus(randomIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] lg:mt-[73px] mt-[38px] px-2 lg:px-4 mx-auto md:py-10 py-6 font-sans"
    >
      <div className="bg-white border border-slate-100 rounded md:p-10 pb-10 m p-3 min-h-[75vh]">
        {/* Header Section */}
        <div className="text-center md:mb-12 mt-3 md:mt-0 mb-6">
         
          <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight md:mb-3 uppercase">
            Track Your <span className="text-[#1976d2]">Order</span>
          </h1>
        
        </div>

        {/* Input Section */}
        <div className="relative flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto md:mb-20 mb-10">
          <div className="relative flex-grow group">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1976d2] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="OID-2603257854658"
              className="w-full pl-12 pr-4 py-3.5 uppercase rounded-xl border-1 border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#1976d2] transition-all font-bold text-slate-700 tracking-wider placeholder:normal-case placeholder:font-medium placeholder:text-slate-400"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button
            onClick={handleTrack}
            className="bg-[#1976d2] text-white px-10 py-3.5 rounded-xl font-black uppercase md:text-md text-sm tracking-widest hover:bg-[#1565c0] transition-all active:scale-95 shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
          >
            Track System
          </button>
        </div>

        {/* Status Tracker Visualizer */}
        <AnimatePresence mode="wait">
          {currentStatus !== null && (
            <motion.div
              key="status-container"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-5xl mx-auto"
            >
              {/* Progress Stepper Container */}
              <div className="relative flex justify-between items-start mb-10 px-4">
                {/* Master Progress Line (Background) */}
                <div className="absolute top-8 left-0 w-full h-1 bg-slate-100 z-0 rounded-full"></div>

                {/* Dynamic Brand Progress Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentStatus / (statuses.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className="absolute top-8 left-0 h-1 bg-[#1976d2] z-0 rounded-full shadow-[0_0_15px_rgba(25,118,210,0.4)]"
                ></motion.div>

                {statuses.map((status, index) => {
                  const isActive = index <= currentStatus;
                  const isCurrent = index === currentStatus;

                  return (
                    <div
                      key={status.title}
                      className="relative z-10 flex flex-col items-center flex-1"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className={`w-16 h-16 flex justify-center items-center rounded-2xl border-2 transition-all duration-700 ${
                          isActive
                            ? "border-[#1976d2] bg-[#1976d2] text-white shadow-2xl shadow-blue-200"
                            : "border-slate-100 bg-white text-slate-200"
                        } ${isCurrent ? "ring-4 ring-blue-100 animate-pulse" : ""}`}
                      >
                        {status.icon}
                      </motion.div>

                      <div className="mt-5 text-center px-1">
                        <p
                          className={`text-[11px] md:text-xs font-black uppercase tracking-[0.15em] mb-1 ${
                            isActive ? "text-slate-800" : "text-slate-300"
                          }`}
                        >
                          {status.title}
                        </p>
                        <p className="hidden md:block text-[9px] text-slate-400 font-bold uppercase tracking-tighter opacity-70">
                          {status.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Summary Detail Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-slate-900 rounded-3xl md:p-10 p-5 max-w-xl mx-auto text-center border-b-8 border-[#1976d2] shadow-2xl"
              >
                <div className="w-16 h-1 bg-[#1976d2] mx-auto mb-6 rounded-full opacity-50"></div>

                <h2 className="text-[10px] font-black text-[#1976d2] uppercase tracking-[0.3em] mb-2">
                  Reference: #{orderId}
                </h2>

                <p className="text-3xl font-black text-white mb-6 uppercase tracking-tight">
                  {statuses[currentStatus].title}
                </p>

                <div className="flex items-center gap-3 justify-center mb-6">
                  <div className="h-px flex-grow bg-white/10"></div>
                  <div className="w-2 h-2 rounded-full bg-[#1976d2] animate-ping"></div>
                  <div className="h-px flex-grow bg-white/10"></div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  System confirmation: Your package is currently in the{" "}
                  <span className="text-white font-bold">
                    {statuses[currentStatus].title.toLowerCase()}
                  </span>{" "}
                  phase. Our logistics team is prioritizing your delivery for
                  the fastest possible transit.
                </p>

                <button className="mt-8 text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                  Need Help? Contact Support
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TrackOrderPage;
