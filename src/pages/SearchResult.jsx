import React, { useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { DataContext } from "../components/Context Api/UserContext";
import Swal from "sweetalert2";

export default function SearchResult() {
  const { productData } = useContext(DataContext);
  const { keyword } = useParams();
  const navigate = useNavigate();

  // 1. Clean and normalize the keyword from URL
  const decodedKeyword = keyword
    ? keyword.replace(/-/g, " ").toLowerCase().trim()
    : "";

  // 2. Strict Keyword-Only Filter Logic
  // Matches based on the manually entered tags in your AddProduct keywords array
  const filtered = decodedKeyword
    ? productData.filter((p) => {
        const searchWords = decodedKeyword.split(" ");
        const productKeywords = (p.keywords || []).map((k) => k.toLowerCase());

        // Returns true only if EVERY word typed in the search bar
        // matches at least one tag in the keywords array
        return searchWords.every((word) =>
          productKeywords.some((tag) => tag.includes(word)),
        );
      })
    : [];

  useEffect(() => {
    // Alert logic: Only trigger if a search was attempted and failed
    if (decodedKeyword && filtered.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Registry Empty",
        text: `No matches found for "${decodedKeyword}"`,
        backdrop: `rgba(15, 23, 42, 0.4)`,
        confirmButtonColor: "#4f46e5",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [filtered.length, decodedKeyword]);

  // --- 3. Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[1400px] mt-[20px] lg:mt-[65px] mx-auto lg:px-4 px-2 py-10 min-h-screen"
    >
      {/* --- HEADER SECTION --- */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:mb-5 mb-2.5 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#fe741d] rounded-full" />
          <h1 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-widest">
            Registry Query:{" "}
            <span className="text-[#fe741d]">"{decodedKeyword}"</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
          <div
            className={`w-2 h-2 rounded-full ${
              filtered.length > 0
                ? "bg-emerald-500 animate-pulse"
                : "bg-rose-500"
            }`}
          />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {filtered.length} Units Located
          </span>
        </div>
      </motion.div>

      {/* --- RESULTS GRID --- */}
      {filtered.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200"
        >
          <div className="p-6 bg-white rounded-full shadow-xl mb-6">
            <svg
              className="w-12 h-12 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em] text-center px-4">
            Search string returned zero results.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-sm"
          >
            Reset Terminal
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-2.5"
        >
          {filtered.map((product) => (
            <Link
              key={product.pID}
              to={`/${product.category}/${product.name.replace(/\s+/g, "-").toLowerCase()}`}
              className=""
            >
              <ProductCard data={product} />
            </Link>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
