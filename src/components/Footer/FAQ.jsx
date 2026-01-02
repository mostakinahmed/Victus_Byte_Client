import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiShield,
  FiTruck,
  FiCreditCard,
  FiPackage,
  FiHelpCircle,
  FiSearch,
  FiChevronRight,
  FiSettings,
} from "react-icons/fi";

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      category: "Authenticity & Products",
      icon: <FiShield />,
      questions: [
        {
          id: 1,
          q: "Are your smartphones official or global variants?",
          a: "We provide both Official and Global variants. Every product page clearly specifies the variant type. All Global variants are verified to work perfectly with Bangladeshi cellular networks.",
        },
        {
          id: 2,
          q: "Do you sell refurbished products?",
          a: "Absolutely not. Victus Byte has a zero-tolerance policy for refurbished or clone products. Every item in our inventory is 100% brand new and factory-sealed.",
        },
        {
          id: 3,
          q: "Can I verify the IMEI before purchasing?",
          a: "Yes. For official units, you can verify the IMEI via the BTRC database. For global units, we provide the serial number upon request after order confirmation.",
        },
      ],
    },
    {
      category: "Shipping & Logistics",
      icon: <FiTruck />,
      questions: [
        {
          id: 4,
          q: "How long does delivery take within Dhaka?",
          a: "For orders within Dhaka city, we offer 'Same-Day' delivery if ordered before 12 PM, otherwise 'Next-Day' delivery via our internal logistics registry.",
        },
        {
          id: 5,
          q: "Do you ship nationwide across Bangladesh?",
          a: "Yes, we ship to all 64 districts using high-priority courier partners like Pathao and Steadfast. Estimated delivery time is 2-4 business days.",
        },
        {
          id: 6,
          q: "What are the delivery charges?",
          a: "Standard delivery inside Dhaka is ৳80. For outside Dhaka, it is ৳150. Bulkier items like PC Cases or Monitors may have additional handling fees.",
        },
      ],
    },
    {
      category: "Payments & Security",
      icon: <FiCreditCard />,
      questions: [
        {
          id: 7,
          q: "Which payment methods do you accept?",
          a: "We accept bKash, Nagad, Rocket, and all major Debit/Credit cards. Cash on Delivery (COD) is available nationwide with a small advance booking fee.",
        },
        {
          id: 8,
          q: "Is it safe to pay online on Victus Byte?",
          a: "Yes. Our gateway uses 256-bit SSL encryption. We never store your card details; all transactions are processed through secure, bank-grade protocols.",
        },
      ],
    },
    {
      category: "After-Sales & Warranty",
      icon: <FiSettings />,
      questions: [
        {
          id: 9,
          q: "How do I claim a warranty?",
          a: "Simply visit our 'Track Order' page or contact our support node with your Order ID. Our team will guide you through the official brand service center or our internal service protocol.",
        },
        {
          id: 10,
          q: "What is your replacement policy?",
          a: "We offer a 7-day replacement guarantee for manufacturing defects. The product must be returned with its original packaging and all included accessories.",
        },
      ],
    },
  ];

  const filteredData = faqData
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.questions.length > 0);

  const toggleFAQ = (id) => setActiveId(activeId === id ? null : id);

  return (
    <div className="max-w-[1400px] mx-auto md:px-4 px-2 md:mt-27 mt-15 min-h-screen pb-5">
      {/* --- 1. UNIFIED HERO SECTION (Matched to About/Contact) --- */}
      <section className="relative md:py-20 py-15 bg-slate-900 overflow-hidden">
        {/* Signature Glow Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* ✅ Container: 1400px Max Width */}
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              Knowledge <span className="text-indigo-500">Base</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
              Victus Byte // Support & Protocol Documentation
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. FAQ GRID SYSTEM --- */}
      <section className="py-24">
        {/* ✅ Container: 1400px Max Width */}
        <div className="max-w-[1400px] mx-auto px-2 lg:grid lg:grid-cols-12 lg:gap-24">
          {/* LEFT: STICKY SEARCH & HELP CARD */}
          <div className="lg:col-span-4 mb-16 lg:mb-0">
            <div className="lg:sticky lg:top-32 space-y-10">
              <div>
                <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">
                  Support Hub
                </h2>
                <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-8 leading-tight">
                  Common Queries &  Safety Protocols
                </h3>
              </div>

         

              {/* Live Node Status Card */}
              <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm hidden lg:block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100">
                    <FiHelpCircle />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">
                    Support Node
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                  Can't find what you are looking for? Contact our live registry
                  for immediate assistance.
                </p>
                <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm">
                  Open Support Ticket
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: ACCORDION LIST */}
          <div className="lg:col-span-8 space-y-16">
            {filteredData.length > 0 ? (
              filteredData.map((section, idx) => (
                <div
                  key={idx}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
                    <span className="text-indigo-600 p-2 bg-indigo-50 rounded-lg">
                      {section.icon}
                    </span>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                      {section.category}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {section.questions.map((faq) => (
                      <div
                        key={faq.id}
                        className={`group border rounded-[2.5rem] transition-all duration-300 ${
                          activeId === faq.id
                            ? "bg-slate-50 border-indigo-200"
                            : "bg-white border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full px-6 py-9 flex items-center justify-between text-left"
                        >
                          <span className="text-sm md:text-lg font-black uppercase tracking-tight text-slate-800">
                            {faq.q}
                          </span>
                          <div
                            className={`shrink-0 ml-4 p-2 rounded-2xl transition-all ${
                              activeId === faq.id
                                ? "bg-indigo-600 text-white rotate-0 shadow-lg shadow-indigo-100"
                                : "bg-slate-100 text-slate-400 rotate-90"
                            }`}
                          >
                            {activeId === faq.id ? (
                              <FiMinus size={18} />
                            ) : (
                              <FiPlus size={18} />
                            )}
                          </div>
                        </button>

                        <AnimatePresence>
                          {activeId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "circOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-8 text-slate-600 text-base font-medium leading-relaxed border-t border-indigo-100/50 pt-6 mx-4">
                                <p className="flex gap-4">
                                  <FiChevronRight className="mt-1 text-indigo-500 shrink-0" />
                                  {faq.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <p className="text-slate-400 font-black uppercase tracking-widest">
                  No matching protocols found.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
