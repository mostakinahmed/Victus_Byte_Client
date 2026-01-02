import React from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiAward,
  FiUsers,
  FiBox,
  FiShield,
  FiCheck,
  FiSmartphone,
  FiWatch,
  FiZap,
  FiMonitor,
} from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className=" max-w-[1400px] mx-auto md:px-4 px-2 md:mt-27 mt-15 min-h-screen">
      {/* --- 1. HERO SECTION: Brand Identity --- */}
      <section className="relative md:py-24 py-15 bg-slate-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* ✅ Container: 1400px Max Width */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-4">
              Victus <span className="text-indigo-500">Byte</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-[10px] md:text-xs font-black uppercase tracking-[0.5em] leading-relaxed">
              Bangladesh's Premier Tech, Phone & Gadget Hub
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. THE GADGET HUB: Phones, Watches & Tech --- */}
      <section className="py-24">
        {/* ✅ Container: 1400px Max Width */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">
              The Selection
            </h2>
            <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-8">
              Premium Electronics <br /> Curated for Bangladesh
            </h3>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed font-medium">
              At **Victus Byte**, we understand that tech is an investment. We
              have expanded our horizon beyond industrial components to bring
              the world's most sought-after **Smartphones**, **Premium
              Smartwatches**, and **Computing Gadgets** directly to the BD
              market.
            </p>

            {/* Gadget Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <GadgetItem
                icon={<FiSmartphone />}
                title="Flagship Phones"
                desc="Apple, Samsung & Pixel"
              />
              <GadgetItem
                icon={<FiWatch />}
                title="Smart Wearables"
                desc="Health & Style Gear"
              />
              <GadgetItem
                icon={<FiMonitor />}
                title="Computing"
                desc="Laptops & Workstations"
              />
              <GadgetItem
                icon={<FiZap />}
                title="Modern Gadgets"
                desc="Audio & Smart Home"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl transition-all duration-700 hover:scale-[1.02] group">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1400"
                alt="Modern Tech Lifestyle"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* BD Trusted Badge */}
            <div className="absolute -bottom-8 -left-8 bg-indigo-600 text-white p-8 rounded-[2rem] shadow-2xl">
              <p className="text-3xl font-black italic uppercase leading-none">
                BD #1
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest mt-2">
                Trusted Gadget Partner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. REPUTATION: Why Choose Victus Byte? --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        {/* ✅ Container: 1400px Max Width */}
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">
              Our Reputation
            </h2>
            <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mt-3">
              Authenticity & Reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ReputationCard
              icon={<FiAward />}
              title="Official & Global"
              desc="We source genuine global and official variants of smartphones, ensuring you get the best tech without compromise."
            />
            <ReputationCard
              icon={<FiUsers />}
              title="100k+ Customers"
              desc="Over 100,000+ satisfied tech enthusiasts across BD trust Victus Byte for our transparent pricing and support."
            />
            <ReputationCard
              icon={<FiShield />}
              title="Secure Warranty"
              desc="Every gadget is backed by our comprehensive service warranty, giving you peace of mind with every single purchase."
            />
          </div>
        </div>
      </section>

      {/* --- 4. BRAND ANCHOR FOOTER --- */}
      <section className="py-20 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-500">
          Victus Byte © 2026 Registry
        </p>
      </section>
    </div>
  );
};

/* --- Helper Components --- */

const GadgetItem = ({ icon, title, desc }) => (
  <div className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-slate-100 group hover:border-indigo-500 transition-all shadow-sm hover:shadow-md">
    <div className="p-3 bg-slate-50 shadow-sm rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">
        {title}
      </span>
      <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mt-1">
        {desc}
      </span>
    </div>
  </div>
);

const ReputationCard = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
      {icon}
    </div>
    <h4 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-4">
      {title}
    </h4>
    <p className="text-base text-slate-500 font-medium leading-relaxed">
      {desc}
    </p>
    <div className="mt-8 flex items-center gap-2 text-indigo-500">
      <FiCheck size={18} />
      <span className="text-[11px] font-black uppercase tracking-widest">
        BD Authenticated
      </span>
    </div>
  </div>
);

export default AboutUs;
