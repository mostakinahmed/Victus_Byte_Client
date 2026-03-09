import React from "react";
import { motion } from "framer-motion";
import {
  FiGift,
  FiStar,
  FiTrendingUp,
  FiInfo,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

const LoyaltyPage = ({ user }) => {
  // Define thresholds and styles
  const tiers = [
    {
      name: "Platinum Member",
      min: 5000,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      name: "Gold Member",
      min: 1500,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      name: "Silver Member",
      min: 500,
      color: "text-slate-300",
      bg: "bg-slate-500/10",
      border: "border-slate-500/20",
    },
    {
      name: "Bronze Member",
      min: 0,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
  ];

  // Logic to decide the user's tier based on loyaltyPoints
  const userPoints = user?.loyaltyPoints || 0;
  const currentTier =
    tiers.find((t) => userPoints >= t.min) || tiers[tiers.length - 1];
  const nextTier = tiers[tiers.indexOf(currentTier) - 1];

  // Calculate dynamic progress
  const progress = nextTier
    ? Math.min(
        ((userPoints - currentTier.min) / (nextTier.min - currentTier.min)) *
          100,
        100,
      )
    : 100;

  // Sync rewards status with actual user points
  const rewards = [
    {
      points: 500,
      label: "৳50 Discount Voucher",
      code: "LOYAL50",
      status: userPoints >= 500 ? "Unlocked" : "Locked",
    },
    {
      points: 1500,
      label: "Free Shipping on next Order",
      code: "FREESHIP",
      status: userPoints >= 1500 ? "Unlocked" : "Locked",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-sans"
    >
      {/* 1. Header Section */}
      <div className="relative mb-5">
        <h2 className="text-[13px]  font-bold md:font-black text-slate-800 uppercase tracking-[0.1em] flex items-center gap-3">
          <span className="w-1 h-5 bg-[#1976d2] rounded-full"></span>
          Loyalty Rewards
        </h2>
        <div className="mt-3 w-full h-[1px] bg-linear-to-r from-slate-200 via-slate-100 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* 2. Main Points Card */}
          <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl border-b-8 border-[#1976d2]">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                {/* Dynamic Tier Badge */}
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 px-3 py-1 rounded-full border w-fit mx-auto md:mx-0 ${currentTier.bg} ${currentTier.color} ${currentTier.border}`}
                >
                  {currentTier.name}
                </p>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
                  {userPoints.toLocaleString()}{" "}
                  <span className="text-xl text-slate-500 font-medium tracking-normal">
                    pts
                  </span>
                </h1>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                  {nextTier ? (
                    <>
                      You are only{" "}
                      <span className="text-white font-bold">
                        {nextTier.min - userPoints} points
                      </span>{" "}
                      away from becoming a{" "}
                      <span
                        className={`${nextTier.color} font-black underline underline-offset-4 decoration-blue-500/30`}
                      >
                        {nextTier.name}
                      </span>
                      .
                    </>
                  ) : (
                    "You've reached our highest tier! Enjoy your Platinum benefits."
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <button className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-black uppercase text-[11px] tracking-widest px-10 py-4 rounded-xl transition-all active:scale-90 shadow-xl shadow-blue-900/40 cursor-pointer">
                  Redeem Now
                </button>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="mt-7">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {nextTier
                    ? `Progress to ${nextTier.name}`
                    : "Max Tier Reached"}
                </span>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="bg-white/5 h-3 rounded-full overflow-hidden border border-white/10 p-[2px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-linear-to-r from-[#1976d2] via-[#3b82f6] to-cyan-400 rounded-full shadow-[0_0_20px_rgba(25,118,210,0.4)]"
                ></motion.div>
              </div>
            </div>
          </div>

          {/* 3. Reward Milestones */}
          <div className="mt-12 space-y-4">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-6 px-2">
              Available Milestones
            </h3>
            {rewards.map((reward, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${
                  reward.status === "Unlocked"
                    ? "bg-white border-slate-200 shadow-sm"
                    : "bg-slate-50 border-slate-100 opacity-70"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`p-4 rounded-xl ${reward.status === "Unlocked" ? "bg-amber-100 text-amber-600" : "bg-slate-200 text-slate-400"}`}
                  >
                    <FiGift size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {reward.label}
                    </h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {reward.points} Points Required
                    </p>
                  </div>
                </div>
                {reward.status === "Unlocked" ? (
                  <button className="text-[#1976d2] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                    Claim <FiArrowRight />
                  </button>
                ) : (
                  <div className="text-slate-500 font-black text-[10px] uppercase tracking-widest">
                    Locked
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Side Info Panel */}
        <div className="space-y-6">
          <div className="bg-linear-to-b from-white to-blue-50/50 border border-blue-100 rounded-3xl p-8 shadow-xl shadow-blue-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-[#1976d2]">
                <FiTrendingUp size={20} />
              </div>
              <h4 className="font-black text-slate-800 uppercase text-[11px] tracking-[0.2em]">
                Earning Rules
              </h4>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                  <span className="text-xs font-black">৳</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed self-center">
                  Earn{" "}
                  <span className="text-emerald-600 font-black">5 points</span>{" "}
                  for every{" "}
                  <span className="text-slate-800 font-bold">৳100 spent</span>.
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 transition-transform group-hover:scale-110">
                  <FiStar size={16} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed self-center">
                  Get{" "}
                  <span className="text-amber-600 font-black">
                    100 bonus pts
                  </span>{" "}
                  for your{" "}
                  <span className="text-slate-800 font-bold">first review</span>
                  .
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500 transition-transform group-hover:scale-110">
                  <FiClock size={16} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed self-center">
                  Points expire after{" "}
                  <span className="text-rose-500 font-black">12 months</span> of
                  inactivity.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoyaltyPage;
