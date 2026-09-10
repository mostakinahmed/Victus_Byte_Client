import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "./Context Api/UserContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const { productData } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState(""); // State for animated text
  const navigate = useNavigate();
  const location = useLocation();
  const wrapperRef = useRef(null);

  // --- AUTO TYPING LOGIC ---
  useEffect(() => {
    const phrases = [
      "Search for Graphics Cards. . . . . .",
      "Looking for Motherboards?",
      "Search for Ryzen Processors. . . . .",
      "Find the best Gaming Mice. . . . . .",
      "Search for 1TB NVMe SSDs. . . . .",
    ];

    let currentPhraseIndex = 0;
    let currentCharacterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 200;
    let timerId;

    const type = () => {
      const currentFullPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setPlaceholder(
          currentFullPhrase.substring(0, currentCharacterIndex - 1),
        );
        currentCharacterIndex--;
        typingSpeed = 100;
      } else {
        setPlaceholder(
          currentFullPhrase.substring(0, currentCharacterIndex + 1),
        );
        currentCharacterIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharacterIndex === currentFullPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && currentCharacterIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }

      timerId = setTimeout(type, typingSpeed);
    };

    timerId = setTimeout(type, typingSpeed);
    return () => clearTimeout(timerId); // Cleanup
  }, []);

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
        const words = search.toLowerCase().trim().split(" ");
        const productKeywords = (p.keywords || []).map((k) => k.toLowerCase());

        // Returns true only if EVERY word typed in the search bar
        // is found somewhere in the product's keywords array
        return words.every((word) =>
          productKeywords.some((keyword) => keyword.includes(word)),
        );
      })
    : [];

  const searchPage = () => {
    if (!search.trim()) return;
    navigate(`/search-result/${search}`);
    setSearch("");
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto md:mx-0 pb-1 md:pb-0">
      {/* Premium Glow */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#1976d2]/20 via-transparent to-[#1976d2]/20 blur-sm"></div>

      {/* Search Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchPage()}
          className="
        w-full
        bg-slate-50
        md:bg-gray-900
        border
        border-slate-500/20
        rounded-full
        px-5
        py-2
        pr-14
        text-gray-800
        text-md
        transition-all
        duration-300

      
   

        focus:bg-white
        focus:border-brand
        focus:ring-4
        focus:ring-brand/10
        focus:outline-none

        placeholder:text-slate-500
        md:placeholder:text-sm
        placeholder:text-xs
        placeholder:tracking-wide
      "
        />

        {/* Search Button */}
        <button
          onClick={searchPage}
          className="
        absolute
        right-1
        md:h-9
        md:w-9
        h-8
        w-8
        rounded-full
        bg-[#f66107ff]
        flex
        items-center
        justify-center
        shadow-md
        hover:scale-105
        hover:shadow-lg
        transition-all
        duration-300
      "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.64 5.64a7.5 7.5 0 0 0 10.61 10.61Z"
            />
          </svg>
        </button>
      </div>

      {/* Search Results Dropdown */}
      <div
        className={`absolute left-0 top-full mt-2 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-[110] transition-all duration-300 ${
          search
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div
          className="px-4 py-2 flex justify-between items-center bg-[#f66107ff]"
    
        >
          <span className="text-white text-xs font-bold uppercase tracking-widest">
            Quick Results
          </span>

        
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.slice(0, 5).map((p) => (
              <Link
                key={p.pID}
                to={`/${p.category}/${p.name}`}
                onClick={() => setSearch("")}
                className="
              flex
              items-center
              gap-4
              px-4
              py-3
              border-b
              border-slate-100
              transition
              group
            "
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FDF2EC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 p-1 shadow-sm">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <span
                    className="text-sm font-semibold text-gray-800 truncate transition"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F66107")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    {p.name}
                  </span>

                  <span className="text-[10px] uppercase tracking-wider text-slate-400">
                    {p.category}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-sm text-slate-400">No products found</p>
            </div>
          )}
        </div>

        {filtered.length > 5 && (
          <button
            onClick={searchPage}
            className="
          w-full
          py-3
          bg-slate-50
          font-bold
          text-xs
          uppercase
          tracking-widest
          transition-all
          cursor-pointer
        "
            style={{ color: "#F66107" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F66107";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F8FAFC";
              e.currentTarget.style.color = "#F66107";
            }}
          >
            View All Results ({filtered.length})
          </button>
        )}
      </div>
    </div>
  );
};
