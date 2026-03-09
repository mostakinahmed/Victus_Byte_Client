import React from "react";
import { motion } from "framer-motion";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiExternalLink,
} from "react-icons/fi";

const SupportPage = () => {
  const contactInfo = [
    {
      icon: <FiPhone />,
      label: "Helpline",
      value: "+880 961-342936",
      sub: "Available 24/7 for urgent issues",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <FiMail />,
      label: "Email Support",
      value: "support@victusbyte.com",
      sub: "Average response: 2 hours",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: <FiMapPin />,
      label: "Corporate Office",
      value: "Dhanmondi",
      sub: "Dhaka, Bangladesh",
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-sans"
    >
      {/* 1. Heading Style from Account Overview */}
      <div className="relative mb-4">
        <h2 className="text-[13px]  font-bold md:font-black text-slate-800 uppercase tracking-[0.1em] flex items-center gap-3">
          <span className="w-1 h-5 bg-[#1976d2] rounded-full"></span>
          Support & Help Center
        </h2>
        <div className="mt-3 w-full h-[1px] bg-linear-to-r from-slate-200 via-slate-100 to-transparent"></div>
      </div>

      {/* 2. Hero Support Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 px-8 p-3 pb-8 bg-slate-50/50 rounded-2xl border border-slate-100 relative overflow-hidden group mb-8">
        {/* Background Decorative Tint */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Call Center Illustration Section */}
        <div className="relative shrink-0">
          <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-full p-4 shadow-xl shadow-blue-100/50 border border-blue-50">
            {/* Call Center Illustration */}
            <img
              src="https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/Pasted%20image.png"
              alt="Call Center Support"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"
            title="We are Online"
          />
        </div>

        {/* Support Text Content */}
        <div className="flex-grow text-center md:text-left z-10">
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">
            How can we help you?
          </h3>
          <p className="text-slate-600 max-w-lg mb-6 leading-relaxed">
            Our dedicated support team is here to assist you with your orders,
            technical issues, or any inquiries regarding{" "}
            <span className="text-[#1976d2] font-bold">Victus Byte</span>{" "}
            services.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="bg-[#1976d2] text-white px-6 py-3 rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-[#1565c0] transition-all shadow-lg shadow-blue-200 active:scale-95 flex items-center gap-2">
              <FiMessageSquare /> Start Live Chat
            </button>
            <button className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
              FAQs <FiExternalLink />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Contact Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((info, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-50 group"
          >
            <div
              className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mb-5 text-xl transition-transform group-hover:scale-110`}
            >
              {info.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {info.label}
            </p>
            <p className="text-sm font-semibold text-slate-800 mb-1">
              {info.value}
            </p>
            <p className="text-[11px] text-slate-700">{info.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. Victus Byte Business Hours (Stats Style) */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Weekday Support", value: "24 Hours", color: "bg-blue-50" },
          {
            label: "Weekend Support",
            value: "10am - 8pm",
            color: "bg-orange-50",
          },
          { label: "Phone Support", value: "Active", color: "bg-green-50" },
          { label: "Email Support", value: "Active", color: "bg-indigo-50" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`${stat.color} p-4 rounded-xl text-center border border-black/5`}
          >
            <p className="text-lg font-semibold text-slate-700">{stat.value}</p>
            <p className="text-[9px] text-slate-700 font-bold uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SupportPage;
