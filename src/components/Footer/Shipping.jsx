import React from "react";
import { motion } from "framer-motion";
import {
  FiTruck,
  FiMapPin,
  FiClock,
  FiShield,
  FiPackage,
  FiCheckCircle,
  FiInfo,
  FiZap,
} from "react-icons/fi";

const Shipping = () => {
  return (
    <div className="max-w-[1400px] mx-auto md:px-4 px-2 md:mt-27 mt-15 min-h-screen pb-5">
      {/* --- 1. HERO HEADER (Unified Style) --- */}
      <section className="relative md:py-20 py-15 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className=" px-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              Logistics <span className="text-indigo-500">Registry</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
              Victus Byte // Nationwide Fulfillment Protocol
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. MAIN CONTENT (1400px Constraint) --- */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto  space-y-20">
          {/* TOP SECTION: Delivery Tiers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <DeliveryTier
              icon={<FiZap className="text-amber-500" />}
              title="Dhaka Express"
              timeline="Same Day / 24 Hours"
              coverage="Inside Dhaka City"
              fee="৳80"
              highlight
            />
            <DeliveryTier
              icon={<FiTruck className="text-indigo-500" />}
              title="Standard Nationwide"
              timeline="2 - 4 Business Days"
              coverage="All 64 Districts"
              fee="৳150"
            />
            <DeliveryTier
              icon={<FiPackage className="text-slate-400" />}
              title="Bulk Handling"
              timeline="3 - 5 Business Days"
              coverage="Cases, Monitors, UPS"
              fee="Custom Rate"
            />
          </div>

          {/* MIDDLE SECTION: Courier Partners & Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">
                Authorized Partners
              </h2>
              <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-8">
                Nationwide Connectivity <br /> via Trusted Nodes
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                To ensure your high-value gadgets reach you safely, Victus Byte
                only utilizes premium courier registries. Every parcel is
                insured and trackable via our partner portals.
              </p>

              <div className="flex flex-wrap gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder for Courier Names/Logos */}
                {[
                  "Pathao Courier",
                  "Steadfast",
                  "RedX",
                  "Paperfly",
                  "SA Paribahan",
                  "Sundarban",
                ].map((partner) => (
                  <span
                    key={partner}
                    className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-100">
                  <FiShield />
                </div>
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest">
                  Safety Protocol
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm font-medium text-slate-600">
                  <FiCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                  Every smartphone and gadget is triple-bubble wrapped.
                </li>
                <li className="flex gap-3 text-sm font-medium text-slate-600">
                  <FiCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                  Fragile electronics are shipped in customized hard-shell
                  boxes.
                </li>
                <li className="flex gap-3 text-sm font-medium text-slate-600">
                  <FiCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                  Real-time SMS notifications for every stage of transit.
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM SECTION: Important Info Grid */}
          <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              <InfoItem
                title="Advance Policy"
                desc="For outside Dhaka, a minimal ৳200 advance is required to confirm the registry. This ensures legitimate shipping flow."
              />
              <InfoItem
                title="Condition Check"
                desc="We recommend recording an 'Unboxing Video' for high-value gadgets to facilitate instant insurance claims if needed."
              />
              <InfoItem
                title="Pickup Points"
                desc="While we are primarily online, certain products can be picked up from our Multiplan Hub with prior booking."
              />
            </div>
            {/* Decorative Background Icon */}
            <FiMapPin
              size={200}
              className="absolute -bottom-20 -right-20 text-white/5 opacity-20 rotate-12"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- Helper Components --- */

const DeliveryTier = ({ icon, title, timeline, coverage, fee, highlight }) => (
  <div
    className={`p-8 rounded-[2.5rem] border transition-all duration-300 hover:shadow-2xl ${
      highlight
        ? "bg-indigo-50 mx-2 border-indigo-200 scale-105 z-10"
        : "bg-white border-slate-100"
    }`}
  >
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6">
      {icon}
    </div>
    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
      {coverage}
    </h4>
    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
      {title}
    </h3>
    <div className="space-y-2 mb-8">
      <p className="flex items-center gap-2 text-xs font-bold text-slate-600">
        <FiClock className="text-indigo-500" /> {timeline}
      </p>
      <p className="text-2xl font-black text-indigo-600">{fee}</p>
    </div>
    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full bg-indigo-500 ${highlight ? "w-full" : "w-2/3"}`}
      ></div>
    </div>
  </div>
);

const InfoItem = ({ title, desc }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-indigo-400">
      <FiInfo size={18} />
      <h4 className="text-xs font-black uppercase tracking-widest">{title}</h4>
    </div>
    <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Shipping;
