import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiChevronDown,
  FiArrowRight,
  FiHome,
  FiBox,
} from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";

const CategoryDropdown = () => {
  const { categoryData, productData } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [catList, setCatList] = useState([]);

  const hoverTimeout = useRef(null);

  // Victus Byte Brand Color
  const brandColor = "#1976d2";

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setIsOpen(false);
  };

  useEffect(() => {
    if (productData.length && categoryData.length) {
      const formattedData = productData
        .map((element) => {
          const category = categoryData.find(
            (c) => c.catID === element.category,
          );
          return category
            ? { name: category.catName, icon: category.catIcon }
            : null;
        })
        .filter(Boolean);

      const uniqueCategories = Array.from(
        new Map(formattedData.map((item) => [item.name, item])).values(),
      );

      setCatList(uniqueCategories);
    }
  }, [productData, categoryData]);

  return (
    <div className="flex items-center font-sans">
      {/* Home Section */}
      <div className="-ml-3">
        <Link
          to={"/"}
          className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-[#1976d2] font-bold text-[14px] transition-all uppercase tracking-wide"
        >
          <FiHome className="text-lg text-[#1976d2]" />
          Home
        </Link>
      </div>

      {/* Category Dropdown Container */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dropdown Toggle Button */}
        <button className="flex items-center cursor-pointer gap-2 px-4 py-1.5 rounded-r text-slate-700 hover:text-[#1976d2] transition-all duration-200 font-bold uppercase tracking-wide text-[13px]">
          <FiGrid className="text-sm text-slate-400" />
          <span className="whitespace-nowrap flex items-center gap-2">
            All Categories
          </span>
          <FiChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180 text-[#1976d2]" : ""
            }`}
          />
        </button>

        {/* The Mega Menu Dropdown */}
        <div
          className={`absolute top-full left-0
            w-[320px] md:w-[650px] lg:w-[900px]
            bg-white
            shadow-[0_20px_50px_rgba(0,0,0,0.15)]
            rounded-b-2xl
            border border-slate-100
            transform-gpu origin-top
            transition-all duration-300 ease-out
            ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
            }
            z-[999] overflow-hidden`}
        >
          {/* Header: Professional Navy/Slate with Brand Pulse */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#0f172a] border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#1976d2] rounded-full animate-pulse shadow-[0_0_8px_#1976d2]" />
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                Hardware Inventory
              </h3>
            </div>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-black text-[#1976d2] hover:text-[#4da3ff] transition-colors uppercase tracking-widest flex items-center gap-1 group/all"
            >
              Access Complete Manifest{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid Content Area */}
          <div className="p-6 bg-slate-50/30">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[480px] overflow-y-auto 
              scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent
              hover:scrollbar-thumb-[#1976d2] transition-colors"
            >
              {categoryData && categoryData.length > 0 ? (
                catList.map((cat, index) => {
                  const categoryUrl = cat.name
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-");

                  return (
                    <Link
                      key={cat.name || index}
                      to={`/${categoryUrl}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-2 px-3 bg-white border border-slate-200 rounded-xl hover:border-[#1976d2] hover:shadow-md hover:shadow-[#1976d2]/5 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 p-2 flex-shrink-0 rounded-lg flex items-center justify-center bg-slate-50 group-hover:bg-blue-50 transition-colors">
                        {cat.icon ? (
                          <img
                            src={cat.icon}
                            alt={cat.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <FiBox className="text-slate-300 text-lg group-hover:text-[#1976d2]" />
                        )}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-medium text-slate-700 group-hover:text-[#1976d2] truncate transition-colors uppercase tracking-tight">
                          {cat.name}
                        </span>
                       
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center">
                  <FiBox className="mx-auto mb-3 text-slate-100" size={56} />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                    System Data Unavailable
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Banner: Tech Wrapped Design */}
          <div className="bg-[#0f172a] border-t border-white/5 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block p-2 bg-slate-800/50 rounded-lg border border-white/5">
                <FiBox className="text-[#1976d2]" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#1976d2] uppercase tracking-[0.2em] mb-0.5">
                  Core Infrastructure
                </p>
                <p className="text-sm font-bold text-slate-200 uppercase tracking-tight">
                  Embedded & IoT Modules
                </p>
              </div>
            </div>

            <Link
              to="/electronics"
              onClick={() => setIsOpen(false)}
              className="bg-[#1976d2] text-white text-[11px] font-black px-8 py-2.5 rounded shadow-lg shadow-[#1976d2]/20 hover:bg-[#1565c0] transition-all active:scale-95 uppercase tracking-widest"
            >
              Execute Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
