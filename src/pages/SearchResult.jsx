import ProductCard from "../components/ProductCard";
import { DataContext } from "../components/Context Api/UserContext";
import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SearchResult() {
  const { productData } = useContext(DataContext);
  const { keyword } = useParams();
  const navigate = useNavigate();

  // ✅ 1. Sanitize the keyword: Replace hyphens back to spaces for matching
  const decodedKeyword = keyword ? keyword.replace(/-/g, " ") : "";

  // ✅ 2. Filtering logic using the cleaned keyword
  const filtered = productData.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const desc = item.description?.toLowerCase() || "";
    const words = decodedKeyword.toLowerCase().trim().split(" ");

    return words.every((word) => name.includes(word) || desc.includes(word));
  });

  useEffect(() => {
    if (filtered.length === 0 && keyword) {
      Swal.fire({
        icon: "warning",
        title: "Registry Empty",
        text: `No matches found for "${decodedKeyword}"`,
        backdrop: `rgba(15, 23, 42, 0.4)`, // Matches your Slate-900 theme
        confirmButtonColor: "#4f46e5", // Indigo-600
        timer: 2000,
      });
    }
  }, [filtered, decodedKeyword]);

  return (
    <div className="max-w-[1400px] mt-[20px] lg:mt-[65px] mx-auto lg:px-4 px-2 py-10 min-h-screen">
      {/* --- 1. SYSTEM TERMINAL HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:mb-5 mb-2.5 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#fe741d] rounded-full" />
          <h1 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-widest">
            Registry Query:{" "}
            <span className="text-[#fe741d] ">"{decodedKeyword}"</span>
          </h1>
        </div>

        {/* Status Indicator */}
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
      </div>

      {/* --- 2. RESULTS GRID --- */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
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
          <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">
            Search string returned zero results.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-sm"
          >
            Reset Terminal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-2.5 -mt-0 md:-mt-2">
          {filtered.map((product) => (
            <Link
              key={product.pID}
              /* ✅ Ensure the product name in the URL is also slugified */
              to={`/${product.category}/${product.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="hover:scale-[1.02] transition-transform duration-300"
            >
              <ProductCard data={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
