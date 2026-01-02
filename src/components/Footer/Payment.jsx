import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiLock,
  FiCreditCard,
  FiCheckCircle,
  FiSmartphone,
  FiGlobe,
  FiInfo,
  FiZap,
} from "react-icons/fi";

const PaymentOptions = () => {
  return (
    <div className="max-w-[1400px] mx-auto md:px-4 px-2 md:mt-27 mt-15 min-h-screen pb-24">
      {/* --- 1. HERO HEADER (Unified Style) --- */}
      <section className="relative md:py-20 py-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              Payment <span className="text-indigo-500">Gateway</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
              Victus Byte // Secure Financial Transaction Protocol
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. MAIN CONTENT --- */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto  grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Security Standards (5 Columns) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">
                Security Level: High
              </h2>
              <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-8">
                Bank-Grade <br /> Encryption Registry
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                Every transaction on Victus Byte is processed through a
                **256-bit SSL encrypted tunnel**. We do not store your card
                details; we only utilize verified local and international
                payment gateways.
              </p>
            </div>

            <div className="space-y-4">
              <SecurityFeature
                icon={<FiLock />}
                title="End-to-End Encryption"
                desc="SSL certified secure data transmission."
              />
              <SecurityFeature
                icon={<FiShield />}
                title="Fraud Protection"
                desc="Real-time transaction monitoring & 3D Secure."
              />
              <SecurityFeature
                icon={<FiZap />}
                title="Instant Settlement"
                desc="Real-time confirmation for MFS payments."
              />
            </div>
          </div>

          {/* RIGHT: Payment Methods (7 Columns) */}
          <div className="lg:col-span-7 space-y-12">
            {/* MFS Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FiSmartphone className="text-indigo-600 text-xl" />
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Mobile Financial Services (MFS)
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PaymentCard name="bKash" color="hover:border-[#D12053]" />
                <PaymentCard name="Nagad" color="hover:border-[#F7941D]" />
                <PaymentCard name="Rocket" color="hover:border-[#8C3494]" />
              </div>
            </div>

            {/* Cards Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FiCreditCard className="text-indigo-600 text-xl" />
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Cards & Net Banking
                </h4>
              </div>
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                <div className="text-center font-black text-slate-400 text-xs">
                  VISA
                </div>
                <div className="text-center font-black text-slate-400 text-xs">
                  MASTERCARD
                </div>
                <div className="text-center font-black text-slate-400 text-xs">
                  AMEX
                </div>
                <div className="text-center font-black text-slate-400 text-xs">
                  NEXUS
                </div>
              </div>
            </div>

            {/* COD Notice */}
            <div className="p-8 bg-indigo-600 rounded-[3rem] text-white relative overflow-hidden shadow-xl shadow-indigo-100">
              <div className="relative z-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4">
                  Cash on Delivery (COD)
                </h4>
                <p className="text-sm font-medium leading-relaxed text-indigo-100">
                  Nationwide COD is available. A nominal booking fee of **৳200**
                  is required via MFS to confirm the shipment registry. The
                  remaining balance is payable to the courier upon product
                  inspection.
                </p>
              </div>
              <FiGlobe
                size={150}
                className="absolute -bottom-10 -right-10 text-white opacity-10"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- Helper Components --- */

const SecurityFeature = ({ icon, title, desc }) => (
  <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 group transition-all">
    <div className="p-3 bg-white shadow-sm rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none mb-1.5">
        {title}
      </h4>
      <p className="text-[10px] font-bold text-slate-500 uppercase">{desc}</p>
    </div>
  </div>
);

const PaymentCard = ({ name, color }) => (
  <div
    className={`p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${color} hover:shadow-xl hover:-translate-y-1`}
  >
    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
      <FiCheckCircle className="text-slate-300" />
    </div>
    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">
      {name}
    </span>
  </div>
);

export default PaymentOptions;
