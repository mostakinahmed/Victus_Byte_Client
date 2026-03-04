import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiClock,
  FiSearch,
  FiAlertCircle,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
  { title: "Shipped", icon: <FiTruck size={22} />, desc: "On the way to you" },
  {
    title: "Delivered",
    icon: <FiCheckCircle size={22} />,
    desc: "Successfully received",
  },
];

const TrackOrderPage = () => {
  const { oid } = useParams();
  const [orderId, setOrderId] = useState(oid || "");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false); // New state for "Not Found"

  useEffect(() => {
    if (orderId.trim() === "") {
      setNotFound(false);
      setCurrentStatus(null);
    }
  }, [orderId]);

  const handleTrack = async (idToTrack) => {
    let targetId = idToTrack || orderId;
    if (!targetId) return;

    // --- NEW: Reset logic if blank ---
    if (!targetId.trim()) {
      setNotFound(false);
      setCurrentStatus(null);
      return;
    }

    // Auto-prefix OID logic
    targetId = targetId.trim().toUpperCase();
    if (!targetId.startsWith("OID")) {
      targetId = `OID${targetId}`;
      setOrderId(targetId);
    }

    setLoading(true);
    setNotFound(false); // Reset UI before search
    setCurrentStatus(null); // Clear previous status

    try {
      const res = await axios.get(
        "https://api.victusbyte.com/api/customer/order-status",
        {
          params: { oid: targetId, isStatus: true },
        },
      );

      // If request is successful (Status 200)
      if (res.data.success) {
        setCurrentStatus(res.data.statusIndex);
        setNotFound(false);
      }
    } catch (error) {
      // --- THIS HANDLES THE 404 ---
      if (error.response && error.response.status === 404) {
        setNotFound(true); // Trigger your "Order Not Found" component
        setCurrentStatus(null);
      } else {
        // Handle other errors (500, Network down, etc.)
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (oid) handleTrack(oid);
  }, [oid]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] lg:mt-[70px] mt-[38px] px-2 lg:px-4 mx-auto md:py-10 py-6 font-sans"
    >
      <div className="bg-white border border-slate-100 rounded md:p-10 pb-10 m p-3 min-h-[75vh]">
        {/* Header */}
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
              placeholder="OID260325656565"
              maxLength={15}
              className="w-full pl-12 pr-4 py-3 uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none placeholder:font-normal focus:ring-4 focus:ring-blue-500/10 focus:border-[#1976d2] transition-all font-bold text-slate-700 tracking-wider"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleTrack()}
            disabled={loading}
            className="bg-[#1976d2] text-white px-10 py-3.5 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-[#1565c0] transition-all active:scale-95 shadow-xl shadow-blue-200 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track System"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* --- CASE 1: ORDER FOUND --- */}
          {currentStatus !== null && (
            <motion.div
              key="status-container"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl mx-auto"
            >
              <div className="relative flex justify-between items-start mb-10 px-4">
                <div className="absolute top-8 left-0 w-full h-1 bg-slate-100 z-0 rounded-full"></div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentStatus / (statuses.length - 1)) * 100}%`,
                  }}
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
                        className={`w-16 h-16 flex justify-center items-center rounded-2xl border-2 transition-all duration-500 ${
                          isActive
                            ? "border-[#1976d2] bg-[#1976d2] text-white shadow-lg"
                            : "border-slate-100 bg-white text-slate-200"
                        } ${isCurrent ? "ring-4 ring-blue-100 animate-pulse" : ""}`}
                      >
                        {status.icon}
                      </motion.div>
                      <p
                        className={`mt-5 text-[11px] font-black uppercase tracking-widest ${isActive ? "text-slate-800" : "text-slate-300"}`}
                      >
                        {status.title}
                      </p>
                    </div>
                  );
                })}
              </div>

              <motion.div className="bg-slate-900 rounded-3xl md:p-10 p-5 max-w-xl mx-auto text-center border-b-8 border-[#1976d2] shadow-2xl">
                <h2 className="text-[10px] font-black text-[#1976d2] uppercase tracking-[0.3em] mb-2">
                  Reference: #{orderId}
                </h2>
                <p className="text-3xl font-black text-white mb-6 uppercase tracking-tight">
                  {statuses[currentStatus].title}
                </p>
                <p className="text-sm text-slate-400">
                  System confirmation: Your package is currently in the{" "}
                  <span className="text-white font-bold">
                    {statuses[currentStatus].title.toLowerCase()}
                  </span>{" "}
                  phase.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* --- CASE 2: ORDER NOT FOUND --- */}
          {notFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                Order Not Found
              </h3>
              <p className="text-slate-400 text-sm max-w-xs mt-2 font-medium">
                We couldn't find any record for{" "}
                <span className="text-rose-500 font-bold">{orderId}</span>.
                Please double-check your Order ID and try again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TrackOrderPage;
