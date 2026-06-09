import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiShield,
  FiTruck,
  FiCreditCard,
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
      icon: <FiShield size={18} />,
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
      icon: <FiTruck size={18} />,
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
      icon: <FiCreditCard size={18} />,
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
      icon: <FiSettings size={18} />,
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
    <div className="min-h-screen max-w-[1400px] mx-auto mt-30 px-4 bg-slate-50/50 font-sans pb-16">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative py-16 md:py-16 px-5 bg-slate-900 overflow-hidden">
        {/* Subtle Ambient Glow Effect */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fe741d] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#fe741d] uppercase block mb-3">
              Victus Byte Knowledge Base
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              Support &amp; Safety Protocols
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl font-medium leading-relaxed">
              Find instant answers regarding item authenticity, regional shipping channels, warranty validations, and payment pathways.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. LAYOUT GRID SYSTEM --- */}
      <section className=" py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: STICKY SEARCH BAR & ACTION CENTER */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              
              {/* Header Title Information */}
              <div>
                <h2 className="text-xs font-bold text-[#fe741d] uppercase tracking-wider mb-2">
                  Help Desk Hub
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  Have Questions? We Have Answers.
                </h3>
              </div>

              {/* ✅ FIXED: Interactive Search Bar Module */}
              <div className="relative shadow-sm rounded-xl overflow-hidden">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FiSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search keywords, variant protocols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#fe741d] focus:ring-1 focus:ring-[#fe741d] transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Live Support Card */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-50 text-[#fe741d] rounded-xl">
                    <FiHelpCircle size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Direct Assistance Desk
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed mb-5">
                  Can't discover the specific technical context you need? Open a priority diagnostic ticket with our technical team.
                </p>
                <button className="w-full py-3 bg-slate-900 border border-transparent rounded-xl text-xs font-bold uppercase tracking-wider text-white hover:bg-[#fe741d] transition-colors shadow-sm">
                  Open Support Ticket
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: FILTERED ACCORDION ROW LIST */}
          <div className="lg:col-span-8 space-y-10">
            {filteredData.length > 0 ? (
              filteredData.map((section, idx) => (
                <div key={idx} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  
                  {/* Category Header Label */}
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
                    <span className="text-[#fe741d] p-1.5 bg-orange-50 rounded-lg">
                      {section.icon}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {section.category}
                    </h4>
                  </div>

                  {/* Accordion List Rows */}
                  <div className="space-y-3">
                    {section.questions.map((faq) => {
                      const isOpen = activeId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "bg-slate-50/50 border-orange-200/70 shadow-sm"
                              : "bg-white border-slate-100 hover:border-slate-200/80"
                          }`}
                        >
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors"
                          >
                            <span className="text-sm md:text-base font-semibold text-slate-800 tracking-tight leading-snug">
                              {faq.q}
                            </span>
                            <div
                              className={`shrink-0 ml-4 p-1.5 rounded-lg transition-all duration-300 ${
                                isOpen
                                  ? "bg-[#fe741d] text-white shadow-sm shadow-orange-100"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                              >
                                <div className="px-5 pb-5 pt-1 text-slate-600 text-sm md:text-base font-medium leading-relaxed border-t border-slate-100 mx-1">
                                  <div className="flex gap-2.5 pt-3">
                                    <FiChevronRight className="mt-1 text-[#fe741d] shrink-0" size={16} />
                                    <p className="flex-1 text-slate-600 text-sm leading-relaxed">
                                      {faq.a}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                  No matching protocols discovered.
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