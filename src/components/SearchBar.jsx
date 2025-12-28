import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "./Context Api/UserContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const { productData } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const wrapperRef = useRef(null); // ref for click outside

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearch(""); // closes dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Clear search when route changes
  useEffect(() => {
    setSearch("");
  }, [location.pathname]);

  // Filter logic (multi-word match in name OR description)
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
    navigate(`/search-result/${search}`);
    setSearch(""); // close dropdown after navigating
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            searchPage();
          }
        }}
        className="w-full bg-white px-4 py-1.5 md:py-1 rounded-xs border-2 border-[#f4813a] text-black focus:outline-none"
      />

      {/* Search Icon Right */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        onClick={searchPage}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 cursor-pointer hover:text-black transition"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.64 5.64a7.5 7.5 0 0 0 10.61 10.61Z"
        />
      </svg>

      {/* SEARCH DROPDOWN */}
      {/* SEARCH DROPDOWN */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 mt-1 w-full bg-white border-x-4 border-b-4 border-[#f4813a] shadow-2xl overflow-hidden z-50 transition-all duration-300 ease-out origin-top ${
          search
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-8 text-white bg-[#f4813a] px-3 py-1.5 font-semibold">
          Product List:
        </div>

        {/* Results List */}
        <div className="max-h-[400px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.slice(0, 5).map((p) => (
              <Link
                key={p.pID}
                to={`/product/${p.category}/${p.pID}`}
                onClick={() => setSearch("")}
                className="flex items-center gap-4 px-3 py-2 border-b border-gray-100 hover:bg-orange-50 transition-colors"
              >
                <img
                  src={p.images}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded shadow-sm"
                />
                <span className="text-gray-800 font-medium truncate">
                  {p.name}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-4 py-6 text-center text-gray-500 italic">
              No results found for "{search}"
            </p>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 5 && (
          <div className="bg-[#f4813a] transition-colors hover:bg-[#e66d21]">
            <button
              onClick={searchPage}
              className="w-full py-2 text-white font-bold text-sm uppercase tracking-wider"
            >
              See {filtered.length - 5} more results...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
