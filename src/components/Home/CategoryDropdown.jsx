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
          // Return an object containing both properties
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
    <div className="flex items-center">
      {/* Home */}
      <div className="-ml-3">
        <Link
          to={"/"}
          className="flex items-center gap-2 px-4 py-2 text-slate-900 hover:text-emerald-600 font-bold text-[14px] transition-all"
        >
          <FiHome className="text-lg text-emerald-600" />
          Home
        </Link>
      </div>

      {/* Category Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Button */}
        <button className="flex items-center cursor-pointer gap-2 px-4 py-1.5 rounded-r text-slate-800 hover:text-emerald-600 transition-all duration-200 font-medium">
          <FiGrid className="text-sm text-slate-500" />
          <span className="whitespace-nowrap flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium  text-sm  tracking-wide transition-colors">
            All Categories
          </span>
          <FiChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        <div
          className={`absolute top-full left-0
    w-[320px] md:w-[650px] lg:w-[900px]
    bg-slate-100
    shadow-2xl
    rounded-b-2xl
    border border-slate-200
    transform-gpu origin-top
    transition-all duration-300 ease-out
    ${
      isOpen
        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
    }
    z-[999] overflow-hidden`}
        >
          {/* Header: Deep Slate for a High-End Tech Feel */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Hardware List
              </h3>
            </div>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest flex items-center gap-1 group/all"
            >
              View All Manifest{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Content Area: Light Slate for clarity */}
          <div className="p-5 bg-slate-50/50">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[450px] overflow-y-auto 
      scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent
      hover:scrollbar-thumb-emerald-500 transition-colors"
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
                      className="flex items-center gap-3 h-18 py-1 px-2 bg-white border border-slate-300/80 rounded-xl hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-200 group"
                    >
                      <div className="w-1/3 h-ful ml-2 p-2 flex-shrink-0 rounded-lg flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                        {cat.icon ? (
                          <img
                            src={cat.icon}
                            alt={cat.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <FiBox className="text-slate-400 text-lg group-hover:text-emerald-500" />
                        )}
                      </div>

                      <div className="flex w-2/3 flex-col min-w-0 text-center">
                        <span className="text-[15px] font-medium text-slate-800 group-hover:text-emerald-600 truncate transition-colors">
                          {cat.name}
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center">
                  <FiBox className="mx-auto mb-3 text-slate-200" size={48} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Database Empty
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Banner: Darker Slate to wrap the design */}
          <div className="bg-slate-900 border-t border-white/5 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block p-2 bg-slate-800 rounded-lg border border-white/5">
                <FiBox className="text-emerald-500" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-0.5">
                  Specialized Hardware
                </p>
                <p className="text-sm font-medium text-slate-300">
                  Robotics & IoT Solutions
                </p>
              </div>
            </div>

            <Link
              to="/electronics"
              onClick={() => setIsOpen(false)}
              className="bg-emerald-600 text-white text-[11px] font-black px-6 py-2.5 rounded-lg hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 transition-all active:scale-95 uppercase tracking-widest"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
