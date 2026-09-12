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
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (orderId.trim() === "") {
      setNotFound(false);
      setCurrentStatus(null);
    }
  }, [orderId]);

  const handleTrack = async (idToTrack) => {
    let targetId = idToTrack || orderId;
    if (!targetId) return;

    if (!targetId.trim()) {
      setNotFound(false);
      setCurrentStatus(null);
      return;
    }

    setLoading(true);
    setNotFound(false);
    setCurrentStatus(null);

    try {
      const res = await axios.get(
        "https://api.victusbyte.com/api/customer/order-status",
        {
          params: { oid: targetId, isStatus: true },
        },
      );

      if (res.data.success) {
        setCurrentStatus(res.data.statusIndex);
        setNotFound(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNotFound(true);
        setCurrentStatus(null);
      } else {
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
      className="max-w-[1400px] px-2 md:-mt-10 lg:px-4 mx-auto font-sans"
    >
      <div className="bg-white border border-slate-100 rounded md:p-10 pb-10 p-3 min-h-[75vh]">
        {/* Header */}
        <div className="text-center md:mb-12 mt-3 md:mt-0 mb-6">
          <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight md:mb-3 uppercase">
            Track Your <span style={{ color: "#F66107" }}>Order</span>
          </h1>
        </div>

        {/* Input Section */}
        <div className="relative flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto md:mb-20 mb-10">
          <div className="relative flex-grow group">
            {/* Icon and Fixed Prefix Container */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <FiSearch
                className="text-slate-400 transition-colors"
                size={20}
              />
              {/* Fixed OID Text */}
              <span className="text-slate-900 font-bold tracking-wider border-r border-slate-300 pr-2">
                OID
              </span>
            </div>

            <input
              type="text"
              placeholder="123456"
              maxLength={6}
              className="w-full pl-24 pr-4 py-3 uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 transition-all font-bold tracking-widest"
              style={{
                color: "#F66107",
                "--tw-ring-color": "rgba(246, 97, 7, 0.1)",
                borderColor: orderId ? "#F66107" : undefined,
              }}
              value={orderId}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setOrderId(val);
              }}
            />
          </div>
          <button
            onClick={() => handleTrack()}
            disabled={loading}
            className="text-white px-10 py-3.5 rounded-xl font-black uppercase text-sm tracking-widest transition-all active:scale-95 shadow-xl disabled:opacity-50 cursor-pointer"
            style={{
              backgroundColor: "#F66107",
              boxShadow: "0 20px 25px -5px rgba(246, 97, 7, 0.2)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D35000")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#F66107")
            }
          >
            {loading ? "Searching..." : "Track Order"}
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
                  className="absolute top-8 left-0 h-1 z-0 rounded-full"
                  style={{
                    backgroundColor: "#F66107",
                    boxShadow: "0 0 15px rgba(246, 97, 7, 0.4)",
                  }}
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
                            ? "text-white shadow-lg"
                            : "border-slate-100 bg-white text-slate-200"
                        } ${isCurrent ? "ring-4 animate-pulse" : ""}`}
                        style={{
                          borderColor: isActive ? "#F66107" : undefined,
                          backgroundColor: isActive ? "#F66107" : undefined,
                          "--tw-ring-color": isCurrent ? "#F8CDB8" : undefined,
                        }}
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

              <motion.div
                className="bg-slate-900 rounded-3xl md:p-10 p-5 max-w-xl mx-auto text-center shadow-2xl border-b-8"
                style={{ borderBottomColor: "#F66107" }}
              >
                <h2
                  className="text-[10px] font-black uppercase tracking-[0.3em] mb-2"
                  style={{ color: "#F66107" }}
                >
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
