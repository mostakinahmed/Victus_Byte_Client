import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiPackage,
  FiAlertCircle,
  FiCamera,
  FiInfo,
  FiCheckCircle,
} from "react-icons/fi";

const ReturnPage = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock Order Data (Replace with props/API data)
  const orderInfo = order || {
    order_id: "#VB-99234",
    order_date: "2026-03-01",
    items: [
      { id: 1, name: "ESP32 DevKit V1", qty: 2, price: 450 },
      { id: 2, name: "DHT11 Sensor", qty: 1, price: 120 },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <FiCheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Request Submitted
        </h2>
        <p className="text-slate-500 mt-2 max-w-xs text-sm">
          Our team will review your request for{" "}
          <span className="font-bold">{orderInfo.order_id}</span> within 24-48
          hours.
        </p>
        <button className="mt-8 text-[#1976d2] font-black uppercase text-[11px] tracking-widest hover:underline cursor-pointer">
          Track Request Status
        </button>
      </motion.div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Header Section */}
      <div className="relative mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="w-1.5 h-5 bg-[#1976d2] rounded-full"></span>
            Return Request
          </h2>
          <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 hover:text-[#1976d2] transition-colors">
            <FiArrowLeft /> Back to Orders
          </button>
        </div>
        <div className="mt-3 w-full h-[1px] bg-linear-to-r from-slate-200 via-slate-100 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: The Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 shadow-sm"
          >
            <h3 className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest mb-6">
              Return Details
            </h3>

            <div className="space-y-6">
              {/* Reason for Return */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-800 uppercase tracking-wider">
                  Why are you returning this?
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1976d2] transition-all cursor-pointer">
                  <option>Select a reason</option>
                  <option>Defective / Not working</option>
                  <option>Changed my mind</option>
                  <option>Wrong item received</option>
                  <option>Damaged during shipping</option>
                </select>
              </div>

              {/* Items to return */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-700 uppercase tracking-wider">
                  Select Items to Return
                </label>
                <div className="space-y-3">
                  {orderInfo.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-xl"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-[#1976d2] focus:ring-[#1976d2]"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-bold text-slate-700">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          ৳{item.price} x {item.qty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-700 uppercase tracking-wider">
                  Additional Comments
                </label>
                <textarea
                  placeholder="Please describe the issue in detail..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1976d2] transition-all min-h-[120px]"
                ></textarea>
              </div>

              {/* Image Upload Placeholder */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-slate-700 uppercase tracking-wider">
                  Upload Photos (Required for defects)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <FiCamera
                    className="text-slate-300 group-hover:text-[#1976d2] transition-colors mb-2"
                    size={24}
                  />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Click to upload or drag & drop
                  </p>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-[#1976d2] text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-[#1565c0] transition-all active:scale-[0.98] disabled:bg-slate-300"
              >
                {loading ? "Processing Request..." : "Submit Return Request"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary & Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <FiPackage className="text-blue-400" />
              <h4 className="text-[11px] font-black uppercase tracking-widest">
                Order Summary
              </h4>
            </div>
            <div className="space-y-3 pb-4 border-b border-white/10">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Order ID</span>
                <span className="font-bold">{orderInfo.order_id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Date</span>
                <span className="font-bold">{orderInfo.order_date}</span>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-3 text-blue-400">
              <FiInfo size={14} />
              <p className="text-[10px] font-bold uppercase tracking-wider italic">
                Items must be in original condition
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3 text-amber-700">
              <FiAlertCircle size={20} />
              <h4 className="text-[11px] font-black uppercase tracking-widest">
                Return Policy
              </h4>
            </div>
            <ul className="space-y-3 text-[11px] text-amber-800/80 font-medium leading-relaxed">
              <li>
                • Returns must be initiated within{" "}
                <span className="font-bold">7 days</span> of delivery.
              </li>
              <li>• Tags and original packaging must be intact.</li>
              <li>
                • Electronics with broken seals cannot be returned unless
                defective.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;
