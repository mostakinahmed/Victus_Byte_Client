import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "./Context Api/UserContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const { productData } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    setSearch("");
  }, [location.pathname]);

  const filtered = search
    ? productData.filter((p) => {
        const name = p.name?.toLowerCase() || "";
        const desc = p.description?.toLowerCase() || "";
        const words = search.toLowerCase().trim().split(" ");
        return words.every(
          (word) => name.includes(word) || desc.includes(word)
        );
      })
    : [];

  const searchPage = () => {
    if (!search.trim()) return;
    navigate(`/search-result/${search}`);
    setSearch("");
  };

  return (
    /* ✅ Wrapper defines the constraint for both input and dropdown */
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto md:mx-0">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchPage()}
          className="w-full bg-white px-4 pr-10 py-1.5 border-2 border-[#f4813a] text-black focus:outline-none placeholder:text-gray-400"
        />

        {/* ✅ Search Icon positioned relative to input container */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          onClick={searchPage}
          className="absolute right-3 w-5 h-5 text-gray-500 cursor-pointer hover:text-[#f4813a] transition"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.64 5.64a7.5 7.5 0 0 0 10.61 10.61Z"
          />
        </svg>
      </div>

      {/* --- SEARCH DROPDOWN --- */}
      {/* ✅ w-full and left-0 ensures it matches the input container perfectly */}
      <div
        className={`absolute left-0 top-full mt-1 w-full bg-white border-x-2 border-b-2 border-[#f4813a] shadow-2xl overflow-hidden z-[100] transition-all duration-300 ease-out origin-top ${
          search
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between text-white bg-[#f4813a] px-4 py-1.5 text-xs font-black uppercase tracking-widest">
          <span>Quick Results</span>
          <span className="text-[10px] opacity-80">
            {filtered.length} found
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
          {filtered.length > 0 ? (
            filtered.slice(0, 5).map((p) => (
              <Link
                key={p.pID}
                to={`/product/${p.category}/${p.pID}`}
                onClick={() => setSearch("")}
                className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 hover:bg-orange-50 transition-colors group"
              >
                <div className="w-10 h-10 shrink-0 bg-white rounded border border-gray-100 p-1">
                  <img
                    src={p.images[0]} // Added index 0 assuming it's an array
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-gray-800 truncate group-hover:text-[#f4813a] transition-colors">
                    {p.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    {p.category}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-gray-400 font-medium">
                No matches for "<span className="text-gray-800">{search}</span>"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 5 && (
          <button
            onClick={searchPage}
            className="w-full py-3 bg-gray-50 text-[#f4813a] hover:bg-[#f4813a] hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.2em] border-t border-gray-100"
          >
            See all {filtered.length} results
          </button>
        )}
      </div>
    </div>
  );
};
