import React from "react";
import { motion } from "framer-motion";
import {
  FiRefreshCcw,
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiFileText,
  FiTruck,
  FiCreditCard,
  FiCornerUpLeft,
} from "react-icons/fi";

const ReturnPolicy = () => {
  return (
    <div className="max-w-[1400px] mx-auto md:px-4 px-2 md:mt-27 mt-15 min-h-screen pb-24">
      {/* --- 1. HERO HEADER (Unified Style) --- */}
      <section className="relative md:py-20 py-15 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              Return <span className="text-indigo-500">Protocol</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
              Victus Byte // Quality Assurance & Refund Policy
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. MAIN CONTENT (1400px Constraint) --- */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto space-y-24">
          {/* TOP SECTION: Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PolicyHighlight
              icon={<FiRefreshCcw />}
              title="7-Day Exchange"
              desc="Replacement guarantee for any manufacturing hardware defects discovered within 7 days."
            />
            <PolicyHighlight
              icon={<FiShield />}
              title="Verified Authentic"
              desc="Returns are strictly accepted for products that do not match the advertised specifications."
            />
            <PolicyHighlight
              icon={<FiCreditCard />}
              title="Swift Refunds"
              desc="Refunds processed within 3-5 business days via original payment method (bKash/Nagad/Bank)."
            />
          </div>

          {/* MIDDLE SECTION: Return Workflow */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">
                The Process
              </h2>
              <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-8">
                How to Initiate a <br /> Return Registry
              </h3>

              <div className="space-y-8">
                <StepItem
                  num="01"
                  title="Documentation"
                  desc="Capture an unboxing video and photos of the defect. This is critical for gadget insurance claims."
                />
                <StepItem
                  num="02"
                  title="Registry Entry"
                  desc="Contact our Support Node via WhatsApp or Email with your Order ID and evidence."
                />
                <StepItem
                  num="03"
                  title="Technical Audit"
                  desc="Ship the item back to our Multiplan Hub. Our engineers will audit the hardware within 48 hours."
                />
                <StepItem
                  num="04"
                  title="Resolution"
                  desc="Upon verification, we will issue a brand-new replacement or a full refund."
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <FiAlertTriangle className="text-amber-500 text-2xl" />
                  <h4 className="text-xs font-black uppercase tracking-[0.2em]">
                    Non-Returnable Items
                  </h4>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <FiCheckCircle className="text-indigo-500 mt-1 shrink-0" />
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Products with broken official security seals or physical
                      damage caused by the user.
                    </p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <FiCheckCircle className="text-indigo-500 mt-1 shrink-0" />
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Software products, digital licenses, or activated
                      Apple/Google IDs.
                    </p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <FiCheckCircle className="text-indigo-500 mt-1 shrink-0" />
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Items missing original accessories, manuals, or the retail
                      box.
                    </p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <FiCheckCircle className="text-indigo-500 mt-1 shrink-0" />
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Change of mind after a seal has been opened for
                      Global/Official variants.
                    </p>
                  </li>
                </ul>
              </div>
              <FiCornerUpLeft
                size={300}
                className="absolute -bottom-20 -right-20 text-white opacity-5 rotate-12"
              />
            </div>
          </div>

          {/* BOTTOM SECTION: Refund Matrix */}
          <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <FiFileText className="mx-auto text-indigo-600 text-4xl mb-6" />
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-4">
                Refund Methodology
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
                Refunds are issued to the original payment source. If you paid
                via bKash, the refund will be sent to that bKash number. Please
                allow 3-5 business days for the transaction to reflect in your
                statement after audit approval.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  bKash / Nagad
                </div>
                <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Credit Cards
                </div>
                <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Bank Transfer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- Helper Components --- */

const PolicyHighlight = ({ icon, title, desc }) => (
  <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all group">
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl text-indigo-600 shadow-sm mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3">
      {title}
    </h4>
    <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const StepItem = ({ num, title, desc }) => (
  <div className="flex gap-6 group">
    <div className="text-3xl font-black text-slate-100 group-hover:text-indigo-100 transition-colors leading-none">
      {num}
    </div>
    <div className="pb-6 border-b border-slate-100">
      <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
        {title}
      </h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default ReturnPolicy;
